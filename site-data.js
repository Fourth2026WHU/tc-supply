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
    legalName: { th: "", en: "" },
    registration: "",
    address: { th: "", en: "" },
    hours: { th: "", en: "" },
    mapUrl: ""
  },

  // Requests are saved in the factory's stock app, so they show up there as orders.
  // The key is the publishable one, made to be public. Never put a secret key here.
  orderDatabase: {
    url: "https://oreqkgjcycbhmublooxu.supabase.co",
    key: "sb_publishable_JIb3pGcxffEU65eDdlqmWA_O6GpFTLV"
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

// image: the photo shown for the category on the home page.
// art: the drawing shown instead when there is no image: box, drum, bag or stack.
const CATEGORIES = [
  { id: "notebooks", art: "stack", image: "images/products/tc-n009-1.jpg", name: { th: "สมุด", en: "Notebooks" } },
  { id: "bills", art: "stack", image: "images/products/tc-b001-1.jpg", name: { th: "บิล", en: "Bill books" } },
  { id: "envelopes", art: "bag", image: "images/products/tc-l002-1.jpg", name: { th: "ซองจดหมาย", en: "Envelopes" } }
];

const BOOKS = { th: "เล่ม", en: "books" };
const PIECES = { th: "ใบ", en: "pcs" };
const BEST = { th: "ขายดี", en: "Best seller" };
const ENVELOPE_SIZE_PHOTOS = ["images/products/envelope-size-long.jpg", "images/products/envelope-size-wide.jpg"];

// To add a product, copy one line and change it.
// photos: how many photos it has in images/products, named tc-n001-1.jpg, tc-n001-2.jpg and so on.
// moq: the smallest quantity you sell. popular: true puts it on the home page.
// type and packing are optional. Leave a product's English blank ("") and the Thai shows instead.
const PRODUCTS = [
  item({ code: "TC-N001", category: "notebooks", photos: 1, moq: 12, unit: BOOKS, size: "160 × 235 mm", name: { th: "สมุดปกมัน 10บ.", en: "Glossy cover notebook, 10 baht" }, packing: { th: "12 เล่ม/แพ็ค · 40 โหล/ห่อ", en: "12 per pack · 40 dozen per bundle" } }),
  item({ code: "TC-N002", category: "notebooks", photos: 1, moq: 24, unit: BOOKS, size: "160 × 235 mm", name: { th: "สมุดปกมัน 5บ.", en: "Glossy cover notebook, 5 baht" }, packing: { th: "24 เล่ม/แพ็ค · 5 กุรุส/ห่อ", en: "24 per pack · 5 gross per bundle" } }),
  item({ code: "TC-N003", category: "notebooks", photos: 2, moq: 25, unit: BOOKS, size: "120 × 190 mm", name: { th: "สมุดฉีกไม่มีเส้น เล่มใหญ่ 20บ.", en: "Large plain tear-off notebook, 20 baht" }, type: { th: "หนากลาง", en: "Medium thickness" }, packing: { th: "25 เล่ม/แพ็ค · 400 เล่ม/ห่อ", en: "25 per pack · 400 per bundle" } }),
  item({ code: "TC-N004", category: "notebooks", photos: 1, moq: 25, unit: BOOKS, size: "120 × 190 mm", name: { th: "สมุดฉีกไม่มีเส้น เล่มใหญ่ 12บ.", en: "Large plain tear-off notebook, 12 baht" }, type: { th: "บาง", en: "Thin" }, packing: { th: "25 เล่ม/แพ็ค · 400 เล่ม/ห่อ", en: "25 per pack · 400 per bundle" } }),
  item({ code: "TC-N005", category: "notebooks", photos: 2, moq: 20, unit: BOOKS, size: "90 × 125 mm", name: { th: "สมุดฉีกไม่มีเส้น เล่มเล็ก 20บ.", en: "Small plain tear-off notebook, 20 baht" }, type: { th: "หนา 100 แผ่น", en: "Thick, 100 sheets" }, packing: { th: "20 เล่ม/แพ็ค · 640 เล่ม/ห่อ", en: "20 per pack · 640 per bundle" } }),
  item({ code: "TC-N006", category: "notebooks", photos: 2, moq: 25, unit: BOOKS, size: "90 × 125 mm", name: { th: "สมุดฉีกไม่มีเส้น เล่มเล็ก 15บ.", en: "Small plain tear-off notebook, 15 baht" }, type: { th: "หนากลาง", en: "Medium thickness" }, packing: { th: "25 เล่ม/แพ็ค · 800 เล่ม/ห่อ", en: "25 per pack · 800 per bundle" } }),
  item({ code: "TC-N007", category: "notebooks", photos: 2, moq: 20, unit: BOOKS, size: "120 × 190 mm", name: { th: "สมุดฉีกไม่มีเส้น 30บ.", en: "Plain tear-off notebook, 30 baht" }, type: { th: "หนา 100 แผ่น", en: "Thick, 100 sheets" }, packing: { th: "20 เล่ม/แพ็ค · 320 เล่ม/ห่อ", en: "20 per pack · 320 per bundle" } }),
  item({ code: "TC-N008", category: "notebooks", photos: 1, moq: 25, unit: BOOKS, size: "90 × 125 mm", name: { th: "สมุดฉีกไม่มีเส้น เล่มเล็ก 10บ.", en: "Small plain tear-off notebook, 10 baht" }, type: { th: "บาง", en: "Thin" }, packing: { th: "25 เล่ม/แพ็ค · 1,000 เล่ม/ห่อ", en: "25 per pack · 1,000 per bundle" } }),
  item({ code: "TC-N009", category: "notebooks", photos: 2, moq: 20, unit: BOOKS, size: "90 × 135 mm", popular: true, name: { th: "สมุดฉีกมีเส้น เล่มเล็ก 20บ.", en: "Small lined tear-off notebook, 20 baht" }, type: { th: "เล่มเล็ก หนา", en: "Small, thick" }, packing: { th: "20 เล่ม/แพ็ค · 640 เล่ม/ห่อ", en: "20 per pack · 640 per bundle" } }),
  item({ code: "TC-N010", category: "notebooks", photos: 2, moq: 20, unit: BOOKS, size: "90 × 135 mm", popular: true, name: { th: "สมุดฉีกมีเส้น เล่มเล็ก 12บ.", en: "Small lined tear-off notebook, 12 baht" }, type: { th: "เล่มเล็ก หนากลาง", en: "Small, medium thickness" }, packing: { th: "10 หรือ 20 เล่ม/แพ็ค · 500 หรือ 800 เล่ม/ห่อ", en: "10 or 20 per pack · 500 or 800 per bundle" } }),
  item({ code: "TC-N011", category: "notebooks", photos: 2, moq: 20, unit: BOOKS, size: "90 × 135 mm", name: { th: "สมุดฉีกมีเส้น เล่มเล็ก 8บ.", en: "Small lined tear-off notebook, 8 baht" }, type: { th: "เล่มเล็ก บาง", en: "Small, thin" }, packing: { th: "20 เล่ม/แพ็ค · 1,000 เล่ม/ห่อ", en: "20 per pack · 1,000 per bundle" } }),
  item({ code: "TC-N012", category: "notebooks", photos: 3, moq: 20, unit: BOOKS, size: "135 × 190 mm", popular: true, name: { th: "สมุดฉีกมีเส้น 30บ.", en: "Lined tear-off notebook, 30 baht" }, type: { th: "หนา 100 แผ่น", en: "Thick, 100 sheets" }, packing: { th: "20 เล่ม/แพ็ค · 320 เล่ม/ห่อ", en: "20 per pack · 320 per bundle" } }),
  item({ code: "TC-N013", category: "notebooks", photos: 2, moq: 20, unit: BOOKS, size: "135 × 190 mm", popular: true, name: { th: "สมุดฉีกมีเส้น 20บ.", en: "Lined tear-off notebook, 20 baht" }, type: { th: "เล่มใหญ่ หนากลาง", en: "Large, medium thickness" }, packing: { th: "10 หรือ 20 เล่ม/แพ็ค · 200 หรือ 400 เล่ม/ห่อ", en: "10 or 20 per pack · 200 or 400 per bundle" } }),
  item({ code: "TC-N014", category: "notebooks", photos: 2, moq: 20, unit: BOOKS, size: "135 × 190 mm", name: { th: "สมุดฉีกมีเส้น 14บ.", en: "Lined tear-off notebook, 14 baht" }, type: { th: "เล่มใหญ่ บาง", en: "Large, thin" }, packing: { th: "20 เล่ม/แพ็ค · 400 เล่ม/ห่อ", en: "20 per pack · 400 per bundle" } }),
  item({ code: "TC-N015", category: "notebooks", photos: 1, moq: 40, unit: BOOKS, size: "57 × 112 mm", name: { th: "สมุดฉีกจิ๋ว เบอร์ 5 คาร์บอนในตัว", en: "Mini tear-off pad No. 5, carbonless" }, packing: { th: "40 เล่ม/แพ็ค · 1,600 เล่ม/ห่อ", en: "40 per pack · 1,600 per bundle" } }),
  item({ code: "TC-N016", category: "notebooks", photos: 1, moq: 24, unit: BOOKS, size: "26 × 37 cm", name: { th: "สมุดวาดเขียนใหญ่ 14บ.", en: "Large drawing book, 14 baht" }, packing: { th: "24 เล่ม/แพ็ค · 2 กุรุส/ห่อ", en: "24 per pack · 2 gross per bundle" } }),
  item({ code: "TC-N017", category: "notebooks", photos: 1, moq: 24, unit: BOOKS, size: "26 × 18.5 cm", name: { th: "สมุดวาดเขียนเล็ก 7บ.", en: "Small drawing book, 7 baht" }, packing: { th: "24 เล่ม/แพ็ค · 5 กุรุส/ห่อ", en: "24 per pack · 5 gross per bundle" } }),

  item({ code: "TC-B001", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "18 × 26 cm", name: { th: "ใบส่งของ เบอร์ A (3 ใบ)", en: "Delivery note book No. A, 3 copies" }, packing: { th: "240 เล่ม/ห่อ", en: "240 per bundle" } }),
  item({ code: "TC-B002", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "9.5 × 13.5 cm", name: { th: "ใบส่งของ เบอร์ 3 สั้น (3 ใบ)", en: "Delivery note book No. 3 short, 3 copies" }, packing: { th: "640 เล่ม/ห่อ", en: "640 per bundle" } }),
  item({ code: "TC-B003", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "9.7 × 17.8 cm", name: { th: "ใบส่งของ เบอร์ 3 ยาว (3 ใบ)", en: "Delivery note book No. 3 long, 3 copies" }, packing: { th: "480 เล่ม/ห่อ", en: "480 per bundle" } }),
  item({ code: "TC-B004", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "13.5 × 19.5 cm", name: { th: "ใบส่งของ เบอร์ 2 (3 ใบ)", en: "Delivery note book No. 2, 3 copies" }, packing: { th: "320 เล่ม/ห่อ", en: "320 per bundle" } }),
  item({ code: "TC-B005", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "13.5 × 19.5 cm", name: { th: "ใบส่งของ เบอร์ 2 (2 ใบ)", en: "Delivery note book No. 2, 2 copies" }, packing: { th: "400 เล่ม/ห่อ", en: "400 per bundle" } }),
  item({ code: "TC-B006", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "15 × 22 cm", name: { th: "ใบส่งของ เบอร์ 1 (3 ใบ)", en: "Delivery note book No. 1, 3 copies" }, packing: { th: "320 เล่ม/ห่อ", en: "320 per bundle" } }),
  item({ code: "TC-B007", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "15 × 22 cm", name: { th: "ใบส่งของ เบอร์ 1 (2 ใบ)", en: "Delivery note book No. 1, 2 copies" }, packing: { th: "400 เล่ม/ห่อ", en: "400 per bundle" } }),
  item({ code: "TC-C001", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "13.5 × 19.5 cm", name: { th: "ใบส่งของคาร์บอน เบอร์ 2 (3 ใบ)", en: "Carbonless delivery note book No. 2, 3 copies" }, packing: { th: "320 หรือ 400 เล่ม/ห่อ", en: "320 or 400 per bundle" } }),
  item({ code: "TC-C002", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "13.5 × 19.5 cm", name: { th: "ใบส่งของคาร์บอน เบอร์ 2 (2 ใบ)", en: "Carbonless delivery note book No. 2, 2 copies" }, packing: { th: "4,000 เล่ม, 500 เล่ม/ห่อ", en: "4,000 or 500 per bundle" } }),
  item({ code: "TC-C003", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "15 × 22 cm", name: { th: "ใบส่งของคาร์บอน เบอร์ 1 (3 ใบ)", en: "Carbonless delivery note book No. 1, 3 copies" }, packing: { th: "320 เล่ม/ห่อ", en: "320 per bundle" } }),
  item({ code: "TC-C004", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "15 × 22 cm", name: { th: "ใบส่งของคาร์บอน เบอร์ 1 (2 ใบ)", en: "Carbonless delivery note book No. 1, 2 copies" }, packing: { th: "400 เล่ม/ห่อ", en: "400 per bundle" } }),
  item({ code: "TC-B008", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "18 × 26 cm", name: { th: "บิลเงินสด เบอร์ A", en: "Cash bill book No. A" }, packing: { th: "300 เล่ม/ห่อ", en: "300 per bundle" } }),
  item({ code: "TC-B009", category: "bills", photos: 2, moq: 10, unit: BOOKS, size: "9.5 × 13.5 cm", name: { th: "บิลเงินสด เบอร์ 3 สั้น", en: "Cash bill book No. 3 short" }, packing: { th: "800 เล่ม/ห่อ", en: "800 per bundle" } }),
  item({ code: "TC-B010", category: "bills", photos: 2, moq: 10, unit: BOOKS, size: "9.7 × 17.8 cm", name: { th: "บิลเงินสด เบอร์ 3 ยาว", en: "Cash bill book No. 3 long" }, packing: { th: "600 เล่ม/ห่อ", en: "600 per bundle" } }),
  item({ code: "TC-B011", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "13.5 × 19.5 cm", name: { th: "บิลเงินสด เบอร์ 2", en: "Cash bill book No. 2" }, packing: { th: "4,000 เล่ม, 500 เล่ม/ห่อ", en: "4,000 or 500 per bundle" } }),
  item({ code: "TC-B012", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "15 × 22 cm", name: { th: "บิลเงินสด เบอร์ 1", en: "Cash bill book No. 1" }, packing: { th: "400 เล่ม/ห่อ", en: "400 per bundle" } }),
  item({ code: "TC-C005", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "11 × 15 cm", name: { th: "บิลเงินสดคาร์บอน เบอร์ 3", en: "Carbonless cash bill book No. 3" }, packing: { th: "800 เล่ม/ห่อ", en: "800 per bundle" } }),
  item({ code: "TC-C006", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "13.5 × 19.5 cm", name: { th: "บิลเงินสดคาร์บอน เบอร์ 2", en: "Carbonless cash bill book No. 2" }, packing: { th: "4,000 เล่ม, 500 เล่ม/ห่อ", en: "4,000 or 500 per bundle" } }),
  item({ code: "TC-C007", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "15 × 22 cm", name: { th: "บิลเงินสดคาร์บอน เบอร์ 1 (2 ใบ)", en: "Carbonless cash bill book No. 1, 2 copies" }, packing: { th: "400 เล่ม/ห่อ", en: "400 per bundle" } }),
  item({ code: "TC-C008", category: "bills", photos: 1, moq: 10, unit: BOOKS, size: "15 × 22 cm", name: { th: "บิลเงินสดคาร์บอน เบอร์ 1 (3 ใบ)", en: "Carbonless cash bill book No. 1, 3 copies" }, packing: { th: "320 เล่ม/ห่อ", en: "320 per bundle" } }),

  item({ code: "TC-L001", category: "envelopes", photos: 2, moq: 500, unit: PIECES, size: "16.5 × 9.2 cm", name: { th: "ซองจดหมายสีชมพู ผนึกน้ำ", en: "Pink envelope, gummed seal" }, packing: { th: "25 ใบ/แพ็ค · 500 ใบ/กล่อง · 5,000 ใบ/ลัง", en: "25 per pack · 500 per box · 5,000 per carton" } }),
  item({ code: "TC-L002", category: "envelopes", photos: 2, moq: 500, unit: PIECES, size: "16.5 × 9.2 cm", extra: ENVELOPE_SIZE_PHOTOS, name: { th: "ซองจดหมายลายดอกไม้ ผนึกแห้ง", en: "Floral envelope, self-seal" }, packing: { th: "25 ใบ/แพ็ค · 500 ใบ/กล่อง · 5,000 ใบ/ลัง", en: "25 per pack · 500 per box · 5,000 per carton" } }),
  item({ code: "TC-L003", category: "envelopes", photos: 2, moq: 500, unit: PIECES, size: "16.5 × 9.2 cm", extra: ENVELOPE_SIZE_PHOTOS, name: { th: "ซองจดหมายธงชาติ ผนึกแห้ง", en: "Thai flag envelope, self-seal" }, packing: { th: "25 ใบ/แพ็ค · 500 ใบ/กล่อง · 5,000 ใบ/ลัง", en: "25 per pack · 500 per box · 5,000 per carton" } }),
  item({ code: "TC-L004", category: "envelopes", photos: 2, moq: 500, unit: PIECES, size: "16.5 × 9.2 cm", extra: ENVELOPE_SIZE_PHOTOS, name: { th: "ซองจดหมายเครื่องบิน ผนึกแห้ง", en: "Airmail envelope, self-seal" }, packing: { th: "25 ใบ/แพ็ค · 500 ใบ/กล่อง · 5,000 ใบ/ลัง", en: "25 per pack · 500 per box · 5,000 per carton" } }),
  item({ code: "TC-L005", category: "envelopes", photos: 2, moq: 500, unit: PIECES, size: "16.5 × 9.2 cm", extra: ENVELOPE_SIZE_PHOTOS, name: { th: "ซองจดหมายขาวสั้น ผนึกแห้ง", en: "Short white envelope, self-seal" }, packing: { th: "25 ใบ/แพ็ค · 500 ใบ/กล่อง · 5,000 ใบ/ลัง", en: "25 per pack · 500 per box · 5,000 per carton" } }),
  item({ code: "TC-L006", category: "envelopes", photos: 2, moq: 500, unit: PIECES, size: "16.5 × 10.6 cm", name: { th: "ซองจดหมายขาว 9/125 ผนึกน้ำ ถุงแก้ว", en: "White envelope 9/125, gummed seal, in clear bag" }, packing: { th: "50 ใบ/แพ็ค · 500 ใบ/กล่อง · 10,000 ใบ/ลัง", en: "50 per pack · 500 per box · 10,000 per carton" } }),
  item({ code: "TC-L007", category: "envelopes", photos: 1, moq: 500, unit: PIECES, size: "23.4 × 10.6 cm", name: { th: "ซองจดหมายขาว 7/100 ผนึกน้ำ", en: "White envelope 7/100, gummed seal" }, packing: { th: "25 ใบ/แพ็ค · 500 ใบ/กล่อง · 5,000 ใบ/ลัง", en: "25 per pack · 500 per box · 5,000 per carton" } })
];

// Turns one line above into everything the pages need.
function item(p) {
  const id = p.code.toLowerCase();
  const images = [];
  for (let i = 1; i <= p.photos; i++) images.push("images/products/" + id + "-" + i + ".jpg");
  const category = CATEGORIES.find(c => c.id === p.category);
  const specs = [{ value: p.size, label: { th: "ขนาด", en: "Size" } }];
  if (p.type) specs.push({ value: p.type, label: { th: "ความหนา", en: "Thickness" } });
  if (p.packing) specs.push({ value: p.packing, label: { th: "การบรรจุ", en: "Packing" } });
  return {
    id,
    code: p.code,
    category: p.category,
    art: category ? category.art : "box",
    images: images.concat(p.extra || []),
    popular: !!p.popular,
    moq: p.moq,
    unit: p.unit,
    badge: p.popular ? BEST : null,
    name: p.name,
    size: p.size,
    description: p.description || "",
    specs
  };
}
