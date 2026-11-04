// The website: pages, product list and the quote list.
// All the text about the factory comes from site-data.js.

let quote = loadQuote();     // [{ id, qty }]
let sent = loadSent();       // the last request that reached the factory: { id, at, items, details }
let details = sent ? sent.details : null; // what the customer typed; set when a request is prepared
let quoteStep = sent ? 2 : 1; // 1 items and details, 2 ready to send or sent
let sendError = "";          // why the last request could not be sent
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

function telHref(phone) {
  return "tel:" + phone.replace(/\D/g, "");
}

// A new page or a redrawn form loses the keyboard's place, so start again at the heading.
function focusHeading() {
  const heading = document.querySelector(".page.active h1");
  if (!heading) return;
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
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

// The sent request is kept so a reload still shows its number,
// and the list is emptied so it cannot be sent twice.
function loadSent() {
  try {
    const saved = JSON.parse(localStorage.getItem("site-sent"));
    if (!saved || !Number.isInteger(saved.id) || !saved.details) return null;
    saved.items = (saved.items || []).filter(item => findProduct(item.id));
    return saved;
  } catch (e) {
    return null;
  }
}

function saveSent() {
  try {
    if (sent) localStorage.setItem("site-sent", JSON.stringify(sent));
    else localStorage.removeItem("site-sent");
  } catch (e) { /* the number still shows until the page closes */ }
}

// Adding a product after a request was sent starts a new request.
function startNewRequest() {
  if (sent) details = { ...sent.details, note: "" };
  sent = null;
  saveSent();
  quoteStep = 1;
}

function addToQuote(product, qty) {
  if (sent) startNewRequest();
  const item = quote.find(i => i.id === product.id);
  if (item) item.qty += qty;
  else quote.push({ id: product.id, qty });
  saveQuote();
  showToast(t("Added to your quote list"), "#quote", t("View list"));
}

let toastTimer;
function showToast(text, href, linkText) {
  const toast = $("toast");
  toast.replaceChildren(el("span", "", text));
  if (href) toast.append(link(href, "", linkText));
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), href ? 4000 : 2400);
}

/* ---------- Shared pieces ---------- */

