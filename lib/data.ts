// RAAT — catalogue data. Placeholder curated photography (Unsplash), swap for real product
// shots later. Every id below was verified live (HTTP 200) before use.

const PHOTO_IDS = [
  "1610030469983-98e550d6193c",
  "1583743814966-8936f5b7be1a",
  "1622470953794-aa9c70b0fb9d",
  "1595777457583-95e059d581b8",
  "1602810318383-e386cc2a3ccf",
  "1617331140180-e8262094733a",
  "1591369822096-ffd140ec948f",
  "1566174053879-31528523f8ae",
  "1490481651871-ab68de25d43d",
  "1445205170230-053b83016050",
  "1483985988355-763728e1935b",
  "1544022613-e87ca75a784a",
  "1515372039744-b8f02a3ae446",
  "1552374196-c4e7ffc6e126",
  "1441986300917-64674bd600d8",
  "1487222477894-8943e31ef7b2",
  "1509631179647-0177331693ae",
  "1524504388940-b1c1722653e1",
  "1550928431-ee0ec6db30d3",
  "1516762689617-e1cffcef479d",
  "1519741497674-611481863552",
  "1601925260368-ae2f83cf8b7f",
  "1614251056216-f748f76cd228",
  "1620799140408-edc6dcb6d633",
  "1519415943484-9fa1873496d4",
  "1571908599407-cdb918ed83bf",
  "1583292650898-7d22cd27ca6f",
  "1550639525-c97d455acf70",
  "1441984904996-e0b6ba687e04",
  "1503342217505-b0a15ec3261c",
  "1546456073-92b9f0a8d413",
] as const;

