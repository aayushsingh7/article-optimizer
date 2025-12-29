import Article from "../models/article.model";
import CustomError from "../utils/error.util";

class ArticleService {
    async createArticle(articleData) {
        if (!articleData) throw new CustomError("Data is required", 400);
        try {
            const article = new Article(articleData);
            await article.save();
            if (!article._id) throw new CustomError("Something went wrong, please try again", 500);
            return article;
        } catch (err) {
            console.error(err);
            throw new CustomError(err.message, err.statusCode);
        }
    }
    async updateAricle({id, data}) {
        if (!id) throw new CustomError("Id is required", 400);
        if (!data) throw new CustomError("Updated data must be present", 400);
        try {
            const update = await Article.updateOne({_id: id}, {$set: data});
            if (!update.acknowledged) throw new CustomError("Something went wrong, please try again", 500);
            return update;
        } catch (err) {
            console.error(err);
            throw new CustomError(err.message, err.statusCode);
        }
    }
    async deleteArticle({id}) {
        if (!id) throw new CustomError("Id is required", 400);
        try {
            const removeArticle = await Article.deleteOne({_id: id});
            if (!removeArticle.acknowledged) throw new CustomError("Something went wrong, please try again", 500);
            return removeArticle;
        } catch (err) {
            console.error(err);
            throw new CustomError(err.message, err.statusCode);
        }
    }
}

export default ArticleService;
