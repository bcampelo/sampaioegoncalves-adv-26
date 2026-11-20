import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@12/+esm";

const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ease = [0.16, 1, 0.3, 1];

/* Topo: filete aparece depois de rolar */
const top = document.querySelector(".top");
const onScroll = () => top.classList.toggle("is-scrolled", scrollY > 8);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* Menu no celular */
const burger = document.querySelector(".burger");
const menu = document.getElementById("menu");
const mobile = matchMedia("(max-width: 52rem)");
let menuAnim;
function setMenu(open) {
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  if (!mobile.matches) { menu.classList.remove("is-open"); return; }
  if (reduce) { menu.classList.toggle("is-open", open); return; }
  menu.classList.add("is-open");
  menuAnim?.stop();
  menuAnim = animate(menu, open ? { opacity: [0, 1], y: [-10, 0] } : { opacity: [1, 0], y: [0, -10] }, { duration: open ? 0.35 : 0.2, ease });
  if (!open) menuAnim.finished.then(() => menu.classList.remove("is-open"));
}
burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", e => { if (e.target.closest("a") && mobile.matches) setMenu(false); });
addEventListener("keydown", e => { if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") { setMenu(false); burger.focus(); } });
mobile.addEventListener("change", () => setMenu(false));

/* Sanfonas (áreas e dúvidas): uma aberta por vez dentro de cada grupo */
async function setItem(item, open, instant = false) {
  const btn = item.querySelector(".item__head"), panel = item.querySelector(".item__panel");
  if (!instant && open === item.classList.contains("is-open")) return;
  item.classList.toggle("is-open", open);
  btn.setAttribute("aria-expanded", open);
  if (open) {
    panel.inert = false;
    if (instant || reduce) { panel.style.height = "auto"; return; }
    panel.style.height = "0px";
    await animate(panel, { height: panel.scrollHeight + "px" }, { duration: 0.45, ease }).finished;
    if (item.classList.contains("is-open")) panel.style.height = "auto";
  } else {
    panel.inert = true;
    if (instant || reduce) { panel.style.height = "0px"; return; }
    panel.style.height = panel.scrollHeight + "px";
    await animate(panel, { height: "0px" }, { duration: 0.3, ease }).finished;
  }
}
document.querySelectorAll("[data-acc]").forEach(group => {
  const items = [...group.querySelectorAll(".item")];
  items.forEach(it => {
    setItem(it, it.classList.contains("is-open"), true);
    it.querySelector(".item__head").addEventListener("click", () => {
      const willOpen = !it.classList.contains("is-open");
      items.forEach(o => { if (o !== it) setItem(o, false); });
      setItem(it, willOpen);
    });
  });
});

/* Índice lateral: marca a seção que está na tela */
const toc = [...document.querySelectorAll(".toc a")];
if (toc.length && "IntersectionObserver" in window) {
  const map = new Map(toc.map(a => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { toc.forEach(a => a.classList.remove("is-active")); map.get(en.target.id)?.classList.add("is-active"); } });
  }, { rootMargin: "-20% 0px -65% 0px" });
  map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}

/* Único momento de movimento: a abertura da página */
if (reduce) { root.classList.remove("motion-pending"); }
else {
  animate("[data-hero]", { opacity: [0, 1], y: [14, 0] }, { duration: 0.8, delay: stagger(0.1), ease })
    .finished.then(() => root.classList.remove("motion-pending"));
}
