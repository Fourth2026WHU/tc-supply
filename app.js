// The website: pages, product list and the quote list.
// All the text about the factory comes from site-data.js.

let quote = loadQuote();     // [{ id, qty }]
let details = null;          // what the customer typed; set when a request is prepared
let quoteStep = 1;           // 1 items and details, 3 ready to send
let filter = "all";
let search = "";
let page = "home";
let productId = "";

const $ = id => document.getElementById(id);

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

function link(href, cls, text) {
  const a = el("a", cls, text);
  a.href = href;
  return a;
}

function buttonLink(href, text, cls = "btn") {
  const a = link(href, cls);
  a.append(el("span", "", text));
  a.insertAdjacentHTML("beforeend", icon("arrow"));
  return a;
}

function findProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

/* ---------- Quote list ---------- */

function loadQuote() {
  try {
    const saved = JSON.parse(localStorage.getItem("site-quote")) || [];
    return saved.filter(item => findProduct(item.id));
  } catch (e) {
    return [];
  }
}

function saveQuote() {
  try { localStorage.setItem("site-quote", JSON.stringify(quote)); } catch (e) { /* the list still works until the page closes */ }
  document.querySelectorAll("[data-quote-count]").forEach(node => {
    node.textContent = quote.length;
    node.hidden = quote.length === 0;
  });
}

function addToQuote(product, qty) {
  const item = quote.find(i => i.id === product.id);
  if (item) item.qty += qty;
  else quote.push({ id: product.id, qty });
  saveQuote();
  showToast(t("Added to your quote list"));
}

