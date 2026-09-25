type HoodieColourOption = {
  key: 'pink' | 'grey' | 'black' | 'stone';
  label: string;
  handle: string;
};

type TShirtColourOption = {
  key: 'pink' | 'grey' | 'black' | 'stone';
  label: string;
  handle: string;
};

type CapColourOption = {
  key: 'pink' | 'royal-blue' | 'black' | 'white';
  label: string;
  handle: string;
};

type BomberColourOption = {
  key: 'black' | 'navy' | 'stone';
  label: string;
  handle: string;
};

type SignatureTeeColourOption = {
  key: 'black' | 'blue' | 'white';
  label: string;
  handle: string;
};

type SignatureHoodieColourOption = {
  key: 'pink' | 'black';
  label: string;
  handle: string;
};

type BeanieColourOption = {
  key: 'black' | 'navy' | 'pink';
  label: string;
  handle: string;
};

type FracturedLoveTeeColourOption = {
  key: 'white' | 'black';
  label: string;
  handle: string;
};

type JoggerColourOption = {
  key: 'pink' | 'grey' | 'black' | 'stone';
  label: string;
  handle: string;
};

type PufferColourOption = {
  key: 'black' | 'navy' | 'red';
  label: string;
  handle: string;
};

type ProductFamily = {
  id: string;
  options: Array<HoodieColourOption | TShirtColourOption | CapColourOption | BomberColourOption | SignatureTeeColourOption | SignatureHoodieColourOption | BeanieColourOption | FracturedLoveTeeColourOption | JoggerColourOption | PufferColourOption>;
};

// Anti-Love Hoodie family
export const ANTI_LOVE_HOODIE_FAMILY: ProductFamily = {
  id: 'anti-love-hoodie',
  options: [
    { key: 'pink',  label: 'Pink',  handle: 'anti-love-hoodie-pink' },
    { key: 'grey',  label: 'Grey',  handle: 'anti-love-hoodie-grey' },
    { key: 'black', label: 'Black', handle: 'anti-love-hoodie-black' },
    { key: 'stone', label: 'Stone', handle: 'anti-love-hoodie-stone' },
  ],
};

// Anti-Love T-Shirt family
export const ANTI_LOVE_TSHIRT_FAMILY: ProductFamily = {
  id: 'anti-love-tshirt',
  options: [
    { key: 'pink',  label: 'Pink',  handle: 'anti-love-t-shirt-pink' },
    { key: 'grey',  label: 'Grey',  handle: 'anti-love-t-shirt-grey' },
    { key: 'black', label: 'Black', handle: 'anti-love-t-shirt-black' },
    { key: 'stone', label: 'Stone', handle: 'anti-love-t-shirt-stone' },
  ],
};

// Anti-Love Cap family
export const ANTI_LOVE_CAP_FAMILY: ProductFamily = {
  id: 'anti-love-cap',
  options: [
    { key: 'pink',       label: 'Pink',       handle: 'anti-love-cap-pink' },
    { key: 'royal-blue', label: 'Royal Blue', handle: 'anti-love-cap-royal-blue' },
    { key: 'black',      label: 'Black',      handle: 'anti-love-cap-black' },
    { key: 'white',      label: 'White',      handle: 'anti-love-cap-white' },
  ],
};

// Anti-Love Hooded Bomber Jacket family
export const ANTI_LOVE_BOMBER_FAMILY: ProductFamily = {
  id: 'anti-love-bomber',
  options: [
    { key: 'black', label: 'Black', handle: 'anti-love-hooded-bomber-jacket-black' },
    { key: 'navy',  label: 'Navy',  handle: 'anti-love-hooded-bomber-jacket-navy' },
    { key: 'stone', label: 'Stone', handle: 'anti-love-hooded-bomber-jacket-stone' },
  ],
};

// Anti-Love Signature Tee family
export const ANTI_LOVE_SIGNATURE_TEE_FAMILY: ProductFamily = {
  id: 'anti-love-signature-tee',
  options: [
    { key: 'black', label: 'Black', handle: 'anti-love-signature-tee-black' },
    { key: 'blue',  label: 'Blue',  handle: 'anti-love-signature-tee-blue' },
    { key: 'white', label: 'White', handle: 'anti-love-signature-tee-white' },
  ],
};

