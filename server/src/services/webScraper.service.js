import CustomError from "../utils/error.util";
import {chromium} from "playwright";
import {JSDOM} from "jsdom";
import {Readability} from "@mozilla/readability";
import cleanHTML from "../utils/cleanHTML.util";

class WebScraper {
    async scrapeBeyondChatArticleLinks({length = 5, orderBy = "latest"} = {length, orderBy}) {
        const articles = [];
        try {
            const browser = await chromium.launch();
            const context = await browser.newContext();
            const page = await context.newPage();

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

            return orderBy === "latest" ? articles.slice(0, length) : articles.slice(-length);
        } catch (err) {
            console.error(err);
            throw new CustomError(err.message, err.statusCode);
        } finally {
            await browser.close();
        }
    }
    async scrapeTopGoogleLinks({length = 2} = {length, topic}) {
        if(!topic) throw new CustomError("Topic is required", 400)
        const topArticles = [];
        try {
            const browser = await chromium.connectOverCDP("http://localhost:9222");
            const defaultContext = browser.contexts()[0];
            const page = defaultContext.pages()[0];
            await page.goto(`https://www.google.com/search?q=${encodeURIComponent(topic)}`);

            const urls = await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll("a h3"));
                return links.map((h3) => h3.parentElement.href).slice(0, length);
            });

            for (const url of urls) {
                await page.goto(url, {waitUntil: "networkidle", timeout: 30000});
                const html = await page.content();

                const dom = new JSDOM(html, {url});
                const reader = new Readability(dom.window.document);
                const article = reader.parse();

                if (article && article.textContent) {
                    const cleanText = article.textContent.replace(/\s+/g, " ").trim();
                    topArticles.push({
                        title: article.title,
                        url: url,
                        content: cleanText,
                        site: article.siteName,
                    });
                }
            }
            return {citations: urls, articles: topArticles};
        } catch (err) {
            console.error(err);
            throw new CustomError(err.message, err.statusCode);
        } finally {
            await browser.close();
        }
    }
    async scrapeArticleHTML({url}) {
        if(!url) throw new CustomError("Url is required", 400)
        try {
            const browser = await chromium.connectOverCDP("http://localhost:9222");
            const defaultContext = browser.contexts()[0];
            const page = defaultContext.pages()[0];
            await page.goto(url);
            await page.waitForLoadState("load");
            const rawHTML = await page.$eval('#content [data-element_type="widget"]', (el) => el.innerHTML);
            const html = cleanHTML(rawHTML);
            return html;
        } catch (err) {
            console.error(er);
            throw new CustomError(err.message, err.statusCode);
        } finally {
            await browser.close();
        }
    }
} 

export default WebScraper;
