import {JSDOM} from "jsdom";

function cleanHTML(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  doc.querySelectorAll("[class]").forEach((el) => {
    const classAttr = el.getAttribute("class");
    if (typeof classAttr === "string") {
      const newClasses = classAttr
        .split(/\s+/)
        .filter(
          (c) => c && !c.startsWith("elementor-") && !c.startsWith("elementor")
        )
        .join(" ");

      if (newClasses) {
        el.setAttribute("class", newClasses);
      } else {
        el.removeAttribute("class");
      }
    }
  });

  doc.querySelectorAll("*").forEach((el) => {
    Object.keys(el.dataset).forEach((key) => delete el.dataset[key]);
    el.removeAttribute("data-id");
    el.removeAttribute("data-element_type");
    el.removeAttribute("data-settings");
  });

  let wrappersFound = true;
  while (wrappersFound) {
    wrappersFound = false;
    const divs = doc.querySelectorAll("div");
    for (const div of divs) {
      if (div.attributes.length === 0 && div.children.length === 1) {
        div.replaceWith(...div.childNodes);
        wrappersFound = true;
      }
    }
  }

  return doc.body.innerHTML;
}

export default cleanHTML;