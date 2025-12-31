# Article Optimizer

Article Optimizer is a full‑stack web scraping and AI‑powered backend project built as part of the **BeyondChats Internship Assignment**. The system scrapes existing articles, enriches them using top‑ranking Google references, and generates SEO‑optimized content using an LLM.

---

## 1. Tech Stack

* **Backend**: Node.js, Express, Playwright, MongoDB
* **Frontend**: Vite + React
* **AI**: Google Gemini API

---

## 2. Repository Setup

Clone the repository:

```bash
git clone https://github.com/aayushsingh7/article-optimizer.git
```

---

## 3. Server Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file at `/server/.env`:

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
MONGODB_URL="mongodb+srv://guest:guest@main.yjq0p6m.mongodb.net/?appName=main"
```

Start the backend server (development mode):

```bash
npm run dev
```

---

## 4. Client Setup

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file at `/client/.env`:

```env
VITE_API_URL="http://localhost:4000/api"
```

Start the frontend (development mode):

```bash
npm run dev
```

---

## 5. Backend Architecture (Important)

### 5.1 WebScraperService

Handles all scraping logic using Playwright.

* `_getBrowser(useCDP: boolean)`
  Manages Playwright browser connection (CDP or headless).

* `scrapeBeyondChatArticleLinks({ length, orderBy })`
  Scrapes BeyondChats articles based on latest or oldest order.

* `scrapeTopGoogleLinks({ length, topic })`
  Scrapes top Google search results for a given topic.

* `scrapeArticleHTML({ url })`
  Extracts clean article HTML by removing all classes (customized for BeyondChats).

---

### 5.2 AiService

Responsible for AI‑based content optimization.

* `optimizeWithLLM({ heading, htmlBody, references })`
  Uses the original article structure and Google references to generate an SEO‑optimized article.

---

### 3. ArticleService

Main orchestration layer.

* `optimizeArticle({ url })`

  * Scrapes original article content
  * Fetches top Google reference articles
  * Generates optimized content via LLM
  * Saves aggregated data to MongoDB

```js
async optimizeArticle({ url }) {
  if (!url) throw new CustomError("Url is required", 400);

  const originalArticle = await webScraperService.scrapeArticleHTML({ url });
  const googleLinks = await webScraperService.scrapeTopGoogleLinks({
    length: 4,
    topic: originalArticle.topic,
  });

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
```

All remaining methods handle standard CRUD operations.

---

## API Routes

Only article‑related APIs are exposed. WebScraperService and AiService are internal.

```js
GET    /api/articles
POST   /api/articles/optimize
GET    /api/articles/:id
PUT    /api/articles/:id
DELETE /api/articles/:id
```

---

## Notes

* Designed specifically for BeyondChats article optimization
* Scraping logic is domain‑aware and customizable
* LLM output is stored as structured, clean HTML
