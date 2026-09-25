// Catalog structure for product families and color variants
export type Color = 'pink' | 'grey' | 'black' | 'stone' | 'white' | 'royal-blue' | 'navy' | 'red';

export type Variant = {
  color: Color;
  name: string;
  images: { front: string; back: string; detail?: string };
  description?: string;
};

export type Family = {
  id: 'hoodie' | 'tshirt' | 'joggers' | 'fractured-love-tshirt' | 'cap' | 'puffer-jacket' | 'hooded-bomber' | 'beanie' | 'signature-tshirt' | 'signature-hoodie';
  title: string;
  price: number;
  originalPrice?: number; // For Black Friday discounts
  tagline?: string;
  description?: string;
  details?: string[];
  styleCode?: string;
  isNew?: boolean;
  soldOut?: boolean;
  preSale?: boolean;
  collectionTags?: ('basics' | 'tracksuits' | 'limited' | 'fractured-love' | 'outerwear' | 'signature')[];
  variants: Variant[];
};

import hoodiePinkFront from "@/assets/hoodie-pink-front.webp";
import hoodiePinkBack from "@/assets/hoodie-pink-back.webp";
import hoodieGreyFront from "@/assets/hoodie-grey-front.webp";
import hoodieGreyBack from "@/assets/hoodie-grey-back.webp";
import hoodieBlackFront from "@/assets/hoodie-black-front.webp";
import hoodieBlackBack from "@/assets/hoodie-black-back.webp";
import hoodieStoneFront from "@/assets/hoodie-stone-front.webp";
import hoodieStoneBack from "@/assets/hoodie-stone-back.webp";
import tshirtPinkFront from "@/assets/tshirt-pink-front.webp";
import tshirtPinkBack from "@/assets/tshirt-pink-back.webp";
import tshirtGreyFront from "@/assets/tshirt-grey-front.webp";
import tshirtGreyBack from "@/assets/tshirt-grey-back.webp";
import tshirtBlackFront from "@/assets/tshirt-black-front.webp";
import tshirtBlackBack from "@/assets/tshirt-black-back.webp";
import tshirtStoneFront from "@/assets/tshirt-stone-front.webp";
import tshirtStoneBack from "@/assets/tshirt-stone-back.webp";
import joggersBlackFront from "@/assets/joggers-black-front.webp";
import joggersBlackBack from "@/assets/joggers-black-back.webp";
import joggersBlackDetail from "@/assets/joggers-black-detail.webp";
import joggersPinkFront from "@/assets/joggers-pink-front.webp";
import joggersPinkBack from "@/assets/joggers-pink-back.webp";
import joggersPinkDetail from "@/assets/joggers-pink-detail.webp";
import joggersStoneFront from "@/assets/joggers-stone-front.webp";
import joggersStoneBack from "@/assets/joggers-stone-back.webp";
import joggersStoneDetail from "@/assets/joggers-stone-detail.webp";
import joggersGreyFront from "@/assets/joggers-grey-front.webp";
import joggersGreyBack from "@/assets/joggers-grey-back.webp";
import joggersGreyDetail from "@/assets/joggers-grey-detail.webp";
import tshirtFracturedWhiteFront from "@/assets/tshirt-fractured-white-front.webp";
import tshirtFracturedWhiteBack from "@/assets/tshirt-fractured-white-back.webp";
import tshirtFracturedBlackFront from "@/assets/tshirt-fractured-black-front.webp";
import tshirtFracturedBlackBack from "@/assets/tshirt-fractured-black-back.webp";
import capBlackFront from "@/assets/cap-black-front.webp";
import capBlackBack from "@/assets/cap-black-back.webp";
import capPinkFront from "@/assets/cap-pink-front.webp";
import capPinkBack from "@/assets/cap-pink-back.webp";
import capRoyalBlueFront from "@/assets/cap-royal-blue-front.webp";
import capRoyalBlueBack from "@/assets/cap-royal-blue-back.webp";
import capWhiteFront from "@/assets/cap-white-front.webp";
import capWhiteBack from "@/assets/cap-white-back.webp";
import pufferBlackFront from "@/assets/puffer-black-front.webp";
import pufferBlackBack from "@/assets/puffer-black-back.webp";
import pufferNavyFront from "@/assets/puffer-navy-front.webp";
import pufferNavyBack from "@/assets/puffer-navy-back.webp";
import pufferRedFront from "@/assets/puffer-red-front.webp";
import pufferRedBack from "@/assets/puffer-red-back.webp";
import bomberBlackFront from "@/assets/bomber-black-front.webp";
import bomberBlackBack from "@/assets/bomber-black-back.webp";
import bomberNavyFront from "@/assets/bomber-navy-front.webp";
import bomberNavyBack from "@/assets/bomber-navy-back.webp";
import bomberStoneFront from "@/assets/bomber-stone-front.webp";
import bomberStoneBack from "@/assets/bomber-stone-back.webp";
import beanieBlack from "@/assets/beanie-black.webp";
import beanieNavy from "@/assets/beanie-navy.webp";
import beaniePink from "@/assets/beanie-pink.webp";
import tshirtSignatureBlackFront from "@/assets/tshirt-signature-black-front.webp";
import tshirtSignatureBlackBack from "@/assets/tshirt-signature-black-back.webp";
import tshirtSignatureWhiteFront from "@/assets/tshirt-signature-white-front.webp";
import tshirtSignatureWhiteBack from "@/assets/tshirt-signature-white-back.webp";
import tshirtSignatureBlueFront from "@/assets/tshirt-signature-blue-front.webp";
import tshirtSignatureBlueBack from "@/assets/tshirt-signature-blue-back.webp";
import hoodieSignatureBlackFront from "@/assets/hoodie-signature-black-front.webp";
import hoodieSignatureBlackBack from "@/assets/hoodie-signature-black-back.webp";
import hoodieSignaturePinkFront from "@/assets/hoodie-signature-pink-front.webp";
import hoodieSignaturePinkBack from "@/assets/hoodie-signature-pink-back.webp";