function productVisual(product) {
  const box = el("div", "visual");
  if (product.images.length) {
    const img = el("img");
    img.src = product.images[0];
    img.alt = tx(product.name);
    img.loading = "lazy";
    img.decoding = "async";
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
  if (product.code) a.append(el("p", "meta", product.code));
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
    const wanted = Math.round(Number(next)) || 0;
    if (wanted < min) showToast(t("The minimum order is {n}", { n: min }));
    const qty = Math.max(min, wanted);
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

  const categories = el("section", "section");
  categories.append(sectionHead(t("Shop by category"), "", "#products"));
  const row = el("div", "categories");
  for (const category of CATEGORIES) {
    const a = link("#cat-" + category.id, "category");
    const pic = el("div", "pic");
    if (category.image) {
      const img = el("img");
      img.src = category.image;
      img.alt = "";
      img.loading = "lazy";
      pic.append(img);
    } else {
      pic.innerHTML = productArt(category.art);
    }
    const count = PRODUCTS.filter(p => p.category === category.id).length;
    a.append(pic, el("b", "", tx(category.name)), el("small", "", t("{n} products", { n: count })));
    row.append(a);
  }
  categories.append(row);
  root.append(categories);

  const popular = el("section", "section");
  popular.append(sectionHead(t("Popular products"), tx(SITE.text.popular), "#products"));
  const grid = el("div", "grid");
  PRODUCTS.filter(p => p.popular).slice(0, 4).forEach(p => grid.append(productCard(p)));
  popular.append(grid);
  root.append(popular);

  if (SITE.facts.length || SITE.certificates.length || SITE.customers.length) root.append(proofSection());

  const promo = el("section", "promo");
  const promoCopy = el("div", "promo-copy");
  promoCopy.append(el("p", "eyebrow", tx(SITE.text.promoLabel)));
  promoCopy.append(el("h2", "", tx(SITE.text.promoTitle)));
  promoCopy.append(el("p", "lead", tx(SITE.text.promoText)));
  promoCopy.append(buttonLink("#quote", t("Ask for a quote"), "btn light"));
  const promoArt = el("div", "promo-art");
  promoArt.innerHTML = productArt("stack");
  promoArt.append(el("p", "script", tx(SITE.slogan)));
  promo.append(promoCopy, promoArt);
  root.append(promo);

  root.append(contactBand());
}

function proofSection() {
  const section = el("section", "section");
  section.append(sectionHead(t("Why work with us")));
  if (SITE.facts.length) {
    const facts = el("dl", "facts");
    for (const fact of SITE.facts) {
      const item = el("div");
      item.append(el("dt", "", tx(fact.label)), el("dd", "", fact.value));
      facts.append(item);
    }
    section.append(facts);
  }
  if (SITE.certificates.length) {
    section.append(el("h3", "proof-head", t("Certificates")));
    const list = el("ul", "proof-list");
    for (const certificate of SITE.certificates) {
      const li = el("li");
      li.append(el("b", "", certificate.name), el("small", "", tx(certificate.note)));
      list.append(li);
    }
    section.append(list);
  }
  if (SITE.customers.length) {
    section.append(el("h3", "proof-head", t("Our customers")));
    const list = el("ul", "proof-list");
    SITE.customers.forEach(customer => list.append(el("li", "", tx(customer))));
    section.append(list);
  }
  return section;
}

function contactBand() {
  const band = el("section", "band");
  const copy = el("div");
  copy.append(el("h2", "", tx(SITE.text.bandTitle)));
  copy.append(el("p", "lead", tx(SITE.text.bandText)));
  const actions = el("div", "actions");
  actions.append(buttonLink("#contact", t("Contact us"), "btn light"));
  const phone = SITE.contact.phones[0];
  if (phone) {
    const call = link(telHref(phone), "btn outline");
    call.insertAdjacentHTML("beforeend", icon("phone"));
    call.append(el("span", "", t("Call {phone}", { phone })));
    actions.append(call);
  }
  band.append(copy, actions);
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
      $("page-products").querySelector(".chip.active").focus();
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
    (filter === "all" || p.category === filter) && searchText(p).includes(words));
  shown.forEach(p => grid.append(productCard(p)));
  if (!shown.length) grid.append(el("p", "empty", t("No products match your search.")));
}

function searchText(product) {
  const category = CATEGORIES.find(c => c.id === product.category);
  return [product.code || "", product.name, product.size, product.description, category ? category.name : ""]
    .map(tx).join(" ").toLowerCase();
}

function pageTitle(title, text) {
  const head = el("div", "page-title");
  head.append(el("h1", "", title));
  if (text) head.append(el("p", "muted", text));
  return head;
}

/* ---------- Product page ---------- */

// Shows a product's photos full screen. The arrow keys or buttons move between them.
function openPhotos(product, start) {
  const photos = product.images;
  let i = start;
  const box = el("dialog", "lightbox");
  box.setAttribute("aria-label", tx(product.name));
  const img = el("img");
  img.alt = tx(product.name);
  const count = el("p", "lightbox-count");
  const show = n => {
    i = (n + photos.length) % photos.length;
    img.src = photos[i];
    count.textContent = photos.length > 1 ? (i + 1) + " / " + photos.length : "";
  };
  const button = (cls, label, text, action) => {
    const b = el("button", "lightbox-btn " + cls, text);
    b.type = "button";
    b.setAttribute("aria-label", label);
    b.addEventListener("click", e => { e.stopPropagation(); action(); });
    return b;
  };
  box.append(img, count, button("close", t("Close"), "×", () => box.close()));
  if (photos.length > 1) {
    box.append(button("prev", t("Previous photo"), "‹", () => show(i - 1)));
    box.append(button("next", t("Next photo"), "›", () => show(i + 1)));
  }
  box.addEventListener("click", () => box.close());
  box.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") show(i - 1);
    if (e.key === "ArrowRight") show(i + 1);
  });
  box.addEventListener("close", () => box.remove());
  show(start);
  document.body.append(box);
  box.showModal();
}

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
  let shown = 0;
  if (product.images.length) {
    // Tapping the photo opens it full size, so tall photos are never cut off.
    const zoom = el("button", "zoom");
    zoom.type = "button";
    zoom.setAttribute("aria-label", t("See the photo full size"));
    zoom.append(main);
    zoom.addEventListener("click", () => openPhotos(product, shown));
    gallery.append(zoom);
  } else {
    gallery.append(main);
  }
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
      thumb.addEventListener("click", () => { main.querySelector("img").src = src; shown = i; });
      thumbs.append(thumb);
    });
    gallery.append(thumbs);
  }
  if (product.images.length) gallery.append(el("p", "meta zoom-hint", t("Tap the photo to see it full size")));

  const info = el("div", "info");
  if (product.badge) info.append(el("span", "badge inline", tx(product.badge)));
  info.append(el("h1", "", tx(product.name)));
  if (product.code) info.append(el("p", "meta", product.code));
  info.append(el("p", "meta", tx(product.size)));
  if (tx(product.description)) info.append(el("p", "description", tx(product.description)));

  const specs = el("dl", "specs");
  for (const spec of product.specs) {
    const item = el("div");
    item.append(el("dt", "", tx(spec.label)), el("dd", "", tx(spec.value)));
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

  const print = el("button", "text-btn print-btn", t("Print spec sheet"));
  print.type = "button";
  print.addEventListener("click", () => window.print());
  info.append(print);
  info.append(el("p", "print-contact", tx(SITE.fullName) + " · " + SITE.contact.phones.join(" / ")));

  layout.append(gallery, info);
  root.append(layout, contactBand());
}

