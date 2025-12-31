import Article from "../models/article.model.js";
import CustomError from "../utils/error.util.js";
import htmlToExcerpt from "../utils/htmlToExcerpt.util.js";
import AiService from "./ai.service.js";
import WebScraperService from "./webScraper.service.js";

const webScraperService = new WebScraperService();
const aiService = new AiService();

class ArticleService {
    async createArticle(articleData) {
        if (!articleData) throw new CustomError("Data is required", 400);
        const article = new Article(articleData);
        await article.save();
        if (!article._id) throw new CustomError("Something went wrong, please try again", 500);
        return article;
    }
    async updateAricle({id, data}) {
        if (!id) throw new CustomError("Id is required", 400);
        if (!data) throw new CustomError("Updated data must be present", 400);
        const update = await Article.updateOne({_id: id}, {$set: data});
        if (!update.acknowledged) throw new CustomError("Something went wrong, please try again", 500);
        return update;
    }
    async deleteArticle({id}) {
        if (!id) throw new CustomError("Id is required", 400);
        const removeArticle = await Article.deleteOne({_id: id});
        if (!removeArticle.acknowledged) throw new CustomError("Something went wrong, please try again", 500);
        return removeArticle;
    }
    async getArticles({offset = 0, query}) {
        const filter = {};
        if (query) {
            filter.$or = [
                {"original.title": {$regex: query, $options: "i"}},
                {"updated.title": {$regex: query, $options: "i"}},
            ];
        }

        return await Article.find(filter)
        .sort({createdAt: -1})
        .skip(Number(offset))
        .limit(10)
        .select("_id original.title original.excerpt updated.title updated.excerpt thumbnail createdAt")
        .lean();
    }
    async getArticle({id}) {
        if (!id) throw new CustomError("Id is required", 400);
        const article = await Article.findById(id).lean();
        if (!article) throw new CustomError("No article found", 404);
        return article;
    }
    async optimizeArticle({url}) {
        if (!url) throw new CustomError("Url is required", 400);
        const originalArticle = await webScraperService.scrapeArticleHTML({url});
        const googleLinks = await webScraperService.scrapeTopGoogleLinks({length: 4, topic: originalArticle.topic});
        let optimizedArticle = await aiService.optimizeWithLLM({
            heading: originalArticle.topic,
            htmlBody: originalArticle.html,
            references: googleLinks.articles,
        });
        optimizedArticle = JSON.parse(optimizedArticle);

        const originalExcerpt = htmlToExcerpt(originalArticle.html);
        const updatedExcerpt = htmlToExcerpt(optimizedArticle.html);
        const saveArticle = await this.createArticle({
            thumbnail: originalArticle.thumbnail,
            original: {
                title: originalArticle.topic,
                source: url,
                excerpt: originalExcerpt,
                author: {
                    name: "gemini-2.5-flash-lite",
                    createdAt: new Date().toISOString(),
                },
            },
            updated: {
                title: optimizedArticle.heading,
                excerpt: updatedExcerpt,
                content: optimizedArticle.html,
            },
            totalKeywordsAdded: optimizedArticle.totalKeywordsAdded,
            newlyAddedLines: optimizedArticle.newlyAddedLines,
            linesRemoved: optimizedArticle.linesRemoved,
            citations: googleLinks.citations,
        });

        return saveArticle;
    }
}

export default ArticleService;
