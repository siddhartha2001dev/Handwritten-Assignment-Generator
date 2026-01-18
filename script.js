function generateAssignment() {

  // ===== INPUTS =====
  const text = document.getElementById("inputText").value;
  const headingText = document.getElementById("headingInput").value;
  const output = document.getElementById("output");

  // 🔥 NEW: pen + font selection
  const penStyle = document.getElementById("penStyle").value;
  const fontStyle = document.getElementById("fontStyle").value;

  output.innerHTML = "";

  // ===== CONFIG =====
  const words = text.split(" ");
  const maxCharsPerLine = 90;

  // first page me heading ke liye kam lines
  const maxLinesFirstPage = 33;
  const maxLinesOtherPages = 35;

  let currentLine = "";
  let lineCount = 0;
  let isFirstPage = true;
  let maxLines = maxLinesFirstPage;

  // ===== CREATE FIRST PAGE =====
  let page = createPage(penStyle, fontStyle);

  // Heading sirf first page pe
  if (headingText.trim()) {
    const h = document.createElement("div");
    h.className = "heading";
    h.textContent = headingText;
    page.appendChild(h);
  }

  // ===== TEXT PROCESSING =====
  words.forEach(word => {
    currentLine += word + " ";

    if (currentLine.length >= maxCharsPerLine) {
      const lineDiv = document.createElement("div");
      lineDiv.textContent = currentLine;
      page.appendChild(lineDiv);

      currentLine = "";
      lineCount++;
    }

    // ===== PAGE BREAK =====
    if (lineCount >= maxLines) {
      output.appendChild(page);

      page = createPage(penStyle, fontStyle);
      lineCount = 0;

      isFirstPage = false;
      maxLines = maxLinesOtherPages;
    }
  });

  // last remaining line
  if (currentLine.trim()) {
    const lineDiv = document.createElement("div");
    lineDiv.textContent = currentLine;
    page.appendChild(lineDiv);
  }

  output.appendChild(page);
}


// ===== PAGE CREATOR =====
function createPage(penStyle, fontStyle) {
  const page = document.createElement("div");
  page.className = "page";

  // 🔥 ONLY THESE TWO LINES ARE NEW (SAFE)
  page.classList.add("pen-" + penStyle);
  page.classList.add("font-" + fontStyle);

  return page;
}