/* ---------- Quote ---------- */

function renderSteps(active) {
  const steps = el("ol", "steps");
  ["List and details", "Send"].forEach((name, i) => {
    const li = el("li", i + 1 <= active ? "active" : "");
    li.append(el("span", "num", i + 1), el("span", "", t(name)));
    steps.append(li);
  });
  return steps;
}

// Keeps what the customer typed when the form is redrawn.
function keepTypedDetails() {
  if (!$("quote-name")) return;
  details = {
    name: $("quote-name").value.trim(),
    company: $("quote-company").value.trim(),
    phone: $("quote-phone").value.trim(),
    note: $("quote-note").value.trim()
  };
}

function renderQuote() {
  const root = $("page-quote");
  keepTypedDetails();
  root.replaceChildren();
  root.append(pageTitle(t("Your quote list")));

  if (quoteStep === 2 && details) {
    root.append(renderSteps(2), renderReady());
    return;
  }

  root.append(renderSteps(1));
  const layout = el("div", "quote-layout");
  layout.append(quote.length ? renderQuoteList() : renderEmptyQuote(), renderQuoteForm());
  root.append(layout);
}

function renderEmptyQuote() {
  const empty = el("div", "empty-card");
  empty.insertAdjacentHTML("beforeend", icon("clipboard"));
  empty.append(el("h2", "", t("Your quote list is empty")));
  empty.append(el("p", "muted", t("Add the products you are interested in, or tell us what you need with the form.")));
  empty.append(buttonLink("#products", t("See our products")));
  return empty;
}

function renderQuoteList() {
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
      focusHeading();
    });
    const qty = stepper(item.qty, product.moq, value => {
      item.qty = value;
      saveQuote();
    });
    li.append(pic, text, qty, remove);
    ul.append(li);
  }
  list.append(ul);
  return list;
}

function renderQuoteForm() {
  const form = el("form", "card form");
  form.append(el("h2", "", quote.length ? t("Your details") : t("Tell us what you need")));
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
  // With nothing on the list, the note is the request, so it must be filled in.
  const noteLabel = el("label", "", quote.length ? t("Note (optional)") : t("What do you need?"));
  const note = el("textarea");
  note.id = "quote-note";
  note.rows = 3;
  note.required = !quote.length;
  note.placeholder = quote.length ? t("Delivery area, the date you need it, or any other details") : t("The product, how many, and when you need it");
  note.value = details ? details.note : "";
  noteLabel.append(note);
  form.append(noteLabel);

  const error = el("p", "form-error");
  error.setAttribute("role", "alert");
  error.hidden = true;
  const submit = el("button", "btn", t("Send my request"));
  submit.type = "submit";
  form.append(error, submit, el("p", "hint", t("We will reply with prices and delivery details.")));

  const showError = text => {
    error.textContent = text;
    error.hidden = false;
  };

  form.addEventListener("submit", async e => {
    e.preventDefault();
    keepTypedDetails();
    error.hidden = true;
    // The same check the factory's system makes, so the customer can fix it here
    const digits = details.phone.replace(/[^0-9+]/g, "").length;
    if (digits < 9 || digits > 15) {
      showError(t("Please check the phone number, for example 081 234 5678."));
      $("quote-phone").focus();
      return;
    }
    submit.disabled = true;
    submit.textContent = t("Sending...");
    const result = await sendOrder();
    if (result.fix) {
      // Something the customer typed was not accepted: stay on the form
      submit.disabled = false;
      submit.textContent = t("Send my request");
      showError(result.error);
      return;
    }
    sendError = result.error || "";
    if (result.id) {
      sent = { id: result.id, at: Date.now(), items: quote, details };
      saveSent();
      quote = [];
      saveQuote();
    }
    quoteStep = 2;
    renderQuote();
    window.scrollTo(0, 0);
    focusHeading();
  });
  return form;
}

