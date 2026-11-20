import { animate } from "https://cdn.jsdelivr.net/npm/motion@12/+esm";
import { GUIAS, WA, isoHoje, isoAgora } from "./guias-data.js";

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ease = [0.16, 1, 0.3, 1];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

document.querySelectorAll("[data-guia]").forEach(root => {
  const g = GUIAS[root.dataset.guia];
  if (!g) return;
  const answers = {};
  const history = [];
  let stack = []; // ids dos passos já respondidos, para voltar
  const body = root.querySelector(".guia__body");
  const bar = root.querySelector(".guia__bar i");
  const label = root.querySelector(".guia__step");

  const visible = () => g.steps.filter(s => !s.when || s.when(answers));
  const waUrl = (extra) => `https://wa.me/${WA}?text=` + encodeURIComponent(extra);

  function swap(html, focusSel) {
    const go = () => {
      body.innerHTML = html;
      const f = body.querySelector(focusSel || "h3");
      if (f) { f.setAttribute("tabindex", "-1"); f.focus({ preventScroll: true }); }
      if (!reduce) animate(body, { opacity: [0, 1], y: [10, 0] }, { duration: 0.35, ease });
    };
    go();
  }

  function renderStart() {
    Object.keys(answers).forEach(k => delete answers[k]); stack = [];
    label.textContent = "Guia rápido";
    bar.style.width = "0%";
    swap(`<h3>${esc(g.titulo)}</h3><p class="guia__intro">${esc(g.intro)}</p>
      <div class="guia__row"><button class="btn" type="button" data-start>Começar</button></div>
      <p class="guia__priv">Nada do que você marcar aqui é enviado ou guardado. As respostas ficam só neste aparelho.</p>`);
    body.querySelector("[data-start]").addEventListener("click", () => renderStep(0));
  }

  function renderStep(i) {
    const steps = visible();
    if (i >= steps.length) return renderResult();
    const s = steps[i];
    label.textContent = `Pergunta ${i + 1}`;
    bar.style.width = Math.round((i / (steps.length + 1)) * 100) + "%";
    let inner = "";
    if (!s.type) {
      inner = `<div class="opts" role="radiogroup" aria-labelledby="gq">` + s.opts.map(o =>
        `<button type="button" class="opt" role="radio" aria-checked="${answers[s.id] === o.v}" data-v="${o.v}"><b>${esc(o.l)}</b>${o.d ? `<span>${esc(o.d)}</span>` : ""}</button>`).join("") + `</div>`;
    } else {
      const t = s.type === "date" ? "date" : "datetime-local";
      const max = s.type === "date" ? `max="${isoHoje()}"` : `max="${isoAgora()}"`;
      inner = `<div class="guia__field"><label class="sr-only" for="gin">${esc(s.q)}</label><input id="gin" type="${t}" ${max} value="${esc(answers[s.id] || "")}">
        <div class="guia__row"><button class="btn" type="button" data-ok>Continuar</button>${s.skip ? `<button class="btn btn--line" type="button" data-skip>${esc(s.skip)}</button>` : ""}</div></div>`;
    }
    swap(`<h3 id="gq">${esc(s.q)}</h3>${s.hint ? `<p class="guia__hint">${esc(s.hint)}</p>` : ""}${inner}
      <div class="guia__nav">${i > 0 ? `<button type="button" class="guia__back" data-back>Voltar</button>` : `<button type="button" class="guia__back" data-restart>Voltar ao início</button>`}</div>`, "#gq");
    body.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => {
      answers[s.id] = b.dataset.v;
      b.parentElement.querySelectorAll(".opt").forEach(x => x.setAttribute("aria-checked", x === b));
      setTimeout(() => renderStep(i + 1), reduce ? 0 : 160);
    }));
    const ok = body.querySelector("[data-ok]");
    if (ok) {
      ok.addEventListener("click", () => {
        const v = body.querySelector("#gin").value;
        if (!v) { body.querySelector("#gin").focus(); return; }
        answers[s.id] = v; renderStep(i + 1);
      });
      const sk = body.querySelector("[data-skip]");
      if (sk) sk.addEventListener("click", () => { delete answers[s.id]; renderStep(i + 1); });
    }
    body.querySelector("[data-back]")?.addEventListener("click", () => { renderStep(i - 1); });
    body.querySelector("[data-restart]")?.addEventListener("click", renderStart);
  }

  function renderResult() {
    const r = g.result(answers);
    label.textContent = "Resultado";
    bar.style.width = "100%";
    const resumo = r.summary.join(" ");
    const msg = `Olá! Usei o guia rápido do site (${g.titulo.toLowerCase()}). ${resumo} Gostaria de orientação.`;
    const alerts = r.alerts.map(a => `<div class="alert alert--${a.tone}"><b>${esc(a.title)}</b><p>${esc(a.text)}</p></div>`).join("");
    const dl = r.deadline ? `<div class="deadline${r.deadline.late ? " is-late" : ""}"><span>${esc(r.deadline.label)}</span><strong>${esc(r.deadline.date)}</strong><p>${esc(r.deadline.note)}</p></div>` : "";
    const list = (arr, cls) => `<ul class="${cls}">` + arr.map(x => `<li>${esc(x)}</li>`).join("") + `</ul>`;
    const gather = `<ul class="gather">` + r.gather.map((x, k) => `<li><label><input type="checkbox" data-k="${k}"><span>${esc(x)}</span></label></li>`).join("") + `</ul>`;
    swap(`<h3>${esc(r.title)}</h3><p class="guia__intro">${esc(r.lead)}</p>
      ${dl}${alerts}
      <div class="res"><div><h4>O que fazer agora</h4><ol class="todo">${r.todo.map(x => `<li>${esc(x)}</li>`).join("")}</ol></div>
      <div><h4>O que reunir <em class="count" aria-live="polite">0 de ${r.gather.length}</em></h4>${gather}
      <h4 class="h4b">O que evitar</h4>${list(r.avoid, "avoid")}</div></div>
      <div class="guia__cta"><a class="btn" target="_blank" rel="noopener" href="${waUrl(msg)}">Enviar este resumo no WhatsApp</a>
      <button class="btn btn--line" type="button" data-copy>Copiar resumo</button>
      <button class="guia__back" type="button" data-restart>Refazer o guia</button></div>
      <p class="guia__priv">Este guia é informativo e não substitui a análise de um advogado. Ao enviar o resumo, você escolhe se quer falar com o escritório; nada é enviado antes disso.</p>`);
    const count = body.querySelector(".count");
    body.querySelectorAll(".gather input").forEach(c => c.addEventListener("change", () => {
      count.textContent = `${body.querySelectorAll(".gather input:checked").length} de ${r.gather.length}`;
    }));
    body.querySelector("[data-restart]").addEventListener("click", renderStart);
    const cp = body.querySelector("[data-copy]");
    cp.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(msg); cp.textContent = "Copiado"; }
      catch { const ta = document.createElement("textarea"); ta.value = msg; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); cp.textContent = "Copiado"; } catch { cp.textContent = "Selecione e copie manualmente"; } ta.remove(); }
      setTimeout(() => (cp.textContent = "Copiar resumo"), 2200);
    });
    if (!reduce) root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  renderStart();
});