export const FAMILIES: Record<Family['id'], Family> = {
  hoodie: {
    id: 'hoodie',
    title: 'Anti-Love Hoodie',
    price: 66.50,
    originalPrice: 95,
    isNew: false,
    preSale: true,
    description: 'Crafted from soft, mid-weight cotton fleece, this essential hoodie offers everyday comfort with a relaxed, easy-wear silhouette. Designed with a ribbed hem and cuffs for shape retention, it features a classic kangaroo pocket for practicality. The piece is finished with the Anti-Love branding on the front for a subtle, understated statement.',
    details: [
      'Relaxed fit, true to size',
      'Soft, mid-weight cotton fleece',
      'Classic kangaroo pocket',
      'Ribbed cuffs & hem for shape retention',
      'Embroidered Anti-Love chest branding',
      'Unisex fit',
      'Care: wash cold, inside-out',
    ],
    styleCode: 'AL-HDY-008',
    collectionTags: ['basics', 'tracksuits'],
    variants: [
      {
        color: 'pink',
        name: 'Pink',
        images: {
          front: hoodiePinkFront,
          back: hoodiePinkBack,
        },
      },
      {
        color: 'grey',
        name: 'Grey',
        images: {
          front: hoodieGreyFront,
          back: hoodieGreyBack,
        },
      },
      {
        color: 'black',
        name: 'Black',
        images: {
          front: hoodieBlackFront,
          back: hoodieBlackBack,
        },
      },
      {
        color: 'stone',
        name: 'Stone',
        images: {
          front: hoodieStoneFront,
          back: hoodieStoneBack,
        },
      },
    ],
  },

  tshirt: {
    id: 'tshirt',
    title: 'Anti-Love T-Shirt',
    price: 45.50,
    originalPrice: 65,
    isNew: false,
    preSale: true,
    description: 'Crafted from soft 100% cotton, this essential T-shirt offers everyday comfort with a relaxed, oversized silhouette. Designed with a smooth finish and a reinforced neckline for durability, it pairs effortlessly with any wardrobe. The piece is finished with the Anti-Love branding on the front for a subtle, understated statement. This item is available on Pre-Sale — dispatches in 2–3 weeks.',
    details: [
      '100% soft cotton',
      'Relaxed, slightly oversized fit',
      'Reinforced neckline for shape retention',
      'Smooth finish',
      'Anti-Love front branding',
      'Made in the UK',
      'Pre-Sale item: dispatches in 2–3 weeks',
    ],
    styleCode: 'AL-TEE-007',
    collectionTags: ['basics'],
    variants: [
      {
        color: 'pink',
        name: 'Pink',
        images: {
          front: tshirtPinkFront,
          back: tshirtPinkBack,
        },
      },
      {
        color: 'grey',
        name: 'Grey',
        images: {
          front: tshirtGreyFront,
          back: tshirtGreyBack,
        },
      },
      {
        color: 'black',
        name: 'Black',
        images: {
          front: tshirtBlackFront,
          back: tshirtBlackBack,
        },
      },
      {
        color: 'stone',
        name: 'Stone',
        images: {
          front: tshirtStoneFront,
          back: tshirtStoneBack,
        },
      },
    ],
  },

  joggers: {
    id: 'joggers',
    title: 'Anti-Love Jogger',
    price: 59.50,
    originalPrice: 85,
    isNew: false,
    preSale: true,
    tagline: 'Relaxed silhouette. Heavyweight cotton. Signature Anti-Love embroidery.',
    description: 'Crafted from soft, mid-weight cotton fleece, these luxury basic joggers deliver everyday comfort with a clean, tapered silhouette. Designed with an elasticated waistband and drawcord for an adjustable fit, they feature smooth elasticated ankle openings for a refined finish and side pockets for practicality. The piece is completed with subtle Anti-Love branding on the front for a minimal, elevated look.',
    details: [
      'Soft, mid-weight cotton fleece',
      'Clean tapered silhouette',
      'Elasticated waistband with adjustable drawcord',
      'Smooth elasticated ankle openings',
      'Side pockets',
      'Minimal Anti-Love branding',
      'Premium comfort fit',
      'Made in the UK',
    ],
    styleCode: 'AL-JOG-009',
    collectionTags: ['tracksuits', 'basics'],
    variants: [
      {
        color: 'pink',
        name: 'Pink',
        images: {
          front: joggersPinkFront,
          back: joggersPinkBack,
          detail: joggersPinkDetail,
        },
      },
      {
        color: 'black',
        name: 'Black',
        images: {
          front: joggersBlackFront,
          back: joggersBlackBack,
          detail: joggersBlackDetail,
        },
      },
      {
        color: 'stone',
        name: 'Stone',
        images: {
          front: joggersStoneFront,
          back: joggersStoneBack,
          detail: joggersStoneDetail,
        },
      },
      {
        color: 'grey',
        name: 'Grey',
        images: {
          front: joggersGreyFront,
          back: joggersGreyBack,
          detail: joggersGreyDetail,
        },
      },
    ],
  },

  'fractured-love-tshirt': {
    id: 'fractured-love-tshirt',
    title: 'Fractured Love T-Shirt',
    price: 45.50,
    originalPrice: 65,
    isNew: true,
    preSale: true,
    tagline: 'Limited Edition heavyweight cotton T-shirt with statement back graphic.',
    description: 'Crafted from ultra-soft heavyweight cotton, the Fractured Love T-Shirt combines structure, comfort, and statement design. Featuring an embossed Anti-Love chest emblem and the iconic fractured graphic across the back, this piece delivers a bold silhouette with a relaxed, true-to-size fit. Reinforced seams and premium fabric weight give the tee a durable, elevated feel—made for everyday wear with a luxury finish.',
    details: [
      'Relaxed fit, true to size',
      '240gsm heavyweight cotton blend',
      'Soft ringspun jersey fabric',
      'Embossed Anti-Love chest emblem',
      'Signature "Fractured Love" back graphic',
      'Reinforced seams, drop-shoulder structure',
      'Minimal shrink, premium wash retention',
    ],
    styleCode: 'AL-TST-014',
    collectionTags: ['limited'],
    variants: [
      {
        color: 'white',
        name: 'White',
        images: {
          front: tshirtFracturedWhiteFront,
          back: tshirtFracturedWhiteBack,
        },
      },
      {
        color: 'black',
        name: 'Black',
        images: {
          front: tshirtFracturedBlackFront,
          back: tshirtFracturedBlackBack,
        },
      },
    ],
  },

  cap: {
    id: 'cap',
    title: 'Anti-Love Cap',
    price: 45,
    isNew: true,
    tagline: 'Classic six-panel cap with embroidered Anti-Love branding.',
    description: 'Crafted from 100% cotton twill with a smooth, structured finish, this signature baseball cap balances everyday comfort with a clean, classic silhouette. Designed in a traditional six-panel shape, it features embroidered eyelets for breathability and an adjustable fabric strap for a personalised fit. The cap is finished with the Anti-Love emblem embroidered across the front.',
    details: [
      'Classic fit, adjustable',
      'Six-panel construction',
      'Embroidered Anti-Love front logo',
      'Adjustable back strap',
      'Premium cotton twill',
    ],
    styleCode: 'AL-CAP-002',
    soldOut: true,
    collectionTags: ['basics'],
    variants: [
      {
        color: 'pink',
        name: 'Pink',
        images: {
          front: capPinkFront,
          back: capPinkBack,
        },
      },
      {
        color: 'royal-blue',
        name: 'Royal Blue',
        images: {
          front: capRoyalBlueFront,
          back: capRoyalBlueBack,
        },
      },
      {
        color: 'black',
        name: 'Black',
        images: {
          front: capBlackFront,
          back: capBlackBack,
        },
      },
      {
        color: 'white',
        name: 'White',
        images: {
          front: capWhiteFront,
          back: capWhiteBack,
        },
      },
    ],
  },

  'puffer-jacket': {
    id: 'puffer-jacket',
    title: 'Anti-Love Puffer Jacket',
    price: 245,
    isNew: false,
    tagline: 'Heavyweight, water-resistant puffer with embroidered Anti-Love marks.',
    description: 'Crafted with a lightweight yet insulated shell, this signature puffer jacket delivers warmth, comfort and a refined, minimal profile. Designed with a modern, slightly oversized silhouette, it features a quilted finish for even insulation and elasticated cuffs for a secure fit. The jacket includes zipped side pockets for practicality and is finished with the Anti-Love branding on the chest for a subtle, elevated statement.',
    details: [
      'Relaxed fit, true to size',
      'Water-resistant matte shell',
      '700-fill premium insulation (recycled)',
      'Embroidered Anti-Love chest mark',
      'Oversized back graphic emblem',
      'Adjustable hood & hem cinch',
      'Two zip hand pockets, internal stash pocket',
    ],
    styleCode: 'AL-PUF-004',
    soldOut: true,
    collectionTags: ['outerwear'],
    variants: [
      {
        color: 'black',
        name: 'Black',
        images: {
          front: pufferBlackFront,
          back: pufferBlackBack,
        },
      },
      {
        color: 'navy',
        name: 'Navy',
        images: {
          front: pufferNavyFront,
          back: pufferNavyBack,
        },
      },
      {
        color: 'red',
        name: 'Red',
        images: {
          front: pufferRedFront,
          back: pufferRedBack,
        },
      },
    ],
  },

  'hooded-bomber': {
    id: 'hooded-bomber',
    title: 'Anti-Love Hooded Bomber',
    price: 185,
    isNew: false,
    tagline: 'Technical hooded bomber with insulated warmth, structured silhouette and signature Anti-Love chest embroidery.',
    description: 'Crafted from a smooth, durable shell with a soft quilted lining, this signature bomber jacket delivers everyday comfort with a sharp, structured silhouette. Designed with classic ribbed cuffs, hem and collar, it offers a secure fit while maintaining a timeless profile. The jacket features discreet side pockets and a full-length zip, and is finished with the Anti-Love branding on the chest for a subtle, elevated statement.',
    details: [
      'Relaxed fit, true to size',
      'Durable, weather-resistant shell',
      'Insulated mid-weight fill',
      'Embroidered Anti-Love crest (chest)',
      'Zip pockets + sleeve utility pocket',
      'Elastic hem & cuffs',
    ],
    styleCode: 'AL-BOM-005',
    soldOut: true,
    collectionTags: ['outerwear'],
    variants: [
      {
        color: 'black',
        name: 'Black',
        images: {
          front: bomberBlackFront,
          back: bomberBlackBack,
        },
      },
      {
        color: 'navy',
        name: 'Navy',
        images: {
          front: bomberNavyFront,
          back: bomberNavyBack,
        },
      },
      {
        color: 'stone',
        name: 'Stone',
        images: {
          front: bomberStoneFront,
          back: bomberStoneBack,
        },
      },
    ],
  },

  beanie: {
    id: 'beanie',
    title: 'Anti-Love Beanie',
    price: 40,
    isNew: true,
    tagline: 'Signature Anti-Love beanies — soft-touch warmth with bold embroidery for colder days.',
    description: 'Crafted from a soft, heavyweight knit, this signature beanie delivers warmth, comfort and a clean, minimal profile. Designed with a classic cuffed silhouette for a secure fit, it features a dense rib texture that retains shape through daily wear. The piece is finished with the Anti-Love branding embroidered on the front for a subtle, refined statement.',
    details: [
      'One size fits all',
      'Soft cotton-acrylic knit blend',
      'Embroidered Anti-Love crest',
      'Deep cuffed fit for warmth',
      'Hand wash cold, reshape while damp',
    ],
    styleCode: 'AL-BEN-003',
    soldOut: true,
    collectionTags: ['basics'],
    variants: [
      {
        color: 'black',
        name: 'Black',
        images: {
          front: beanieBlack,
          back: beanieBlack,
        },
        description: 'Crafted from a soft, heavyweight knit, this signature beanie delivers warmth, comfort and a clean, minimal profile. Designed with a classic cuffed silhouette for a secure fit, it features a dense rib texture that retains shape through daily wear. The piece is finished with the Anti-Love branding embroidered on the front for a subtle, refined statement.',
      },
      {
        color: 'navy',
        name: 'Navy',
        images: {
          front: beanieNavy,
          back: beanieNavy,
        },
        description: 'Crafted from a soft, heavyweight knit, this signature beanie delivers warmth, comfort and a clean, minimal profile. Designed with a classic cuffed silhouette for a secure fit, it features a dense rib texture that retains shape through daily wear. The piece is finished with the Anti-Love branding embroidered on the front for a subtle, refined statement.',
      },
      {
        color: 'pink',
        name: 'Pink',
        images: {
          front: beaniePink,
          back: beaniePink,
        },
        description: 'Crafted from a soft, heavyweight knit, this signature beanie delivers warmth, comfort and a clean, minimal profile. Designed with a classic cuffed silhouette for a secure fit, it features a dense rib texture that retains shape through daily wear. The piece is finished with the Anti-Love branding embroidered on the front for a subtle, refined statement.',
      },
    ],
  },

  'signature-tshirt': {
    id: 'signature-tshirt',
    title: 'Anti-Love Signature Tee',
    price: 65,
    isNew: false,
    tagline: 'Elevated heavyweight tee with chest Anti-Love mark and oversized back crest. Built for presence.',
    description: 'Crafted from soft, heavyweight cotton with a smooth finish, this signature T-shirt offers an elevated take on a wardrobe essential. Designed in an oversized fit, it features a structured drape and reinforced neckline for lasting shape. The piece is finished with the Anti-Love branding across the front, delivering a bold yet refined statement.',
    details: [
      'Heavy cotton jersey (240–260gsm)',
      'Boxy, slightly dropped shoulder',
      'Ribbed neck, double-needle hems',
      'Screenprint crest (front/back)',
      'Unisex fit',
      'Care: wash cold, inside-out',
    ],
    styleCode: 'AL-TEE-006',
    soldOut: true,
    collectionTags: ['signature'],
    variants: [
      {
        color: 'black',
        name: 'Black',
        images: {
          front: tshirtSignatureBlackFront,
          back: tshirtSignatureBlackBack,
        },
        description: 'Crafted from soft, heavyweight cotton with a smooth finish, this signature T-shirt offers an elevated take on a wardrobe essential. Designed in an oversized fit, it features a structured drape and reinforced neckline for lasting shape. The piece is finished with the Anti-Love branding across the front, delivering a bold yet refined statement.',
      },
      {
        color: 'white',
        name: 'White',
        images: {
          front: tshirtSignatureWhiteFront,
          back: tshirtSignatureWhiteBack,
        },
        description: 'Crafted from soft, heavyweight cotton with a smooth finish, this signature T-shirt offers an elevated take on a wardrobe essential. Designed in an oversized fit, it features a structured drape and reinforced neckline for lasting shape. The piece is finished with the Anti-Love branding across the front, delivering a bold yet refined statement.',
      },
      {
        color: 'royal-blue',
        name: 'Royal Blue',
        images: {
          front: tshirtSignatureBlueFront,
          back: tshirtSignatureBlueBack,
        },
        description: 'Crafted from soft, heavyweight cotton with a smooth finish, this signature T-shirt offers an elevated take on a wardrobe essential. Designed in an oversized fit, it features a structured drape and reinforced neckline for lasting shape. The piece is finished with the Anti-Love branding across the front, delivering a bold yet refined statement.',
      },
    ],
  },

  'signature-hoodie': {
    id: 'signature-hoodie',
    title: 'Anti-Love Signature Hoodie',
    price: 95,
    isNew: false,
    tagline: 'Premium fleece hoodie with tonal chest mark and oversized back crest. Engineered for cold streets.',
    description: 'Crafted from premium 480GSM cotton with an ultra-soft finish, this signature hoodie delivers the perfect blend of structure and comfort. Cut in a relaxed oversized fit, it features a ribbed hem and cuffs for lasting shape and a classic kangaroo pocket. Finished with the bold Anti-Love motif across the chest and matching branding on the back, this piece makes a statement from every angle.',
    details: [
      '400–450gsm brushed fleece',
      'Boxy body, dropped shoulder',
      'Double-lined hood, heavy drawcords',
      'Kangaroo pocket',
      'Tonal chest mark, oversized back crest print',
      'Unisex fit',
      'Care: wash cold, tumble low',
    ],
    styleCode: 'AL-SHD-001',
    soldOut: true,
    collectionTags: ['signature'],
    variants: [
      {
        color: 'black',
        name: 'Black',
        images: {
          front: hoodieSignatureBlackFront,
          back: hoodieSignatureBlackBack,
        },
        description: 'Crafted from premium 480GSM cotton with an ultra-soft finish, this signature hoodie delivers the perfect blend of structure and comfort. Cut in a relaxed oversized fit, it features a ribbed hem and cuffs for lasting shape and a classic kangaroo pocket. Finished with the bold Anti-Love motif across the chest and matching branding on the back, this piece makes a statement from every angle.',
      },
      {
        color: 'pink',
        name: 'Pink',
        images: {
          front: hoodieSignaturePinkFront,
          back: hoodieSignaturePinkBack,
        },
        description: 'Crafted from premium 480GSM cotton with an ultra-soft finish, this signature hoodie delivers the perfect blend of structure and comfort. Cut in a relaxed oversized fit, it features a ribbed hem and cuffs for lasting shape and a classic kangaroo pocket. Finished with the bold Anti-Love motif across the chest and matching branding on the back, this piece makes a statement from every angle.',
      },
    ],
  },
};

export const COLOR_ORDER: { key: Color; label: string }[] = [
  { key: 'pink', label: 'Pink' },
  { key: 'royal-blue', label: 'Royal Blue' },
  { key: 'grey', label: 'Grey' },
  { key: 'black', label: 'Black' },
  { key: 'stone', label: 'Stone' },
  { key: 'white', label: 'White' },
  { key: 'navy', label: 'Navy' },
  { key: 'red', label: 'Red' },
];
