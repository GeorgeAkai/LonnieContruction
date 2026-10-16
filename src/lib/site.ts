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
    body: "Three-coat and one-coat systems on new homes, additions and ADUs — lath, scratch, brown and finish done right the first time.",
    icon: "home",
  },
  {
    title: "Stucco Repair & Patching",
    body: "Cracks, impact damage, water intrusion and old-patch mismatches blended back in so the repair disappears.",
    icon: "hammer",
  },
  {
    title: "Re-Stucco & Color Coat",
    body: "Refresh a tired exterior with a new color coat or full re-skin. Smooth, sand, lace or Santa Barbara finishes.",
    icon: "paintRoller",
  },
  {
    title: "Lath & Wire Work",
    body: "Paper, wire, weep screed and trim installed to code — the part nobody sees that keeps a wall dry for decades.",
    icon: "grid",
  },
  {
    title: "Interior Plaster",
    body: "Veneer and traditional plaster walls, arches and niches with a hand-troweled finish drywall can't match.",
    icon: "brush",
  },
  {
    title: "Fire Rebuild Stucco",
    body: "Helping Paradise, Magalia and Butte County families rebuild with fire-resistant cement plaster exteriors.",
    icon: "flame",
  },
] as const;
