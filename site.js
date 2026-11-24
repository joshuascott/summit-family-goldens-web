/* Paste links here. The page picks them up on its own.
   ownerFormUrl: the owner application (Google Form, Jotform, or any https form).
   facebookHeritageUrl: the second Facebook page. */
const CONFIG = {
  ownerFormUrl: "",
  facebookHeritageUrl: "",
};

function formEmbedSrc(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return "";
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return "";
  if (parsed.hostname === "docs.google.com" && parsed.pathname.includes("/forms/")) {
    parsed.searchParams.set("embedded", "true");
  }
  return parsed.toString();
}

function mountForm(url) {
  const src = formEmbedSrc(url);
  const mount = document.querySelector("#form-mount");
  if (!src || !mount) return;
  const frame = document.createElement("iframe");
  frame.title = "Owner application";
  frame.src = src;
  frame.loading = "lazy";
  mount.appendChild(frame);
  mount.hidden = false;
  const note = document.querySelector("#apply-note");
  if (note) {
    note.textContent = "The application is below. Call or text if you would rather talk first.";
  }
}

if (CONFIG.facebookHeritageUrl) {
  document.querySelectorAll("[data-fill='facebook-heritage']").forEach((el) => {
    el.href = CONFIG.facebookHeritageUrl;
    el.hidden = false;
  });
}

mountForm(CONFIG.ownerFormUrl);
