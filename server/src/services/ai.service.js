import {config} from "dotenv";
config();
import {GoogleGenAI} from "@google/genai";
import CustomError from "../utils/error.util.js";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const responseSchema = {
    type: "object",
    properties: {
        totalKeywordsAdded: {
            type: "number",
            description: "Count of SEO keywords integrated from the top-ranked articles.",
        },
        newlyAddedLines: {
            type: "number",
            description: "Count of new sentences or lines added to the original text.",
        },
        linesRemoved: {
            type: "number",
            description: "Count of redundant or low-quality lines removed from the original text.",
        },
        html: {
            type: "string",
            description: "The complete, SEO-optimized HTML article content.",
        },
        heading: {
            type: "string",
            description: "The optimized SEO title or H1 for the article.",
        },
    },
    required: ["totalKeywordsAdded", "newlyAddedLines", "linesRemoved", "html", "heading"],
};

const generatePrompt = (heading, html, references) => {
    return `
      I have a base HTML article and two high-ranking SEO reference articles.
      
      BASE HTML HEADING (H1): 
      ${heading}

      BASE HTML CONTENT:
      ${html}
      
      SEO REFERENCE ARTICLES (DATA TO LEARN FROM):
     ${references
     .map((r, i) => `Reference ${i + 1}:\nTitle: ${r.title}\nContent: ${r.content}\nCitation: ${r.url}`)
     .join("\n\n")}

      
      TASK:
      1. Analyze the SEO references for high-value keywords and topics.
      2. Remove "fluff," repetitive, or low-quality lines from the BASE HTML.
      3. Integrate the SEO keywords and missing information from the references into the HTML naturally.
      4. Improve the BASE HTML HEADING to be more SEO-competitive based on the references.
      5. Ensure the final output is valid HTML wrapped in appropriate tags.
      6. Return the statistics, the updated heading, and the final HTML in the requested JSON format.
    `;
};

class AiService {
    async optimizeWithLLM({heading, htmlBody, references}) {
        const prompt = generatePrompt(heading, htmlBody, references);
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [prompt],
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                // tools: [{urlContext: {}}],
                temperature: 0.2,
            },
        });

        const article = response.text;
        return article;
    }
}

export default AiService;
