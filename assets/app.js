// 共通: テーマ・プロダクト切替 + 辞書/講座の描画

const state = {
  dark: localStorage.getItem("theme") === "dark",
  product: new URLSearchParams(location.search).get("p") === "codex" ? "codex" : "claude",
  cat: "すべて",
  q: "",
};

function applyTheme() {
  document.documentElement.dataset.theme = state.dark ? "dark" : "light";
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = state.dark ? "☀" : "☾";
}

function toggleDark() {
  state.dark = !state.dark;
  localStorage.setItem("theme", state.dark ? "dark" : "light");
  applyTheme();
}

function setProduct(p) {
  state.product = p;
  state.cat = "すべて";
  const url = new URL(location.href);
  url.searchParams.set("p", p);
  history.replaceState(null, "", url);
  document.querySelectorAll("[data-product]").forEach((el) => {
    el.classList.toggle("active", el.dataset.product === p);
  });
  if (document.getElementById("grid")) renderDictionary();
  if (document.getElementById("course")) renderCourse();
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---- 辞書ページ ----
function renderDictionary() {
  const meta = PRODUCT_META[state.product];
  document.getElementById("hero-title").textContent = meta.title;
  document.getElementById("hero-lead").textContent = meta.lead;

  const chips = document.getElementById("chips");
  chips.innerHTML = CATS.map(
    (c) => `<button class="chip${c === state.cat ? " active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
  chips.querySelectorAll(".chip").forEach((el) =>
    el.addEventListener("click", () => { state.cat = el.dataset.cat; renderDictionary(); })
  );

  const q = state.q.trim().toLowerCase();
  const filtered = ENTRIES[state.product].filter((e) => {
    const okCat = state.cat === "すべて" || e.cat === state.cat;
    const okQ = !q || (e.name + e.role + e.desc + e.cat).toLowerCase().includes(q);
    return okCat && okQ;
  });

  const grid = document.getElementById("grid");
  grid.innerHTML = filtered.length
    ? filtered.map((e) => `
      <div class="card">
        <div class="meta">
          <span class="dot" style="background:${CAT_COLORS[e.cat]}"></span>
          <span class="cat">${e.cat}</span>
          <span class="kind">${esc(e.kind)}</span>
        </div>
        <div class="name">${esc(e.name)}</div>
        <div class="role">${esc(e.role)}</div>
        <div class="desc">${esc(e.desc)}</div>
        <div class="ex">${esc(e.ex)}</div>
      </div>`).join("")
    : `<div class="empty">該当する項目がありません。検索語やカテゴリを変えてみてください。</div>`;
}

// ---- 講座ページ ----
function renderCourse() {
  const course = COURSES[state.product];
  document.getElementById("hero-title").textContent = course.title;
  document.getElementById("hero-lead").textContent = course.lead;

  document.getElementById("toc-list").innerHTML = course.chapters
    .map((ch, i) => `<a href="#ch${i + 1}">第${i + 1}章 ${ch.title}</a>`)
    .join("");

  document.getElementById("course").innerHTML = course.chapters
    .map((ch, i) => `
      <section class="chapter" id="ch${i + 1}">
        <div class="ch-num mono">CHAPTER ${String(i + 1).padStart(2, "0")}</div>
        <h2>${ch.title}</h2>
        <p class="ch-lead">${ch.lead}</p>
        ${ch.steps.map((s) => `
          <div class="step">
            <h3>${s.h}</h3>
            <p>${s.p}</p>
            <div class="codeblock">${esc(s.code)}</div>
            ${s.tip ? `<div class="tip">${s.tip}</div>` : ""}
          </div>`).join("")}
      </section>`)
    .join("");
}

// ---- 初期化 ----
document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  document.getElementById("theme-toggle").addEventListener("click", toggleDark);
  document.querySelectorAll("[data-product]").forEach((el) => {
    el.classList.toggle("active", el.dataset.product === state.product);
    el.addEventListener("click", () => setProduct(el.dataset.product));
  });
  const search = document.getElementById("search");
  if (search) search.addEventListener("input", () => { state.q = search.value; renderDictionary(); });
  if (document.getElementById("grid")) renderDictionary();
  if (document.getElementById("course")) renderCourse();
});
