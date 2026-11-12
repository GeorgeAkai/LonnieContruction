export const site = {
  name: "Mid Valley Lath & Plaster",
  shortName: "Mid Valley",
  owner: "Lonnie Joyner",
  established: 2006,
  license: "1121138",
  phone: "(530) 680-0491",
  phoneHref: "tel:+15306800491",
  smsHref: "sms:+15306800491",
  email: "lonniejoyner777@yahoo.com",
  address: {
    street: "981 Liberty Lane",
    city: "Chico",
    state: "CA",
    zip: "95928",
  },
  serviceAreas: [
    "Chico",
    "Oroville",
    "Paradise",
    "Magalia",
    "Durham",
    "Gridley",
    "Biggs",
    "Palermo",
    "Orland",
    "Hamilton City",
    "Willows",
    "Corning",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://midvalleylathandplaster.com",
} as const;

export const services = [
  {
    title: "New Stucco Installation",
    body: "Three-coat and one-coat systems for new homes and additions.",
    icon: "home",
  },
  {
    title: "Stucco Repair & Patching",
    body: "Cracks and damage patched to blend in.",
    icon: "hammer",
  },
  {
    title: "Re-Stucco & Color Coat",
    body: "New color coats and full re-skins.",
    icon: "paintRoller",
  },
  {
    title: "Lath & Wire Work",
    body: "Paper, wire and trim installed to code.",
    icon: "grid",
  },
  {
    title: "Interior Plaster",
    body: "Hand-troweled walls, arches and niches.",
    icon: "brush",
  },
  {
    title: "Fire Rebuild Stucco",
    body: "Fire-resistant exteriors for Paradise and Butte County.",
    icon: "flame",
  },
] as const;
