// Everything about the factory lives in this file. Change the text here and
// the website updates. Nothing else needs to be touched to add a product.

const SITE = {
  // Shows the "sample" bar at the top. Set to false when the real details are in.
  sample: true,

  // Visitors type this to see the site. It keeps casual visitors out, but anyone
  // can read it in this file. Set to "" to remove the password screen at launch.
  password: "tcsupply2026",

  name: "TC",
  fullName: { th: "ไทชิ ซับพลาย", en: "TC Supply" },
  slogan: { th: "ผลิตด้วยความใส่ใจจากครอบครัวของเรา", en: "Made with care by our family" },

  // Leave a contact empty ("") and it shows "To be added" on the sample site.
  // When sample is false, an empty contact is left out.
  // line is your LINE Official Account ID, for example "@tcfactory".
  // lineQr is a picture of your LINE QR code, for example "images/line-qr.png".
  // legalName and registration appear in the footer once they are filled in.
  contact: {
    phones: ["095-849-1276", "081-620-5769"],
    line: "",
    lineQr: "",
    email: "",
    legalName: { th: "", en: "" },
    registration: "",
    address: { th: "", en: "" },
    hours: { th: "", en: "" },
    mapUrl: ""
  },

  hero: {
    label: { th: "ผลิตเองในโรงงานของครอบครัว", en: "Made in our family factory" },
    title: { th: "สินค้าคุณภาพ ตรงจากโรงงาน", en: "Quality products, direct from the factory" },
    text: {
      th: "ดูสินค้าทั้งหมดของเรา เลือกรายการที่สนใจ แล้วขอใบเสนอราคาได้ในไม่กี่นาที",
      en: "Browse what we make, pick what you need, and ask for a quote in a few minutes."
    }
  },

  // The four promises under the hero. Keep only what is true for your factory.
  promises: [
    { icon: "factory", title: { th: "ตรงจากโรงงาน", en: "Direct from the factory" }, text: { th: "คุยกับผู้ผลิตโดยตรง", en: "Talk to the people who make it" } },
    { icon: "shield", title: { th: "ตรวจคุณภาพ", en: "Quality checked" }, text: { th: "ตรวจก่อนบรรจุทุกล็อต", en: "Every batch, before packing" } },
    { icon: "box", title: { th: "สั่งจำนวนมากได้", en: "Bulk orders" }, text: { th: "ราคาตามจำนวนที่สั่ง", en: "Priced by quantity" } },
    { icon: "truck", title: { th: "จัดส่งถึงคุณ", en: "Delivered to you" }, text: { th: "สอบถามค่าส่งได้เลย", en: "Ask us about shipping" } }
  ],

  // Lines used around the site. Keep only what is true for your factory.
  text: {
    popular: { th: "สินค้าที่ลูกค้าสั่งบ่อยที่สุด", en: "The products our customers order most." },
    promoLabel: { th: "สั่งจำนวนมาก?", en: "Ordering in bulk?" },
    promoTitle: { th: "รับราคาจากโรงงาน", en: "Get a factory price" },
    promoText: { th: "บอกเราว่าต้องการสินค้าอะไร จำนวนเท่าไหร่ แล้วเราจะแจ้งราคาให้คุณ", en: "Tell us what you need and how many. We will send you a price." },
    bandTitle: { th: "คุยกับครอบครัวเราได้เลย", en: "Talk to our family" },
    bandText: { th: "มีคำถามเรื่องสินค้าหรือการสั่งซื้อ เรายินดีช่วยเสมอ", en: "Have a question about a product or an order? We are happy to help." }
  },

  // Proof shown on the home page. Each list stays hidden while it is empty.
  // facts: { value: "1998", label: { th: "ปีที่ก่อตั้ง", en: "Founded" } }
  // certificates: { name: "ISO 9001", note: { th: "สินค้าที่ครอบคลุม", en: "Products covered" } }
  // customers: { th: "ชื่อลูกค้า", en: "Customer name" }, only with their permission
  facts: [],
  certificates: [],
  customers: [],

  // How to order and common questions, on the About page. Hidden while empty.
  // ordering: { title: { th: "...", en: "..." }, text: { th: "...", en: "..." } }
  // faq: { q: { th: "...", en: "..." }, a: { th: "...", en: "..." } }
  ordering: [],
  faq: [],

  // The story on the About page. Each item is one paragraph. A paragraph marked
  // draft is only shown on the sample site, so remove draft when it is real.
  story: [
    {
      draft: true,
      th: "เล่าเรื่องของครอบครัวตรงนี้: โรงงานเริ่มต้นเมื่อไหร่ ใครเป็นคนเริ่ม และเริ่มจากอะไร",
      en: "Tell your family's story here: when the factory started, who started it, and how."
    },
    {
      draft: true,
      th: "เล่าต่อว่าวันนี้เราทำอะไรอยู่ ลูกค้าของเราเป็นใคร และอะไรทำให้สินค้าของเราต่างจากที่อื่น",
      en: "Then say what you do today, who your customers are, and what makes your products different."
    }
  ],

  // How a product is made, in order. Shown on the About page.
  steps: [
    { title: { th: "รับวัตถุดิบ", en: "Materials arrive" }, text: { th: "ตรวจวัตถุดิบก่อนเข้าคลัง", en: "Checked before they go into stock" } },
    { title: { th: "ผลิต", en: "Production" }, text: { th: "ผลิตตามสูตรของเรา", en: "Made to our own recipes" } },
    { title: { th: "ตรวจคุณภาพ", en: "Quality check" }, text: { th: "ตรวจสินค้าก่อนบรรจุ", en: "Checked before packing" } },
    { title: { th: "บรรจุ", en: "Packing" }, text: { th: "บรรจุตามจำนวนที่สั่ง", en: "Packed to your order" } },
    { title: { th: "จัดส่ง", en: "Delivery" }, text: { th: "ส่งถึงมือลูกค้า", en: "On its way to you" } }
  ]
};