let toastTimer;
function showToast(text) {
  const toast = $("toast");
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

/* ---------- Shared pieces ---------- */

function productVisual(product) {
  const box = el("div", "visual");
  if (product.images.length) {
    const img = el("img");
    img.src = product.images[0];
    img.alt = tx(product.name);
    box.append(img);
  } else {
    box.innerHTML = productArt(product.art);
  }
  return box;
}

function productCard(product) {
  const card = el("article", "product");
  const a = link("#product-" + product.id, "product-link");
  a.append(productVisual(product));
  if (product.badge) a.append(el("span", "badge", tx(product.badge)));
  a.append(el("h3", "", tx(product.name)));
  a.append(el("p", "meta", tx(product.size)));
  a.append(el("p", "moq", t("Minimum {n} {unit}", { n: product.moq, unit: tx(product.unit) })));
  card.append(a);

  const add = el("button", "btn small", t("Add to quote"));
  add.type = "button";
  add.addEventListener("click", () => addToQuote(product, product.moq));
  card.append(add);
  return card;
}

function sectionHead(title, text, href) {
  const head = el("div", "section-head");
  const left = el("div");
  left.append(el("h2", "", title));
  if (text) left.append(el("p", "muted", text));
  head.append(left);
  if (href) {
    const more = link(href, "more");
    more.append(el("span", "", t("View all")));
    more.insertAdjacentHTML("beforeend", icon("arrow"));
    head.append(more);
  }
  return head;
}

function stepper(value, min, onChange) {
  const box = el("div", "stepper");
  const minus = el("button", "", "−");
  const plus = el("button", "", "+");
  const input = el("input");
  minus.type = plus.type = "button";
  minus.setAttribute("aria-label", t("Decrease quantity"));
  plus.setAttribute("aria-label", t("Increase quantity"));
  input.type = "number";
  input.min = min;
  input.value = value;
  input.inputMode = "numeric";
  input.setAttribute("aria-label", t("Quantity"));

  const set = next => {
    const qty = Math.max(min, Math.round(Number(next)) || min);
    input.value = qty;
    onChange(qty);
  };
  minus.addEventListener("click", () => set(Number(input.value) - 1));
  plus.addEventListener("click", () => set(Number(input.value) + 1));
  input.addEventListener("change", () => set(input.value));
  box.append(minus, input, plus);
  return box;
}

/* ---------- Home ---------- */

function renderHome() {
  const root = $("page-home");
  root.replaceChildren();

  const hero = el("div", "hero");
  const copy = el("div", "hero-copy");
  copy.append(el("p", "eyebrow", tx(SITE.hero.label)));
  copy.append(el("h1", "", tx(SITE.hero.title)));
  copy.append(el("p", "lead", tx(SITE.hero.text)));
  const actions = el("div", "actions");
  actions.append(buttonLink("#products", t("See our products"), "btn light"));
  actions.append(link("#about", "btn outline", t("Our factory")));
  copy.append(actions);
  const art = el("div", "hero-art");
  art.innerHTML = factoryArt();
  hero.append(copy, art);
  root.append(hero);

  const promises = el("ul", "promises");
  for (const item of SITE.promises) {
    const li = el("li");
    li.insertAdjacentHTML("beforeend", icon(item.icon));
    const text = el("div");
    text.append(el("b", "", tx(item.title)), el("small", "", tx(item.text)));
    li.append(text);
    promises.append(li);
  }
  root.append(promises);

  const popular = el("section", "section");
  popular.append(sectionHead(t("Popular products"), t("The products our customers order most."), "#products"));
  const grid = el("div", "grid");
  PRODUCTS.filter(p => p.popular).slice(0, 4).forEach(p => grid.append(productCard(p)));
  popular.append(grid);
  root.append(popular);

  const promo = el("section", "promo");
  const promoCopy = el("div", "promo-copy");
  promoCopy.append(el("p", "eyebrow", t("Ordering in bulk?")));
  promoCopy.append(el("h2", "", t("Get a factory price")));
  promoCopy.append(el("p", "lead", t("Tell us what you need and how many. We will send you a price.")));
  promoCopy.append(buttonLink("#quote", t("Ask for a quote"), "btn light"));
  const promoArt = el("div", "promo-art");
  promoArt.innerHTML = productArt("stack");
  promoArt.append(el("p", "script", tx(SITE.slogan)));
  promo.append(promoCopy, promoArt);
  root.append(promo);

  const categories = el("section", "section");
  categories.append(sectionHead(t("Shop by category"), "", "#products"));
  const row = el("div", "categories");
  for (const category of CATEGORIES) {
    const a = link("#cat-" + category.id, "category");
    const pic = el("div", "pic");
    pic.innerHTML = productArt(category.art);
    const count = PRODUCTS.filter(p => p.category === category.id).length;
    a.append(pic, el("b", "", tx(category.name)), el("small", "", t("{n} products", { n: count })));
    row.append(a);
  }
  categories.append(row);
  root.append(categories);

  root.append(contactBand());
}

function contactBand() {
  const band = el("section", "band");
  const copy = el("div");
  copy.append(el("h2", "", t("Talk to our family")));
  copy.append(el("p", "lead", t("Have a question about a product or an order? We are happy to help.")));
  band.append(copy, buttonLink("#contact", t("Contact us"), "btn light"));
  return band;
}

/* ---------- Products ---------- */

function renderProducts() {
  const root = $("page-products");
  root.replaceChildren();
  root.append(pageTitle(t("All products"), t("Everything we make, in one place.")));

  const bar = el("div", "filters");
  const chips = el("div", "chips");
  for (const category of [{ id: "all", name: null }, ...CATEGORIES]) {
    const chip = el("button", "chip" + (filter === category.id ? " active" : ""), category.name ? tx(category.name) : t("All"));
    chip.type = "button";
    chip.setAttribute("aria-pressed", filter === category.id);
    chip.addEventListener("click", () => {
      filter = category.id;
      renderProducts();
    });
    chips.append(chip);
  }

  const searchBox = el("label", "search");
  searchBox.insertAdjacentHTML("beforeend", icon("search"));
  const input = el("input");
  input.type = "search";
  input.id = "product-search";
  input.value = search;
  input.placeholder = t("Search products");
  input.setAttribute("aria-label", t("Search products"));
  input.addEventListener("input", () => {
    search = input.value;
    fillProductGrid();
  });
  searchBox.append(input);
  bar.append(chips, searchBox);
  root.append(bar);

  root.append(Object.assign(el("div", "grid"), { id: "product-grid" }));
  fillProductGrid();
}

function fillProductGrid() {
  const grid = $("product-grid");
  grid.replaceChildren();
  const words = search.trim().toLowerCase();
  const shown = PRODUCTS.filter(p =>
    (filter === "all" || p.category === filter) &&
    (tx(p.name) + " " + tx(p.size)).toLowerCase().includes(words));
  shown.forEach(p => grid.append(productCard(p)));
  if (!shown.length) grid.append(el("p", "empty", t("No products match your search.")));
}

function pageTitle(title, text) {
  const head = el("div", "page-title");
  head.append(el("h1", "", title));
  if (text) head.append(el("p", "muted", text));
  return head;
}

/* ---------- Product page ---------- */

function renderProduct() {
  const root = $("page-product");
  root.replaceChildren();
  const back = link("#products", "more back");
  back.insertAdjacentHTML("beforeend", icon("back"));
  back.append(el("span", "", t("Back to products")));
  root.append(back);

  const product = findProduct(productId);
  if (!product) {
    root.append(pageTitle(t("Product not found"), t("This product may have been removed.")));
    return;
  }

  const layout = el("div", "detail");
  const gallery = el("div", "gallery");
  const main = productVisual(product);
  gallery.append(main);
  if (product.images.length > 1) {
    const thumbs = el("div", "thumbs");
    product.images.forEach((src, i) => {
      const thumb = el("button");
      thumb.type = "button";
      thumb.setAttribute("aria-label", t("View product photo {n}", { n: i + 1 }));
      const img = el("img");
      img.src = src;
      img.alt = "";
      thumb.append(img);
      thumb.addEventListener("click", () => { main.querySelector("img").src = src; });
      thumbs.append(thumb);
    });
    gallery.append(thumbs);
  }

  const info = el("div", "info");
  if (product.badge) info.append(el("span", "badge inline", tx(product.badge)));
  info.append(el("h1", "", tx(product.name)));
  info.append(el("p", "meta", tx(product.size)));
  info.append(el("p", "description", tx(product.description)));

  const specs = el("dl", "specs");
  for (const spec of product.specs) {
    const item = el("div");
    item.append(el("dd", "", spec.value), el("dt", "", tx(spec.label)));
    specs.append(item);
  }
  info.append(specs);

  let qty = product.moq;
  const buy = el("div", "buy");
  const qtyBox = el("div");
  qtyBox.append(el("p", "field-label", t("Quantity") + " (" + tx(product.unit) + ")"));
  qtyBox.append(stepper(qty, product.moq, value => { qty = value; }));
  const add = el("button", "btn", t("Add to quote"));
  add.type = "button";
  add.addEventListener("click", () => addToQuote(product, qty));
  buy.append(qtyBox, add);
  info.append(buy);
  info.append(el("p", "moq", t("Minimum {n} {unit}", { n: product.moq, unit: tx(product.unit) })));

  layout.append(gallery, info);
  root.append(layout);
}

/* ---------- Quote ---------- */

function renderSteps(active) {
  const steps = el("ol", "steps");
  ["Items", "Your details", "Send"].forEach((name, i) => {
    const li = el("li", i + 1 <= active ? "active" : "");
    li.append(el("span", "num", i + 1), el("span", "", t(name)));
    steps.append(li);
  });
  return steps;
}

function renderQuote() {
  const root = $("page-quote");
  root.replaceChildren();
  root.append(pageTitle(t("Your quote list")));

  if (!quote.length) {
    const empty = el("div", "empty-card");
    empty.insertAdjacentHTML("beforeend", icon("clipboard"));
    empty.append(el("h2", "", t("Your quote list is empty")));
    empty.append(el("p", "muted", t("Add the products you are interested in, then come back here.")));
    empty.append(buttonLink("#products", t("See our products")));
    root.append(empty);
    return;
  }

  if (quoteStep === 3 && details) {
    root.append(renderSteps(3), renderReady());
    return;
  }

  root.append(renderSteps(2));
  const layout = el("div", "quote-layout");
  const list = el("div", "card");
  list.append(el("h2", "", t("Quote list") + " (" + quote.length + ")"));
  const ul = el("ul", "quote-items");
  for (const item of quote) {
    const product = findProduct(item.id);
    const li = el("li");
    const pic = productVisual(product);
    const text = el("div", "quote-name");
    text.append(link("#product-" + product.id, "", tx(product.name)), el("small", "", tx(product.size)));
    const remove = el("button", "icon-btn");
    remove.type = "button";
    remove.setAttribute("aria-label", t("Remove {name}", { name: tx(product.name) }));
    remove.innerHTML = icon("trash");
    remove.addEventListener("click", () => {
      quote = quote.filter(i => i !== item);
      saveQuote();
      renderQuote();
    });
    const qty = stepper(item.qty, product.moq, value => {
      item.qty = value;
      saveQuote();
    });
    li.append(pic, text, qty, remove);
    ul.append(li);
  }
  list.append(ul);

  layout.append(list, renderQuoteForm());
  root.append(layout);
}

function renderQuoteForm() {
  const form = el("form", "card form");
  form.append(el("h2", "", t("Your details")));
  const fields = [
    { id: "name", label: "Full name", type: "text", required: true, autocomplete: "name" },
    { id: "company", label: "Company (optional)", type: "text", autocomplete: "organization" },
    { id: "phone", label: "Phone number", type: "tel", required: true, autocomplete: "tel" }
  ];
  for (const field of fields) {
    const label = el("label", "", t(field.label));
    const input = el("input");
    input.type = field.type;
    input.id = "quote-" + field.id;
    input.required = !!field.required;
    input.autocomplete = field.autocomplete;
    input.value = details ? details[field.id] : "";
    label.append(input);
    form.append(label);
  }
  const noteLabel = el("label", "", t("Note (optional)"));
  const note = el("textarea");
  note.id = "quote-note";
  note.rows = 3;
  note.placeholder = t("Delivery area, the date you need it, or any other details");
  note.value = details ? details.note : "";
  noteLabel.append(note);
  form.append(noteLabel);

  const submit = el("button", "btn", t("Prepare my request"));
  submit.type = "submit";
  form.append(submit, el("p", "hint", t("We will reply with prices and delivery details.")));

  form.addEventListener("submit", e => {
    e.preventDefault();
    details = {
      name: $("quote-name").value.trim(),
      company: $("quote-company").value.trim(),
      phone: $("quote-phone").value.trim(),
      note: note.value.trim()
    };
    quoteStep = 3;
    renderQuote();
    window.scrollTo(0, 0);
  });
  return form;
}

function quoteMessage() {
  const lines = [t("Hello {factory}, I would like a quote for:", { factory: tx(SITE.fullName) }), ""];
  for (const item of quote) {
    const product = findProduct(item.id);
    lines.push("- " + tx(product.name) + " × " + item.qty + " " + tx(product.unit));
  }
  lines.push("", t("Name") + ": " + details.name);
  if (details.company) lines.push(t("Company") + ": " + details.company);
  lines.push(t("Phone") + ": " + details.phone);
  if (details.note) lines.push(t("Note") + ": " + details.note);
  return lines.join("\n");
}

function renderReady() {
  const card = el("div", "card ready");
  const tick = el("div", "tick");
  tick.innerHTML = icon("check");
  card.append(tick, el("h2", "", t("Your request is ready to send")));
  card.append(el("p", "muted", t("It has not been sent yet. Send this message to us with one of the options below.")));

  const message = quoteMessage();
  const box = el("textarea", "message");
  box.id = "quote-message";
  box.readOnly = true;
  box.rows = message.split("\n").length + 1;
  box.value = message;
  card.append(box);

  const actions = el("div", "ready-actions");
  const contact = SITE.contact;
  if (contact.line) {
    const a = link("https://line.me/R/oaMessage/" + encodeURIComponent(contact.line) + "/?" + encodeURIComponent(message), "btn");
    a.target = "_blank";
    a.rel = "noopener";
    a.insertAdjacentHTML("beforeend", icon("chat"));
    a.append(el("span", "", t("Send on LINE")));
    actions.append(a);
  }
  if (contact.email) {
    const a = link("mailto:" + contact.email + "?subject=" + encodeURIComponent(t("Quote request")) + "&body=" + encodeURIComponent(message), "btn");
    a.insertAdjacentHTML("beforeend", icon("mail"));
    a.append(el("span", "", t("Send by email")));
    actions.append(a);
  }
  const copy = el("button", contact.line || contact.email ? "btn soft" : "btn");
  copy.type = "button";
  copy.insertAdjacentHTML("beforeend", icon("copy"));
  const copyText = el("span", "", t("Copy message"));
  copy.append(copyText);
  copy.addEventListener("click", () => {
    navigator.clipboard.writeText(message).then(
      () => { copyText.textContent = t("Copied"); },
      () => {
        box.select();
        showToast(t("Select the message above and copy it."));
      });
  });
  actions.append(copy);
  card.append(actions);

  if (!contact.line && !contact.email) {
    card.append(el("p", "hint", t("Sample site: LINE and email will appear here when the factory details are added.")));
  }

  const edit = el("button", "text-btn", t("Edit my request"));
  edit.type = "button";
  edit.addEventListener("click", () => {
    quoteStep = 1;
    renderQuote();
  });
  card.append(edit);
  return card;
}

/* ---------- About and contact ---------- */

function renderAbout() {
  const root = $("page-about");
  root.replaceChildren();

  const top = el("div", "about");
  const copy = el("div");
  copy.append(el("p", "eyebrow dark", t("A family business")));
  copy.append(el("h1", "", t("Our story")));
  SITE.story.forEach(paragraph => copy.append(el("p", "story", tx(paragraph))));
  const art = el("div", "about-art");
  art.innerHTML = factoryArt();
  top.append(copy, art);
  root.append(top);

  const section = el("section", "section");
  section.append(sectionHead(t("How we make our products"), t("From raw materials to your door.")));
  const steps = el("ol", "process");
  SITE.steps.forEach(step => {
    const li = el("li");
    const dot = el("span", "dot");
    dot.innerHTML = icon("check");
    const text = el("div");
    text.append(el("b", "", tx(step.title)), el("small", "", tx(step.text)));
    li.append(dot, text);
    steps.append(li);
  });
  section.append(steps);
  root.append(section);
}

function renderContact() {
  const root = $("page-contact");
  root.replaceChildren();
  root.append(pageTitle(t("Contact us"), t("We would love to hear from you.")));

  const contact = SITE.contact;
  const items = [
    { icon: "phone", label: "Phone number", value: contact.phone },
    { icon: "chat", label: "Line ID", value: contact.line },
    { icon: "mail", label: "Email", value: contact.email },
    { icon: "clock", label: "Opening hours", value: tx(contact.hours) }
  ];
  const grid = el("div", "contact-grid");
  for (const item of items) grid.append(contactCard(item));

  const address = contactCard({ icon: "pin", label: "Address", value: tx(contact.address) });
  address.classList.add("wide");
  if (contact.mapUrl) {
    const map = link(contact.mapUrl, "more", t("Open in Google Maps"));
    map.target = "_blank";
    map.rel = "noopener";
    address.append(map);
  }
  grid.append(address);
  root.append(grid);
  root.append(contactBandQuote());
}

function contactCard(item) {
  const card = el("div", "contact-card");
  const pic = el("span", "contact-icon");
  pic.innerHTML = icon(item.icon);
  const text = el("div", "contact-text");
  text.append(el("small", "", t(item.label)));
  text.append(el("b", item.value ? "" : "missing", item.value || t("To be added")));
  card.append(pic, text);
  return card;
}

function contactBandQuote() {
  const band = el("section", "band");
  const copy = el("div");
  copy.append(el("h2", "", t("Get a factory price")));
  copy.append(el("p", "lead", t("Tell us what you need and how many. We will send you a price.")));
  band.append(copy, buttonLink("#quote", t("Ask for a quote"), "btn light"));
  return band;
}

/* ---------- Header and footer ---------- */

function renderFooter() {
  const root = $("footer");
  root.replaceChildren();

  const about = el("div", "foot-brand");
  const brand = link("#home", "brand");
  brand.append(el("span", "logo", SITE.name), el("span", "", tx(SITE.fullName)));
  about.append(brand, el("p", "muted", tx(SITE.slogan)));

  const menu = el("div");
  menu.append(el("h3", "", t("Menu")));
  [["#home", "Home"], ["#products", "Products"], ["#about", "About us"], ["#contact", "Contact"]]
    .forEach(([href, name]) => menu.append(link(href, "", t(name))));

  const categories = el("div");
  categories.append(el("h3", "", t("Categories")));
  CATEGORIES.forEach(c => categories.append(link("#cat-" + c.id, "", tx(c.name))));

  const copyright = el("p", "copyright", "© " + new Date().getFullYear() + " " + tx(SITE.fullName) + ". " + t("All rights reserved."));
  root.append(about, menu, categories, copyright);
}

function renderAll() {
  translateStatic();
  document.title = tx(SITE.fullName);
  $("brand-name").textContent = tx(SITE.fullName);
  $("lang-btn").textContent = lang === "th" ? "EN" : "ไทย";
  $("lang-btn").setAttribute("aria-label", lang === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย");
  renderHome();
  renderProducts();
  renderProduct();
  renderQuote();
  renderAbout();
  renderContact();
  renderFooter();
  saveQuote();
}

/* ---------- Pages ---------- */

function route() {
  const hash = location.hash.slice(1) || "home";
  if (hash === "view") return; // the "skip to content" link stays on this page
  page = hash;
  if (hash.startsWith("product-")) {
    productId = hash.slice("product-".length);
    page = "product";
    renderProduct();
  } else if (hash.startsWith("cat-")) {
    filter = hash.slice("cat-".length);
    search = "";
    page = "products";
    renderProducts();
  } else if (!$("page-" + hash)) {
    page = "home";
  }
  if (page === "quote") renderQuote();

  document.querySelectorAll(".page").forEach(p => p.classList.toggle("active", p.id === "page-" + page));
  const section = page === "product" ? "products" : page;
  document.querySelectorAll("[data-route]").forEach(a => {
    const on = a.dataset.route === section;
    a.classList.toggle("active", on);
    if (on) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-icon]").forEach(node => { node.innerHTML = icon(node.dataset.icon); });
$("sample-bar").hidden = !SITE.sample;
$("lang-btn").addEventListener("click", () => {
  setLang(lang === "th" ? "en" : "th");
  renderAll();
});
window.addEventListener("hashchange", route);

/* ---------- Password screen ---------- */

function isUnlocked() {
  if (!SITE.password) return true;
  try { return localStorage.getItem("site-pass") === SITE.password; } catch (e) { return false; }
}

function showGate() {
  document.body.classList.add("locked");
  $("gate").hidden = false;
  $("gate-name").textContent = tx(SITE.fullName);
  $("gate-pass").focus();
}

$("gate-form").addEventListener("submit", e => {
  e.preventDefault();
  const typed = $("gate-pass").value;
  if (typed !== SITE.password) {
    $("gate-error").textContent = t("Wrong password. Try again.");
    $("gate-error").hidden = false;
    return;
  }
  try { localStorage.setItem("site-pass", typed); } catch (e) { /* they will be asked again next time */ }
  document.body.classList.remove("locked");
  $("gate").hidden = true;
});

renderAll();
route();
if (!isUnlocked()) showGate();
