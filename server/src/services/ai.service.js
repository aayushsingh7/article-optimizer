import {GoogleGenAI} from "@google/genai";
import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema";
import CustomError from "../utils/error.util";

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

const SEOArticleSchema = z.object({
    totalKeywordsAdded: z.number().describe("Count of SEO keywords integrated from the top-ranked articles."),
    newlyAddedLines: z.number().describe("Count of new sentences or lines added to the original text."),
    linesRemoved: z.number().describe("Count of redundant or low-quality lines removed from the original text."),
    html: z.string().describe("The complete, SEO-optimized HTML article content."),
    heading: z.string().describe("The optimized SEO title or H1 for the article."),
});

const generatePrompt = (heading, html, references)=> {
    return   `
      I have a base HTML article and two high-ranking SEO reference articles.
      
      BASE HTML HEADING (H1): 
      ${heading}

      BASE HTML CONTENT:
      ${html}
      
      SEO REFERENCE ARTICLES (DATA TO LEARN FROM):
      ${references.join("\n")}
      
      TASK:
      1. Analyze the SEO references for high-value keywords and topics.
      2. Remove "fluff," repetitive, or low-quality lines from the BASE HTML.
      3. Integrate the SEO keywords and missing information from the references into the HTML naturally.
      4. Improve the BASE HTML HEADING to be more SEO-competitive based on the references.
      5. Ensure the final output is valid HTML wrapped in appropriate tags.
      6. Return the statistics, the updated heading, and the final HTML in the requested JSON format.
    `;
}

class AiService {
    async optimizeWithLLM({heading, htmlBody, references}) {
        try {
            const prompt = generatePrompt(heading, htmlBody, references)
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [prompt],
                config: {
                    responseMimeType: "application/json",
                    responseSchema: zodToJsonSchema(genAIResponseSchema),
                    tools: [{urlContext: {}}],
                    temperature: 0.2,
                },
            });

            const article = SEOArticleSchema.parse(JSON.parse(response.text));
            console.log(article)
            return article;
        } catch (err) {
            console.error(err);
            throw new CustomError(err.message, err.statusCode);
        }
    }
}

export default AiService;
