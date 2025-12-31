import {Schema, model} from "mongoose";

const articleSchema = new Schema(
    {
        original: {
            title: {type: String, required: true},
            source: {type: String, required: true},
            excerpt:{type:String,required:true},
            author: {
                name: {type: String, default: "Anonymous"},
                createdAt: {type: Date, default: new Date().toISOString()},
            },
        },
        updated: {
            title: {type: String, required: true},
            excerpt:{type:String, required:true},
            content: {type: String, required: true},
        },
        thumbnail: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTcFI6hTmgUtdxQTZktMt5KgEbySf4mtRgfQ&s", },
        totalKeywordsAdded: {type: Number, default: 0},
        newlyAddedLines: {type: Number, default: 0},
        linesRemoved: {type: Number, default: 0},
        citations: [{type: String}],
    },
    {timestamps: true}
);

const Article = model("article", articleSchema);

export default Article;
