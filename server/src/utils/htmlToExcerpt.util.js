import { JSDOM } from "jsdom";

function htmlToExcerpt(html, len = 200) {
  const text = new JSDOM(html).window.document.body.textContent || "";
  return text.replace(/\s+/g, " ").trim().slice(0, len);
}

export default htmlToExcerpt;