export function img(index: number, w = 900, h = 1125): string {
  const id = PHOTO_IDS[index % PHOTO_IDS.length];
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`;
}

export const HERO_IMAGE = img(0, 1800, 1200);
export const EDITORIAL_IMAGE = img(1, 1800, 1200);
export const STORY_IMAGE = img(2, 1000, 1250);
export const FOUNDER_IMAGE = img(3, 1000, 1250);
export const ARTISAN_IMAGE = img(4, 1000, 1250);

export type Collection = {
  slug: string;
  name: string;
  blurb: string;
  description: string;
  image: string;
};

export const COLLECTIONS: Collection[] = [
  {
    slug: "amavas",
    name: "Amavas",
    blurb: "Clean silhouettes in soft charcoal.",
    description:
      "Clean, easy silhouettes in soft charcoal and ivory, each finished with a single hand-worked gold detail.",
    image: img(5, 1200, 1500),
  },
  {
    slug: "neel",
    name: "Neel",
    blurb: "Hand-dyed indigo, light and breathable.",
    description:
      "Hand-dyed indigo in breathable cottons — pieces dyed in slow, layered baths of natural indigo.",
    image: img(6, 1200, 1500),
  },
  {
    slug: "zari",
    name: "Zari",
    blurb: "Hand-embroidered gold thread work.",
    description:
      "Celebration pieces with hand-embroidered zari work from our Varanasi artisan partners.",
    image: img(7, 1200, 1500),
  },
  {
    slug: "sanjh",
    name: "Sanjh",
    blurb: "Warm rust and plum for every day.",
    description:
      "Warm rust and plum tones in relaxed, everyday shapes you can wear from morning to evening.",
    image: img(8, 1200, 1500),
  },
];

export const CATEGORIES = [
  "Sarees",
  "Kurtas",
  "Lehengas",
  "Jackets",
  "Blouses",
  "Accessories",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_IMAGES: Record<Category, string> = {
  Sarees: img(9, 640, 400),
  Kurtas: img(10, 640, 400),
  Lehengas: img(11, 640, 400),
  Jackets: img(12, 640, 400),
  Blouses: img(13, 640, 400),
  Accessories: img(14, 640, 400),
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  collection: string; // collection slug
  category: Category;
  price: number;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  tag?: "new" | "trending";
};

const SIZES = ["XS", "S", "M", "L", "XL"];

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const RAW_PRODUCTS: Array<
  Omit<Product, "id" | "slug" | "images" | "sizes"> & { imgIndex: number; imgIndexAlt: number }
> = [
  // Amavas
  { name: "Amavas Wrap Kurta", collection: "amavas", category: "Kurtas", price: 6800, colors: ["Charcoal", "Ivory"], tag: "new", description: "A hand-dyed wrap kurta in brushed cotton, cut for movement with a soft asymmetric hem.", imgIndex: 0, imgIndexAlt: 15 },
  { name: "Amavas Draped Skirt", collection: "amavas", category: "Accessories", price: 7200, colors: ["Charcoal"], description: "A floor-length draped skirt in matte crepe, weighted at the hem for a fluid fall.", imgIndex: 16, imgIndexAlt: 17 },
  { name: "Amavas Charcoal Blouse", collection: "amavas", category: "Blouses", price: 5600, colors: ["Charcoal", "Black"], description: "A fitted charcoal blouse with a low back and covered buttons, cut close to the body.", imgIndex: 18, imgIndexAlt: 19 },
  { name: "Amavas Silk Saree", collection: "amavas", category: "Sarees", price: 12400, colors: ["Charcoal", "Black"], tag: "trending", description: "A pure silk saree in the deepest charcoal, with a single hand-finished gold border.", imgIndex: 20, imgIndexAlt: 21 },
  { name: "Amavas Tailored Jacket", collection: "amavas", category: "Jackets", price: 10800, colors: ["Charcoal"], description: "An unlined tailored jacket in heavy cotton twill, cut for layering over kurtas or blouses.", imgIndex: 22, imgIndexAlt: 23 },
  { name: "Amavas Pleated Trouser", collection: "amavas", category: "Accessories", price: 6400, colors: ["Charcoal", "Black"], description: "High-waisted, wide-leg trousers with front pleats and a self-fabric belt.", imgIndex: 24, imgIndexAlt: 25 },
  { name: "Amavas Sheer Dupatta", collection: "amavas", category: "Accessories", price: 3800, colors: ["Charcoal"], description: "A sheer silk-blend dupatta, hand-finished at the edge, made to layer over any silhouette.", imgIndex: 26, imgIndexAlt: 27 },
  { name: "Amavas Wrap Dress", collection: "amavas", category: "Accessories", price: 8200, colors: ["Charcoal", "Black"], tag: "new", description: "A bias-cut wrap dress in washed charcoal crepe, with a low back and self-tie waist.", imgIndex: 28, imgIndexAlt: 29 },

  // Neel
  { name: "Neel Midnight Saree", collection: "neel", category: "Sarees", price: 8400, colors: ["Indigo"], tag: "trending", description: "A hand-dip-dyed indigo saree in soft mulmul cotton, deepening in tone toward the border.", imgIndex: 1, imgIndexAlt: 2 },
  { name: "Neel Indigo Dupatta", collection: "neel", category: "Accessories", price: 3400, colors: ["Indigo"], description: "A pure cotton dupatta in layered indigo dye, finished with a hand-rolled edge.", imgIndex: 3, imgIndexAlt: 4 },
  { name: "Neel Zari Lehenga", collection: "neel", category: "Lehengas", price: 15800, colors: ["Indigo", "Charcoal"], tag: "new", description: "A midnight-indigo lehenga with hand-embroidered zari detail at the hem.", imgIndex: 5, imgIndexAlt: 6 },
  { name: "Neel Tailored Blazer", collection: "neel", category: "Jackets", price: 11200, colors: ["Indigo"], description: "A structured single-breasted blazer in indigo wool-cotton blend.", imgIndex: 7, imgIndexAlt: 8 },
  { name: "Neel Silk Blouse", collection: "neel", category: "Blouses", price: 5200, colors: ["Indigo", "Ivory"], description: "A silk blouse in soft indigo wash, tailored close through the body.", imgIndex: 9, imgIndexAlt: 10 },
  { name: "Neel Draped Gown", collection: "neel", category: "Accessories", price: 13600, colors: ["Indigo"], description: "A floor-length draped gown in indigo silk-crepe, with a fluid cowl neckline.", imgIndex: 11, imgIndexAlt: 12 },

  // Zari
  { name: "Zari Thread Blouse", collection: "zari", category: "Blouses", price: 11200, colors: ["Maroon", "Charcoal", "Gold"], tag: "trending", description: "A sleeveless hand-embroidered blouse in zari thread, tailored close through the body.", imgIndex: 13, imgIndexAlt: 14 },
  { name: "Zari Bordered Saree", collection: "zari", category: "Sarees", price: 13600, colors: ["Maroon", "Gold"], tag: "trending", description: "A handloom saree with a contrast zari-woven border, in breathable silk-cotton.", imgIndex: 15, imgIndexAlt: 16 },
  { name: "Zari Embellished Lehenga", collection: "zari", category: "Lehengas", price: 18800, colors: ["Maroon", "Gold"], tag: "new", description: "A fully hand-embellished lehenga with all-over zari embroidery, built for evening.", imgIndex: 17, imgIndexAlt: 18 },
  { name: "Zari Wrap Kurta", collection: "zari", category: "Kurtas", price: 7600, colors: ["Gold", "Maroon"], description: "A wrap kurta finished with a hand-embroidered zari placket.", imgIndex: 19, imgIndexAlt: 20 },
  { name: "Zari Trim Dupatta", collection: "zari", category: "Accessories", price: 4200, colors: ["Gold"], description: "A silk dupatta with a hand-finished zari trim along both edges.", imgIndex: 21, imgIndexAlt: 22 },
  { name: "Zari Evening Jacket", collection: "zari", category: "Jackets", price: 12800, colors: ["Maroon", "Gold"], description: "A cropped evening jacket with zari embroidery at the cuff and collar.", imgIndex: 23, imgIndexAlt: 24 },

  // Sanjh
  { name: "Sanjh Dusk Jacket", collection: "sanjh", category: "Jackets", price: 9600, colors: ["Rust", "Plum"], description: "A relaxed jacket in a rust-toned slub cotton, four patch pockets, horn buttons.", imgIndex: 25, imgIndexAlt: 26 },
  { name: "Sanjh Twilight Kurta", collection: "sanjh", category: "Kurtas", price: 6200, colors: ["Plum", "Rust"], tag: "new", description: "A straight-cut kurta in tonal dusk-wash cotton, with a hidden placket and side slits.", imgIndex: 27, imgIndexAlt: 28 },
  { name: "Sanjh Draped Saree", collection: "sanjh", category: "Sarees", price: 9800, colors: ["Rust"], description: "A pre-draped saree in warm rust silk-cotton, ready to wear in minutes.", imgIndex: 29, imgIndexAlt: 30 },
  { name: "Sanjh Pleated Skirt", collection: "sanjh", category: "Accessories", price: 6800, colors: ["Plum", "Rust"], description: "A pleated midi skirt in warm plum crepe, elasticated at the back waist.", imgIndex: 30, imgIndexAlt: 0 },
  { name: "Sanjh Silk Scarf", collection: "sanjh", category: "Accessories", price: 2800, colors: ["Rust", "Gold"], description: "A square silk scarf, hand-rolled edge, in a dusk-toned ombré.", imgIndex: 2, imgIndexAlt: 4 },
  { name: "Sanjh Tailored Trouser", collection: "sanjh", category: "Accessories", price: 5800, colors: ["Plum"], tag: "trending", description: "Straight-leg trousers in garment-dyed cotton twill, mid-rise, tapered fit.", imgIndex: 6, imgIndexAlt: 8 },
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => {
  const slug = slugify(p.name);
  return {
    ...p,
    id: slug,
    slug,
    sizes: SIZES,
    images: [img(p.imgIndex), img(p.imgIndexAlt), img(p.imgIndex + 7), img(p.imgIndexAlt + 11)],
  };
});

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCollection(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug);
}

/** Same collection or category first, then backfilled from the rest of the catalogue. */
export function getRelatedProducts(product: Product, count = 10) {
  const others = PRODUCTS.filter((p) => p.id !== product.id);
  const close = others.filter(
    (p) => p.collection === product.collection || p.category === product.category
  );
  const rest = others.filter((p) => !close.includes(p));
  return [...close, ...rest].slice(0, count);
}

export function formatPrice(value: number) {
  return "₹" + value.toLocaleString("en-IN");
}

export type Testimonial = { quote: string; author: string };

export const TESTIMONIALS: Testimonial[] = [
  { quote: "RAAT proves Indian craft can feel light, modern and effortless.", author: "Vogue India" },
  { quote: "The zari work is unlike anything else on the market.", author: "Elle" },
  { quote: "Finally, ethnic wear that photographs like editorial, not ecommerce.", author: "Harper's Bazaar" },
];

export type JournalEntry = {
  slug: string;
  category: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  body: string[];
};

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    slug: "how-to-wear-zari-after-dark",
    category: "Styling",
    title: "How to Wear Zari After Dark",
    date: "Jul 28, 2026",
    image: img(13, 1600, 900),
    excerpt: "Zari thread was made for candlelight, not daylight.",
    body: [
      "Zari thread was made for candlelight, not daylight. There is a particular way the metallic weave catches a single low source of light and throws it back in fragments — something that gets lost entirely under the flat white of a studio softbox.",
      "Our approach starts with restraint: one statement piece, paired with fabrics that absorb rather than compete for light — a matte silk, a raw cotton, something with texture but no shine of its own. Then we build the rest of the look around whatever the zari catches.",
      "The result is an outfit that changes character across an evening — subdued at golden hour, fully alive by the time the candles are lit.",
    ],
  },
  {
    slug: "inside-a-varanasi-weaving-house",
    category: "Artisans",
    title: "Inside a Varanasi Weaving House",
    date: "Jul 14, 2026",
    image: img(4, 1600, 900),
    excerpt: "A morning with the family looms that make our zari work possible.",
    body: [
      "The loom room starts work before sunrise, when the light is even and the humidity hasn't yet tightened the silk threads. Three generations work the same floor — grandfather setting the pattern, son at the shuttle, grandson learning to read the draft.",
      "It takes roughly nine days to complete a single saree length at this level of zari density. We place orders in seasons, not units, so the workshop can plan its year around the craft rather than around us.",
    ],
  },
  {
    slug: "building-the-amavas-collection",
    category: "Studio",
    title: "Building the Amavas Collection",
    date: "Jun 30, 2026",
    image: img(20, 1600, 900),
    excerpt: "Notes from the studio on our first collection, built around the new moon.",
    body: [
      "Amavas started as a mood board of a single color: the almost-black you only really see once your eyes adjust to a moonless night. Every fabric swatch that didn't hold that particular depth got cut.",
      "The challenge with a collection this dark is proving it isn't flat — so we leaned hard on texture: raw slubs, matte crepe, one hand-finished gold border per piece as the only point of light.",
    ],
  },
  {
    slug: "layering-for-festive-season",
    category: "Styling",
    title: "Layering for Festive Season",
    date: "Jun 12, 2026",
    image: img(17, 1600, 900),
    excerpt: "Building an evening look in three considered layers.",
    body: [
      "Festive dressing doesn't need to mean more of everything. Our rule: one textured base layer, one structured mid-layer, one piece of jewelry that actually earns its place.",
      "Start with a fitted blouse in a fabric with real hand-feel, add a draped or pleated outer piece that moves when you do, and stop there.",
    ],
  },
  {
    slug: "the-language-of-zari-thread",
    category: "Craft",
    title: "The Language of Zari Thread",
    date: "May 22, 2026",
    image: img(19, 1600, 900),
    excerpt: "A short primer on the metallic embroidery technique behind our Zari collection.",
    body: [
      "Zari is made by wrapping a flattened metallic strip — traditionally real gold or silver, today often a metallised polyester — around a core silk or cotton thread. The result is a thread with genuine weight and dimension, not a printed shimmer.",
      "Every Zari-collection piece we make uses artisan-embroidered zari, not machine work, which is the difference you feel in the drape as much as see in the light.",
    ],
  },
  {
    slug: "behind-the-sanjh-shoot",
    category: "Studio",
    title: "Behind the Sanjh Shoot",
    date: "May 3, 2026",
    image: img(25, 1600, 900),
    excerpt: "Chasing the exact ten minutes of dusk light this collection is named for.",
    body: [
      "Sanjh means dusk — the specific, narrow window where the sky still holds warmth but the streetlights have started to come on. We shot for four evenings to get twelve usable minutes of that exact light.",
      "Everything about the collection's rust and plum palette was chosen to hold its own in that light rather than wash out under it.",
    ],
  },
];

export function getJournalEntry(slug: string) {
  return JOURNAL_ENTRIES.find((e) => e.slug === slug);
}

// Demo account data -- static, no auth/backend behind this portfolio build.
export type OrderStatus = "Shipped" | "Delivered" | "Processing";

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: { product: Product; qty: number }[];
};

export const CUSTOMER_NAME = "Ananya";

export const MOCK_ORDERS: Order[] = [
  {
    id: "RA-20486",
    date: "Jul 28, 2026",
    status: "Shipped",
    total: 19600,
    items: [
      { product: PRODUCTS[16], qty: 1 }, // Zari Thread Blouse
      { product: PRODUCTS[8], qty: 1 }, // Neel Midnight Saree
    ],
  },
  {
    id: "RA-20311",
    date: "Jun 14, 2026",
    status: "Delivered",
    total: 6800,
    items: [{ product: PRODUCTS[0], qty: 1 }], // Amavas Wrap Kurta
  },
  {
    id: "RA-19984",
    date: "Apr 2, 2026",
    status: "Delivered",
    total: 24200,
    items: [
      { product: PRODUCTS[3], qty: 1 }, // Amavas Silk Saree
      { product: PRODUCTS[9], qty: 1 }, // Neel Indigo Dupatta
      { product: PRODUCTS[20], qty: 1 }, // Sanjh Dusk Jacket
    ],
  },
];

export type Address = {
  label: string;
  name: string;
  lines: string[];
  isDefault?: boolean;
};

export const MOCK_ADDRESSES: Address[] = [
  {
    label: "Home",
    name: "Ananya Rao",
    lines: ["14 Malabar Hill Road", "Mumbai, Maharashtra 400006", "India"],
    isDefault: true,
  },
  {
    label: "Studio",
    name: "Ananya Rao",
    lines: ["B-42 Bapu Bazaar Road", "Jaipur, Rajasthan 302001", "India"],
  },
];

export const MOCK_ACCOUNT = {
  name: "Ananya Rao",
  email: "ananya.rao@example.com",
  phone: "+91 98765 43210",
};

/** Swatch colours for the named product colours above. */
export const COLOR_HEX: Record<string, string> = {
  Charcoal: "#3d3b39",
  Ivory: "#f1ebdd",
  Black: "#151515",
  Indigo: "#34467a",
  Maroon: "#7a2a3a",
  Gold: "#c9a253",
  Rust: "#a8552f",
  Plum: "#6a3a5c",
};