// Anti-Love Signature Hoodie family
export const ANTI_LOVE_SIGNATURE_HOODIE_FAMILY: ProductFamily = {
  id: 'anti-love-signature-hoodie',
  options: [
    { key: 'pink',  label: 'Pink',  handle: 'anti-love-signature-hoodie-pink' },
    { key: 'black', label: 'Black', handle: 'anti-love-signature-hoodie-black' },
  ],
};

// Anti-Love Beanie family
export const ANTI_LOVE_BEANIE_FAMILY: ProductFamily = {
  id: 'anti-love-beanie',
  options: [
    { key: 'black', label: 'Black', handle: 'anti-love-beanie-black' },
    { key: 'navy',  label: 'Navy',  handle: 'anti-love-beanie-navy' },
    { key: 'pink',  label: 'Pink',  handle: 'anti-love-beanie-pink' },
  ],
};

// Fractured Love T-Shirt family
export const FRACTURED_LOVE_TSHIRT_FAMILY: ProductFamily = {
  id: 'fractured-love-tshirt',
  options: [
    { key: 'white', label: 'White', handle: 'fractured-love-t-shirt-white' },
    { key: 'black', label: 'Black', handle: 'fractured-love-t-shirt-black' },
  ],
};

// Anti-Love Jogger family
export const ANTI_LOVE_JOGGER_FAMILY: ProductFamily = {
  id: 'anti-love-jogger',
  options: [
    { key: 'pink',  label: 'Pink',  handle: 'anti-love-jogger-pink' },
    { key: 'grey',  label: 'Grey',  handle: 'anti-love-jogger-grey' },
    { key: 'black', label: 'Black', handle: 'anti-love-jogger-black' },
    { key: 'stone', label: 'Stone', handle: 'anti-love-jogger-stone' },
  ],
};

// Anti-Love Puffer Jacket family
export const ANTI_LOVE_PUFFER_FAMILY: ProductFamily = {
  id: 'anti-love-puffer',
  options: [
    { key: 'black', label: 'Black', handle: 'anti-love-puffer-jacket-black' },
    { key: 'navy',  label: 'Navy',  handle: 'anti-love-puffer-jacket-navy' },
    { key: 'red',   label: 'Red',   handle: 'anti-love-puffer-jacket-red' },
  ],
};

// Update Signature Tee family to use correct handles
export const ANTI_LOVE_SIGNATURE_TEE_UPDATED: ProductFamily = {
  id: 'anti-love-signature-tee',
  options: [
    { key: 'black', label: 'Black', handle: 'anti-love-signature-tee-black' },
    { key: 'blue',  label: 'Blue',  handle: 'anti-love-signature-tee-blue' },
    { key: 'white', label: 'White', handle: 'anti-love-signature-tee-white' },
  ],
};

// Update Signature Hoodie family to use correct handles
export const ANTI_LOVE_SIGNATURE_HOODIE_UPDATED: ProductFamily = {
  id: 'anti-love-signature-hoodie',
  options: [
    { key: 'pink',  label: 'Pink',  handle: 'anti-love-signature-hoodie-pink' },
    { key: 'black', label: 'Black', handle: 'anti-love-signature-hoodie-black' },
  ],
};

// Quick lookup: handle → family
export const FAMILY_BY_HANDLE: Record<string, ProductFamily> = {};

[
  ANTI_LOVE_HOODIE_FAMILY, 
  ANTI_LOVE_TSHIRT_FAMILY, 
  ANTI_LOVE_CAP_FAMILY, 
  ANTI_LOVE_BOMBER_FAMILY, 
  ANTI_LOVE_SIGNATURE_TEE_UPDATED, 
  ANTI_LOVE_SIGNATURE_HOODIE_UPDATED, 
  ANTI_LOVE_BEANIE_FAMILY, 
  FRACTURED_LOVE_TSHIRT_FAMILY,
  ANTI_LOVE_JOGGER_FAMILY,
  ANTI_LOVE_PUFFER_FAMILY
].forEach((family) => {
  family.options.forEach((opt) => {
    FAMILY_BY_HANDLE[opt.handle] = family;
  });
});