// What the factory's system says when it turns a request down.
// fix: true means the customer can correct it on the form.
const ORDER_ERRORS = {
  "Please fill in your name.": true,
  "Please check the phone number.": true,
  "The text is too long.": true,
  "Add a product or tell us what you need.": true,
  "The product list is not valid.": false,
  "Too many orders right now. Please send it on LINE or call us.": false
};

// Sends the request to the factory's stock app. Gives back { id } with the
// request number, or { error, fix } when it could not be sent, so the
// customer can correct it or send it on LINE instead.
async function sendOrder() {
  const db = SITE.orderDatabase;
  if (!db || !db.url) return {};
  const lines = quote.map(item => {
    const product = findProduct(item.id);
    return { code: product.code, name: product.name.th, qty: item.qty, unit: product.unit.th };
  });
  const stop = new AbortController();
  const timer = setTimeout(() => stop.abort(), 15000);
  try {
    const reply = await fetch(db.url + "/rest/v1/rpc/submit_web_order", {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: db.key },
      body: JSON.stringify({ p_name: details.name, p_phone: details.phone, p_lines: lines, p_company: details.company, p_note: details.note }),
      signal: stop.signal
    });
    if (!reply.ok) {
      const body = await reply.json().catch(() => ({}));
      if (body.message in ORDER_ERRORS) return { error: t(body.message), fix: ORDER_ERRORS[body.message] };
      return { error: t("The factory's system could not take the request right now.") };
    }
    const id = await reply.json();
    return Number.isInteger(id) ? { id } : { error: t("The factory's system could not take the request right now.") };
  } catch (e) {
    // After a timeout the request may still have arrived, so say so instead of inviting a second send
    if (e.name === "AbortError") return { error: t("The connection was too slow, so we are not sure the request arrived. Please call us before sending it again.") };
    return { error: t("We could not connect. Check your internet, or send it to us below.") };
  } finally {
    clearTimeout(timer);
  }
}

function quoteMessage() {
  const factory = tx(SITE.fullName);
  const items = sent ? sent.items : quote;
  const lines = [];
  if (sent) lines.push(t("Request #{n}", { n: sent.id }));
  if (items.length) {
    lines.push(t("Hello {factory}, I would like a quote for:", { factory }), "");
    for (const item of items) {
      const product = findProduct(item.id);
      const code = product.code ? product.code + " " : "";
      lines.push("- " + code + tx(product.name) + " × " + item.qty + " " + tx(product.unit));
    }
  } else {
    lines.push(t("Hello {factory}, I would like to ask about:", { factory }), "", details.note);
  }
  lines.push("", t("Name") + ": " + details.name);
  if (details.company) lines.push(t("Company") + ": " + details.company);
  lines.push(t("Phone") + ": " + details.phone);
  if (items.length && details.note) lines.push(t("Note") + ": " + details.note);
  return lines.join("\n");
}

