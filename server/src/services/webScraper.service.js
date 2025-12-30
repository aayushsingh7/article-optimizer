import CustomError from "../utils/error.util.js";
import {chromium} from "playwright";
import {JSDOM, VirtualConsole} from "jsdom";
import {Readability} from "@mozilla/readability";
import cleanHTML from "../utils/cleanHTML.util.js";

class WebScraperService {
    constructor() {
        this.browser = null;
    }

    async _getBrowser(useCDP = false) {
        if (this.browser && this.browser.isConnected()) {
            return this.browser;
        }

        if (useCDP) {
            try {
                this.browser = await chromium.connectOverCDP("http://localhost:9222");
            } catch (error) {
                console.error("CDP Connection failed. Ensure Chrome is running with --remote-debugging-port=9222");
                throw new CustomError("Failed to connect to browser via CDP", 500);
            }
        } else {
            this.browser = await chromium.launch({
                headless: true,
                args: ["--disable-blink-features=AutomationControlled"],
            });
        }

        return this.browser;
    }

    async scrapeBeyondChatArticleLinks({length = 5, orderBy = "latest"} = {}) {
        const articles = [];
        const browser = await this._getBrowser(false); 
        const context = await browser.newContext(); 
        const page = await context.newPage();

        try {
            await page.goto("https://beyondchats.com/blogs/");
            await page.waitForLoadState("load");

            while (true) {
                const pageUrls = await page.$$eval("article h2 a", (as) =>
                    as.map((a) => ({link: a.href, text: a.textContent}))
                );
                articles.push(...pageUrls);

                const nextBtn = await page.$('a[rel="next"]');
                if (!nextBtn) break;

                await Promise.all([page.waitForNavigation(), nextBtn.click()]);
            }
        } finally {
            await context.close();
        }

        return orderBy === "latest" ? articles.slice(0, length) : articles.slice(-length);
    }

    async scrapeTopGoogleLinks({length = 2, topic = ""} = {}) {
        if (!topic) throw new CustomError("Topic is required", 400);

        const topArticles = [];
        const virtualConsole = new VirtualConsole();
        virtualConsole.on("error", () => {});

        const browser = await this._getBrowser(true);
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
            await page.goto(`https://www.google.com/search?q=${encodeURIComponent(topic)}`, {
                waitUntil: "domcontentloaded",
            });

            const urls = await page.evaluate((len) => {
                const links = Array.from(document.querySelectorAll("a h3"));
                return links.map((h3) => h3.parentElement.href).slice(0, len);
            }, length);

            for (const url of urls) {
                try {
                    await page.goto(url, {waitUntil: "domcontentloaded", timeout: 15000});
                    const html = await page.content();
                    const dom = new JSDOM(html, {url, virtualConsole});

                    const reader = new Readability(dom.window.document);
                    const article = reader.parse();

                    if (article?.textContent) {
                        topArticles.push({
                            title: article.title,
                            url: url,
                            content: article.textContent.replace(/\s+/g, " ").trim(),
                            site: article.siteName,
                        });
                    }
                    dom.window.close();
                } catch (innerErr) {
                    console.error(`Skipping ${url}:`, innerErr.message);
                }
            }
            return {citations: urls, articles: topArticles};
        } finally {
            await context.close();
        }
    }

    async scrapeArticleHTML({url, useCDP = true}) {
        if (!url) throw new CustomError("Url is required", 400);

        const browser = await this._getBrowser(useCDP);
        const context = await browser.newContext({
            userAgent:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        });
        const page = await context.newPage();

        try {
            await page.goto(url, {waitUntil: "domcontentloaded", timeout: 15000});

            const h1 = await page.$("h1");
            const title = h1 ? await h1.textContent() : "No Title";
            const img = await page.$('#content [data-element_type="widget"] img');
            const thumbnail = await img.getAttribute("src");
            const selector = '#content [data-element_type="widget"]';
            const element = page.locator(selector).first();

            await element.waitFor({state: "attached", timeout: 5000}).catch(() => {
                throw new CustomError(`Selector "${selector}" not found.`, 404);
            });

            const rawHTML = await element.innerHTML();
            if (!rawHTML) throw new CustomError("Empty content.", 500);

            return {thumbnail, topic: title, html: cleanHTML(rawHTML)};
        } finally {
            await context.close();
        }
    }
}

export default WebScraperService;
