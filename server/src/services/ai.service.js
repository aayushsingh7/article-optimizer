// import {config} from "dotenv";
// config();
// import {GoogleGenAI} from "@google/genai";
// import CustomError from "../utils/error.util.js";

// const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// const responseSchema = {
//     type: "object",
//     properties: {
//         totalKeywordsAdded: {
//             type: "number",
//             description: "Count of SEO keywords integrated from the top-ranked articles.",
//         },
//         newlyAddedLines: {
//             type: "number",
//             description: "Count of new sentences or lines added to the original text.",
//         },
//         linesRemoved: {
//             type: "number",
//             description: "Count of redundant or low-quality lines removed from the original text.",
//         },
//         originalHTML: {
//                type:"string",
//                description:"The Base HTMl content given as refernece"
//         },
//         updatedHTML: {
//             type: "string",
//             description: "The complete, SEO-optimized HTML article content.",
//         },
//         heading: {
//             type: "string",
//             description: "The optimized SEO title or H1 for the article.",
//         },
//     },
//     required: ["totalKeywordsAdded", "newlyAddedLines", "linesRemoved", "html", "heading"],
// };

// const generatePrompt = (heading, html, references) => {
//     return `
//       I have a base HTML article and two high-ranking SEO reference articles.

//       BASE HTML HEADING (H1):
//       ${heading}

//       BASE HTML CONTENT:
//       ${html}

//       SEO REFERENCE ARTICLES (DATA TO LEARN FROM):
//      ${references
//      .map((r, i) => `Reference ${i + 1}:\nTitle: ${r.title}\nContent: ${r.content}\nCitation: ${r.url}`)
//      .join("\n\n")}

//       TASK:
//       1. Analyze the SEO references for high-value keywords and topics.
//       2. Remove "fluff," repetitive, or low-quality lines from the BASE HTML.
//       3. Integrate the SEO keywords and missing information from the references into the HTML naturally.
//       4. Improve the BASE HTML HEADING to be more SEO-competitive based on the references.
//       5. Ensure the final output is valid HTML wrapped in appropriate tags.
//       6. Return the statistics, the updated heading, and the final HTML in the requested JSON format.
//     `;
// };

// class AiService {
//     async optimizeWithLLM({heading, htmlBody, references}) {
//         const prompt = generatePrompt(heading, htmlBody, references);
//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents: [prompt],
//             config: {
//                 responseMimeType: "application/json",
//                 responseSchema: responseSchema,
//                 // tools: [{urlContext: {}}],
//                 temperature: 0.2,
//             },
//         });

//         const article = response.text;
//         return article;
//     }
// }

// export default AiService;

import {config} from "dotenv";
config();
import {GoogleGenAI} from "@google/genai";
import CustomError from "../utils/error.util.js";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// const responseSchema = {
//     type: "object",
//     properties: {
//         totalKeywordsAdded: {
//             type: "number",
//             description:
//                 "The count of NEW LSI keywords and entities from the Reference Articles that were successfully integrated into the text.",
//         },
//         newlyAddedLines: {
//             type: "number",
//             description: "The estimated number of new sentences or list items added to expand the content depth.",
//         },
//         linesRemoved: {
//             type: "number",
//             description:
//                 "The count of sentences removed. This should be very low (close to 0) as the goal is to EXPAND, not replace.",
//         },
//         heading: {
//             type: "string",
//             description:
//                 "The optimized, high-impact H1 title for the article. (Do NOT include this inside the HTML field).",
//         },
//         html: {
//             type: "string",
//             description:
//                 "The COMPLETE body content. RULES: 1) Start directly with the first paragraph (NO <h1> tag). 2) Use the 'Documentation Style' design system: Numbered headers (1. Title, 1.1 Sub-title), wrapped 'bg-slate-50' lists with borders, and 'space-y-6' spacing. 3) Must be valid, escaped HTML string ready for JSON.",
//         },
//     },
//     required: ["totalKeywordsAdded", "newlyAddedLines", "linesRemoved", "html", "heading"],
// };

// const generatePrompt = (heading, html, references) => {
//     return `
//       I have a base HTML article and high-ranking SEO reference articles.

//       BASE HTML HEADING: ${heading}
//       BASE HTML CONTENT: ${html}

//       SEO REFERENCES:
//       ${references.map((r, i) => `Ref ${i + 1}: ${r.title}\n${r.content}`).join("\n\n")}

//       ---

//       CRITICAL INSTRUCTION:
//       You are a Frontend Architect converting a draft into a High-Performance Technical Article.
//       Your output must be **HTML only** (starting from the first paragraph, DO NOT include an <h1> tag).

//       ---

//       STYLING SYSTEM (TAILWIND CSS):

//       1. **Global Layout**:
//          - Wrap content in: <div class="space-y-6 text-slate-800 leading-relaxed">
//          - Use standard paragraph spacing: <p class="text-lg text-slate-700">