function renderReady() {
  const card = el("div", "card ready");
  const tick = el("div", "tick");
  tick.innerHTML = icon("check");
  const contact = SITE.contact;
  if (sent) {
    const when = new Date(sent.at).toLocaleString(lang === "th" ? "th-TH" : "en-GB", { dateStyle: "medium", timeStyle: "short" });
    card.append(tick, el("h2", "", t("We received your price request #{n}", { n: sent.id })));
    card.append(el("p", "hint", t("Sent on {date}", { date: when })));
    card.append(el("p", "muted", t("This is not an order yet. We will contact you with prices and delivery details, and the order starts once you agree.")));
    card.append(el("p", "muted", contact.line
      ? t("Keep this number. To add details, send this message to us on LINE.")
      : t("Keep this number. To change anything, call us and give this number.")));
  } else {
    card.append(tick, el("h2", "", t("Your request is ready to send")));
    card.append(el("p", "muted", t("It has not been sent yet. Send this message to us with one of the options below.")));
    if (sendError) card.append(el("p", "form-error", sendError));
  }

  const message = quoteMessage();
  const box = el("textarea", "message");
  box.id = "quote-message";
  box.readOnly = true;
  box.rows = message.split("\n").length + 1;
  box.value = message;
  card.append(box);

  const actions = el("div", "ready-actions");
  if (contact.line) {
    const a = link("https://line.me/R/oaMessage/" + encodeURIComponent(contact.line) + "/?" + encodeURIComponent(message), "btn");
    a.target = "_blank";
    a.rel = "noopener";
    a.insertAdjacentHTML("beforeend", icon("chat"));
    a.append(el("span", "", t("Send on LINE")));
    actions.append(a);
  }
  for (const phone of contact.phones) {
    const a = link(telHref(phone), contact.line ? "btn soft" : "btn");
    a.insertAdjacentHTML("beforeend", icon("phone"));
    a.append(el("span", "", t("Call {phone}", { phone })));
    actions.append(a);
  }
  const copy = el("button", "btn soft");
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

  if (contact.lineQr) {
    const qr = el("img", "qr");
    qr.src = contact.lineQr;
    qr.alt = t("Line ID");
    card.append(qr);
  }

  if (SITE.sample && !contact.line) {
    card.append(el("p", "hint", t("Sample site: the LINE button will appear here when the factory details are added.")));
  }

  // A sent order cannot be edited, or the factory would get it twice
  const edit = el("button", "text-btn", sent ? t("Start a new request") : t("Edit my request"));
  edit.type = "button";
  edit.addEventListener("click", () => {
    startNewRequest();
    renderQuote();
    focusHeading();
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
  SITE.story
    .filter(paragraph => SITE.sample || !paragraph.draft)
    .forEach(paragraph => copy.append(el("p", "story", tx(paragraph))));
  const art = el("div", "about-art");
  art.innerHTML = factoryArt();
  top.append(copy, art);
  root.append(top);

  const section = el("section", "section");
  section.append(sectionHead(t("How we make our products"), t("From raw materials to your door.")));
  section.append(processList(SITE.steps));
  root.append(section);

  if (SITE.ordering.length) {
    const ordering = el("section", "section");
    ordering.append(sectionHead(t("How to order")));
    ordering.append(processList(SITE.ordering));
    root.append(ordering);
  }

  if (SITE.faq.length) {
    const faq = el("section", "section");
    faq.append(sectionHead(t("Common questions")));
    for (const item of SITE.faq) {
      const entry = el("details", "faq");
      entry.append(el("summary", "", tx(item.q)), el("p", "muted", tx(item.a)));
      faq.append(entry);
    }
    root.append(faq);
  }

  root.append(contactBandQuote());
}

function processList(items) {
  const steps = el("ol", "process");
  items.forEach(step => {
    const li = el("li");
    const dot = el("span", "dot");
    dot.innerHTML = icon("check");
    const text = el("div");
    text.append(el("b", "", tx(step.title)), el("small", "", tx(step.text)));
    li.append(dot, text);
    steps.append(li);
  });
  return steps;
}

function renderContact() {
  const root = $("page-contact");
  root.replaceChildren();
  root.append(pageTitle(t("Contact us"), t("We would love to hear from you.")));

  const contact = SITE.contact;
  const items = [
    { icon: "phone", label: "Phone number", links: contact.phones.map(phone => ({ href: telHref(phone), text: phone })) },
    { icon: "chat", label: "Line ID", links: contact.line ? [{ href: lineHref(contact.line), text: contact.line }] : [], picture: contact.lineQr },
    { icon: "clock", label: "Opening hours", value: tx(contact.hours) }
  ];
  const grid = el("div", "contact-grid");
  for (const item of items) {
    if (SITE.sample || contactFilled(item)) grid.append(contactCard(item));
  }

  const place = { icon: "pin", label: "Address", value: tx(contact.address) };
  if (SITE.sample || contactFilled(place)) {
    const address = contactCard(place);
    address.classList.add("wide");
    if (contact.mapUrl) {
      const map = link(contact.mapUrl, "more", t("Open in Google Maps"));
      map.target = "_blank";
      map.rel = "noopener";
      address.append(map);
    }
    grid.append(address);
  }
  root.append(grid);
  root.append(contactBandQuote());
}

function lineHref(id) {
  return "https://line.me/R/ti/p/" + encodeURIComponent(id);
}

function contactFilled(item) {
  return !!item.value || !!(item.links && item.links.length);
}

function contactCard(item) {
  const card = el("div", "contact-card");
  const pic = el("span", "contact-icon");
  pic.innerHTML = icon(item.icon);
  const text = el("div", "contact-text");
  text.append(el("small", "", t(item.label)));
  if (item.links && item.links.length) {
    for (const entry of item.links) text.append(link(entry.href, "contact-link", entry.text));
  } else {
    text.append(el("b", item.value ? "" : "missing", item.value || t("To be added")));
  }
  card.append(pic, text);
  if (item.picture) {
    const qr = el("img", "qr");
    qr.src = item.picture;
    qr.alt = t(item.label);
    card.append(qr);
  }
  return card;
}

function contactBandQuote() {
  const band = el("section", "band");
  const copy = el("div");
  copy.append(el("h2", "", tx(SITE.text.promoTitle)));
  copy.append(el("p", "lead", tx(SITE.text.promoText)));
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
  const contact = SITE.contact;
  if (tx(contact.legalName)) about.append(el("p", "muted", tx(contact.legalName)));
  if (contact.registration) about.append(el("p", "muted", t("Registration no. {n}", { n: contact.registration })));

  const menu = el("div");
  menu.append(el("h3", "", t("Menu")));
  [["#home", "Home"], ["#products", "Products"], ["#quote", "Quote list"], ["#about", "About us"], ["#contact", "Contact"]]
    .forEach(([href, name]) => menu.append(link(href, "", t(name))));

  const categories = el("div");
  categories.append(el("h3", "", t("Categories")));
  CATEGORIES.forEach(c => categories.append(link("#cat-" + c.id, "", tx(c.name))));

  const reach = el("div");
  reach.append(el("h3", "", t("Contact")));
  contact.phones.forEach(phone => reach.append(link(telHref(phone), "", phone)));
  if (contact.line) reach.append(link(lineHref(contact.line), "", "LINE " + contact.line));

  const copyright = el("p", "copyright", "© " + new Date().getFullYear() + " " + tx(SITE.fullName) + ". " + t("All rights reserved."));
  root.append(about, menu, categories, reach, copyright);
}

function pageName() {
  if (page === "product") {
    const product = findProduct(productId);
    return product ? tx(product.name) : t("Product not found");
  }
  return { products: t("All products"), quote: t("Your quote list"), about: t("About us"), contact: t("Contact us") }[page];
}

function updateTitle() {
  const name = pageName();
  document.title = name ? name + " | " + tx(SITE.fullName) : tx(SITE.fullName);
}

function renderAll() {
  translateStatic();
  updateTitle();
  $("brand-name").textContent = tx(SITE.fullName);
  const phone = SITE.contact.phones[0];
  $("top-phone").hidden = !phone;
  if (phone) {
    $("top-phone").href = telHref(phone);
    $("top-phone-number").textContent = phone;
  }
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
  $("toast").classList.remove("show");
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
  updateTitle();
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-icon]").forEach(node => { node.innerHTML = icon(node.dataset.icon); });
document.querySelector(".skip").addEventListener("click", e => {
  e.preventDefault();
  focusHeading();
});
$("sample-bar").hidden = !SITE.sample;
$("lang-btn").addEventListener("click", () => {
  setLang(lang === "th" ? "en" : "th");
  renderAll();
});
window.addEventListener("hashchange", () => {
  route();
  focusHeading();
});

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