const CATEGORIES = [
  { id: "a", art: "box", name: { th: "หมวดสินค้า A", en: "Category A" } },
  { id: "b", art: "drum", name: { th: "หมวดสินค้า B", en: "Category B" } },
  { id: "c", art: "bag", name: { th: "หมวดสินค้า C", en: "Category C" } },
  { id: "d", art: "stack", name: { th: "หมวดสินค้า D", en: "Category D" } }
];

// To add a product, copy one block and change it.
// images: photo files, such as ["images/product-1.jpg"]. Leave [] to show a drawing.
// art: the drawing shown until there is a photo: box, drum, bag or stack.
// moq: the smallest quantity you sell. popular: true puts it on the home page.
const PRODUCTS = [
  sampleProduct(1, "a", "box", true, "ขายดี", "Best seller"),
  sampleProduct(2, "b", "drum", true),
  sampleProduct(3, "c", "bag", true),
  sampleProduct(4, "d", "stack", true),
  sampleProduct(5, "a", "box", false),
  sampleProduct(6, "b", "drum", false),
  sampleProduct(7, "c", "bag", false),
  sampleProduct(8, "d", "stack", false)
];

// Makes the sample products. Replace PRODUCTS with real blocks like this one:
// { id: "p1", code: "TC-001", category: "a", art: "box", images: [], popular: true, moq: 50,
//   unit: { th: "ชิ้น", en: "pcs" }, badge: null,
//   name: { th: "ชื่อสินค้า", en: "Product name" }, size: { th: "...", en: "..." },
//   description: { th: "...", en: "..." },
//   specs: [{ value: "...", label: { th: "...", en: "..." } }] }
// code is optional. specs can have any number of rows, and a value can be plain
// text or have two languages: { th: "ไม้", en: "Wood" }.
function sampleProduct(n, category, art, popular, badgeTh, badgeEn) {
  return {
    id: "p" + n,
    category,
    art,
    images: [],
    popular,
    moq: 50,
    unit: { th: "ชิ้น", en: "pcs" },
    badge: badgeTh ? { th: badgeTh, en: badgeEn } : null,
    name: { th: "สินค้าตัวอย่าง " + n, en: "Sample product " + n },
    size: { th: "ขนาดตัวอย่าง", en: "Sample size" },
    description: {
      th: "ใส่รายละเอียดสินค้าตรงนี้: ทำจากอะไร ใช้ทำอะไร และเหมาะกับลูกค้าแบบไหน",
      en: "Describe the product here: what it is made of, what it is for, and who it suits."
    },
    specs: [
      { value: "30 × 20 cm", label: { th: "ขนาด", en: "Size" } },
      { value: "1.5 kg", label: { th: "น้ำหนัก", en: "Weight" } },
      { value: "12", label: { th: "ชิ้นต่อลัง", en: "Per carton" } }
    ]
  };
}
