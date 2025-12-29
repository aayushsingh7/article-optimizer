import {Schema, model} from "mongoose";

const articleSchema = new Schema(
    {
        original: {
            title: {type: String, required: true},
            content: {type: String, required: true},
            author: {
                name: {type: String, default: "Anonymous"},
                createdAt: {type: Date, default: new Date().toISOString()},
            },
        },
        updated: {
            title: {type: String, required: true},
            content: {type: String, required: true},
        },
        totalKeywordsAdded: {type: Number, default: 0},
        newlyAddedLines: {type: Number, default: 0},
        linesRemoved: {type: Number, default: 0},
        citation: [{type: String}],
    },
    {timestamps: true}
);

const Article = model("article", articleSchema);

export default Article;
