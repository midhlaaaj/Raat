/* ROOH — product catalogue (placeholder data for portfolio demo) */

const IMG = (id, w = 900, h = 1125) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`;

const PHOTOS = {
  a: "1490481651871-ab68de25d43d",
  b: "1445205170230-053b83016050",
  c: "1483985988355-763728e1935b",
  d: "1544022613-e87ca75a784a",
  e: "1515372039744-b8f02a3ae446",
  f: "1552374196-c4e7ffc6e126",
  g: "1441986300917-64674bd600d8",
  h: "1487222477894-8943e31ef7b2",
  i: "1509631179647-0177331693ae",
  j: "1524504388940-b1c1722653e1",
  k: "1550928431-ee0ec6db30d3",
  l: "1583743814966-8936f5b7be1a",
  m: "1610030469983-98e550d6193c",
  n: "1622470953794-aa9c70b0fb9d",
  o: "1516762689617-e1cffcef479d",
  p: "1566174053879-31528523f8ae",
  q: "1591369822096-ffd140ec948f",
  r: "1617331140180-e8262094733a",
  s: "1595777457583-95e059d581b8",
  t: "1602810318383-e386cc2a3ccf",
};

const COLLECTIONS = [
  { slug: "indigo-hour", name: "Indigo Hour", blurb: "Dusk-dyed silhouettes in deep, wearable blues." },
  { slug: "monsoon-bloom", name: "Monsoon Bloom", blurb: "Hand-block florals for the first rains." },
  { slug: "woven-tales", name: "Woven Tales", blurb: "Heirloom looms reworked for everyday wear." },
  { slug: "terra", name: "Terra", blurb: "Earth-toned staples built to layer and last." },
];

const PRODUCTS = [
  {
    id: "p01", name: "Ochre Panelled Kurta Set", category: "Kurta Sets", collection: "terra",
    price: 8200, tag: "new", colors: ["Ochre", "Ivory"], sizes: ["XS", "S", "M", "L", "XL"],
    images: [IMG(PHOTOS.a), IMG(PHOTOS.b)],
    description: "A hand-panelled kurta and trouser set in brushed cotton, finished with bone buttons and a stand collar. Cut for movement, styled for stillness.",
  },
  {
    id: "p02", name: "Indigo Wrap Kurta", category: "Kurtas", collection: "indigo-hour",
    price: 5400, tag: "trending", colors: ["Indigo"], sizes: ["S", "M", "L", "XL"],
    images: [IMG(PHOTOS.c), IMG(PHOTOS.d)],
    description: "Dip-dyed indigo kurta with an asymmetric wrap front and side ties. Lightweight mulmul for warm evenings.",
  },
  {
    id: "p03", name: "Rust Co-ord Set", category: "Co-ord", collection: "terra",
    price: 7600, tag: "new", colors: ["Rust", "Clay"], sizes: ["XS", "S", "M", "L"],
    images: [IMG(PHOTOS.e), IMG(PHOTOS.f)],
    description: "A relaxed shirt and trouser co-ord in a rust-toned slub cotton. One piece, endless outfits.",
  },
  {
    id: "p04", name: "Bloom Print Shirt", category: "Shirts", collection: "monsoon-bloom",
    price: 4200, tag: "", colors: ["White/Green"], sizes: ["S", "M", "L", "XL"],
    images: [IMG(PHOTOS.g), IMG(PHOTOS.h)],
    description: "A hand-block floral shirt in soft voile, cut with a relaxed boxy fit and rolled cuffs.",
  },
  {
    id: "p05", name: "Sable Midi Dress", category: "Dresses", collection: "indigo-hour",
    price: 9800, tag: "trending", colors: ["Charcoal"], sizes: ["XS", "S", "M", "L"],
    images: [IMG(PHOTOS.i), IMG(PHOTOS.j)],
    description: "A bias-cut midi dress in washed charcoal cotton, with a low back and covered buttons to the waist.",
  },
  {
    id: "p06", name: "Field Utility Jacket", category: "Jacket", collection: "terra",
    price: 11200, tag: "new", colors: ["Olive"], sizes: ["S", "M", "L", "XL"],
    images: [IMG(PHOTOS.k), IMG(PHOTOS.l)],
    description: "An unlined utility jacket in heavy cotton canvas with four patch pockets and horn buttons.",
  },
  {
    id: "p07", name: "Hand-block Dupatta", category: "Dupatta", collection: "monsoon-bloom",
    price: 3200, tag: "", colors: ["Ivory/Rust"], sizes: ["One Size"],
    images: [IMG(PHOTOS.m), IMG(PHOTOS.n)],
    description: "A pure cotton dupatta hand-block printed in a monsoon floral, finished with a hand-rolled edge.",
  },
  {
    id: "p08", name: "Woven Panel Blouse", category: "Blouse", collection: "woven-tales",
    price: 3600, tag: "trending", colors: ["Natural"], sizes: ["XS", "S", "M", "L", "XL"],
    images: [IMG(PHOTOS.o), IMG(PHOTOS.p)],
    description: "A sleeveless woven-panel blouse in undyed cotton, tailored close through the body.",
  },
  {
    id: "p09", name: "Pleated Wide Trousers", category: "Trousers", collection: "terra",
    price: 4800, tag: "", colors: ["Sand", "Charcoal"], sizes: ["XS", "S", "M", "L", "XL"],
    images: [IMG(PHOTOS.q), IMG(PHOTOS.r)],
    description: "High-waisted, wide-leg trousers with front pleats and a self-fabric belt.",
  },
  {
    id: "p10", name: "Sage Layered Kurta Set", category: "Kurta Sets", collection: "woven-tales",
    price: 8600, tag: "", colors: ["Sage"], sizes: ["S", "M", "L", "XL"],
    images: [IMG(PHOTOS.s), IMG(PHOTOS.t)],
    description: "A layered kurta and dhoti-pant set in handwoven sage cotton, with contrast topstitching.",
  },
  {
    id: "p11", name: "Ink Wash Kurta", category: "Kurtas", collection: "indigo-hour",
    price: 5100, tag: "new", colors: ["Ink"], sizes: ["XS", "S", "M", "L"],
    images: [IMG(PHOTOS.b), IMG(PHOTOS.a)],
    description: "A straight-cut kurta in tonal ink-wash cotton with a hidden placket and side slits.",
  },
  {
    id: "p12", name: "Petal Co-ord Set", category: "Co-ord", collection: "monsoon-bloom",
    price: 7900, tag: "trending", colors: ["Blush"], sizes: ["XS", "S", "M", "L"],
    images: [IMG(PHOTOS.d), IMG(PHOTOS.c)],
    description: "A cropped shirt and skirt co-ord printed with a hand-drawn petal motif.",
  },
  {
    id: "p13", name: "Loomcraft Shirt", category: "Shirts", collection: "woven-tales",
    price: 4600, tag: "", colors: ["Ecru"], sizes: ["S", "M", "L", "XL"],
    images: [IMG(PHOTOS.f), IMG(PHOTOS.e)],
    description: "A handloom shirt in a subtle self-check weave, with a single chest pocket.",
  },
  {
    id: "p14", name: "Clay Slip Dress", category: "Dresses", collection: "terra",
    price: 6800, tag: "", colors: ["Clay"], sizes: ["XS", "S", "M", "L"],
    images: [IMG(PHOTOS.h), IMG(PHOTOS.g)],
    description: "A bias-cut slip dress in soft clay-toned crepe, designed to layer under kurtas or worn alone.",
  },
  {
    id: "p15", name: "Reed Trench Jacket", category: "Jacket", collection: "indigo-hour",
    price: 12400, tag: "new", colors: ["Indigo"], sizes: ["S", "M", "L", "XL"],
    images: [IMG(PHOTOS.j), IMG(PHOTOS.i)],
    description: "A knee-length trench in indigo-dyed cotton twill, with a storm flap and belted waist.",
  },
  {
    id: "p16", name: "Woven Border Dupatta", category: "Dupatta", collection: "woven-tales",
    price: 3800, tag: "", colors: ["Natural/Rust"], sizes: ["One Size"],
    images: [IMG(PHOTOS.l), IMG(PHOTOS.k)],
    description: "A handloom dupatta with a contrast woven border, in breathable cotton-silk.",
  },
  {
    id: "p17", name: "Petal Sleeve Blouse", category: "Blouse", collection: "monsoon-bloom",
    price: 3400, tag: "trending", colors: ["Ivory"], sizes: ["XS", "S", "M", "L"],
    images: [IMG(PHOTOS.n), IMG(PHOTOS.m)],
    description: "A fitted blouse with soft petal sleeves, hand-block printed at the cuff.",
  },
  {
    id: "p18", name: "Straight Cotton Trousers", category: "Trousers", collection: "indigo-hour",
    price: 4400, tag: "", colors: ["Indigo", "Charcoal"], sizes: ["XS", "S", "M", "L", "XL"],
    images: [IMG(PHOTOS.p, ), IMG(PHOTOS.o)],
    description: "Straight-leg trousers in garment-dyed cotton twill with a mid-rise, tapered fit.",
  },
];

const HERO_IMAGE = `https://images.unsplash.com/photo-${PHOTOS.q}?w=1800&h=1200&fit=crop&q=80`;
const STORY_IMAGE = `https://images.unsplash.com/photo-${PHOTOS.r}?w=1200&h=1400&fit=crop&q=80`;

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getRelatedProducts(product, count = 4) {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection)
  ).slice(0, count);
}

function formatPrice(value) {
  return "₹" + value.toLocaleString("en-IN");
}