//       2. **Numbered Hierarchy (Mandatory)**:
//          - **Section Headers (H2)**: MUST be numbered (1., 2., 3.).
//            Style: <h2 class="text-3xl font-bold text-slate-900 mt-16 mb-6 pt-6 border-t border-slate-200">1. [Section Title]</h2>
//          - **Sub-headers (H3)**: MUST be numbered (1.1, 1.2, etc.).
//            Style: <h3 class="text-xl font-semibold text-slate-800 mt-8 mb-4">1.1 [Sub-section Title]</h3>

//       3. **"Boxed" Lists (Critical for visibility)**:
//          - NEVER output a raw <ul> or <ol>. ALWAYS wrap lists in a container to separate them from text.
//          - **The Wrapper**: <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 my-8 shadow-sm">
//          - **The List**: <ul class="space-y-3 list-none pl-0">
//          - **The Items**: Use the emerald checkmark SVG icon provided previously for every <li>.

//       4. **Professional Callouts (No random colors)**:
//          - **Key Insight**: <div class="bg-blue-50 border-l-4 border-blue-600 p-6 my-10 rounded-r-lg">
//          - **Warning/Trap**: <div class="bg-amber-50 border-l-4 border-amber-500 p-6 my-10 rounded-r-lg">

//       5. **Visual Balance**:
//          - Do not leave huge white gaps. Use 'my-8' for standard separations.
//          - Use 'mt-16' ONLY for main Section 2, Section 3 breaks.

//       ---

//       CONTENT TASKS:
//       1. Remove the original H1. Start with the introduction text.
//       2. **Rewrite and Expand**: Combine the Base HTML with Reference data.
//       3. Ensure logical numbering (e.g., if "Pricing" is section 2, "Hidden Costs" must be 2.1).
//       4. Keep the tone professional, objective, and authoritative.
//     `;
// };

const generatePrompt = (heading, html, references) => {
    return `
      I have a base HTML draft and high-ranking SEO reference articles.
      
      BASE DRAFT HEADING: ${heading}
      BASE DRAFT CONTENT: ${html}
      
      SEO REFERENCES (SOURCE OF TRUTH):
      ${references.map((r, i) => `Ref ${i + 1}: ${r.title}\n${r.content}`).join("\n\n")}

      ---
      
      CRITICAL OBJECTIVE: AGGRESSIVE EXPANSION & OPTIMIZATION
      The "BASE DRAFT CONTENT" is too short and missing key details. 
      Your task is to write the **Ultimate Guide** by merging the Base Draft with deep insights from the SEO References.
      
      RULES FOR CONTENT:
      1. **Inject New Topics**: If the References discuss a topic (e.g., "AI Security", "GDPR", "Omnichannel") that is missing in the Draft, you MUST add a new section for it.
      2. **Data & Depth**: Do not just say "Chatbots are fast." Use data/examples from references.
      3. **Include Images**:Include <img> tags.
      4. **No Fluff**: Keep it professional, direct, and actionable.

      ---
      
      STYLING SYSTEM (Clean & Minimalist Tailwind):
      
      1. **Structure**: 
         - Start directly with the intro paragraph (NO <H1>).
         - Use Numbered Headers (1. Title, 1.1 Sub-title) for clear structure.
      
      2. **Typography**:
         - **Container**: <div class="space-y-6 text-lg text-slate-700 leading-relaxed">
         - **H2 (Major Sections)**: <h2 class="text-3xl font-bold text-slate-900 mt-12 mb-6 pt-6 border-t border-slate-200">1. [Title]</h2>
         - **H3 (Sub Sections)**: <h3 class="text-xl font-semibold text-slate-800 mt-8 mb-3">1.1 [Title]</h3>
      
      3. **Lists (Simple & Clean)**:
         - NO backgrounds. NO boxes.
         - Style: <ul class="list-disc pl-5 space-y-2 text-slate-700 marker:text-blue-600">
         - Use <strong>bolding</strong> for key terms inside list items.

      4. **Highlights**:
         - Use <span class="bg-blue-50 text-blue-800 font-semibold px-1 rounded"> for very important keywords only.
         - Use <blockquote class="border-l-4 border-blue-500 pl-4 italic text-slate-600 my-8"> for key takeaways.
    `;
};



const responseSchema = {
    type: "object",
    properties: {
        totalKeywordsAdded: {
            type: "number",
            description: "The count of NEW keywords/topics extracted from References and added to the text."
        },
        newlyAddedLines: {
            type: "number",
            description: "The number of NEW lines added. This MUST be high (e.g., >20) as you are expanding the article significantly."
        },
        linesRemoved: {
            type: "number",
            description: "Count of removed lines (including removed <img> tags)."
        },
        heading: {
            type: "string",
            description: "The optimized H1 title (e.g., 'The Ultimate Guide to...'). Do NOT include in HTML."
        },
        html: {
            type: "string",
            description: "The COMPLETELY REWRITTEN and EXPANDED article body. 1) No <h1>. 2) include <img>. 3) simple 'list-disc'. 4) Must include new sections derived from References. 5) Use numbered headers (1., 1.1)."
        },
    },
    required: ["totalKeywordsAdded", "newlyAddedLines", "linesRemoved", "html", "heading"],
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
