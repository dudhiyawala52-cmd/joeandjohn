import type { Category, ImageAsset, Product } from "../types";

/**
 * Demonstration catalogue taken from the current joeandjone.co.uk range
 * (titles, SKUs, specifications and photography). Hand dryers have no
 * photography on the current site, so they carry `image: null` and the UI
 * shows a labelled illustration until real photos are supplied.
 */

const img = (file: string, alt: string): ImageAsset => ({
  src: `/products/${file}.jpg`,
  alt,
  width: 600,
  height: 600,
});

export const categories: Category[] = [
  {
    handle: "automatic-faucets",
    menuImage: { src: "/menu/automatic-faucets-trio.webp", alt: "Three chrome sensor taps, a straight spout with a temperature lever, a swan neck and a wedge design, on a pale stone counter against a warm fluted wall", width: 2000, height: 848 },
    menuFocus: "52% 50%",
    panelImage: { src: "/panels/automatic-faucets-stone.webp", alt: "Chrome swan-neck sensor tap above a carved stone basin in low evening light, with a clay vase and oak slats to the left", width: 1672, height: 941 },
    panelPortraitImage: { src: "/panels/automatic-faucets-stone.webp", alt: "", width: 1672, height: 941 },
    panelMobileFocus: "54% 50%",
    panelTitleLines: ["Automatic", "Faucets"],
    title: "Automatic Faucets",
    shortTitle: "Faucets",
    summary:
      "Solid brass sensor taps that start the moment hands arrive and stop the moment they leave. Sensing range and run time are set by remote, with no need to open the unit.",
    href: "/products/automatic-faucets",
    productCount: 25,
    specs: [
      { label: "Flow rate", value: "4 L/min, 1.5 L/min restrictor" },
      { label: "Sensing distance", value: "10 to 22 cm, adjustable" },
      { label: "Power", value: "Dual supply, mains or battery" },
    ],
    heroImage: img("af22", "Chrome deck-mounted sensor tap with side temperature control"),
    keywords: ["tap", "taps", "faucet", "sensor tap", "basin", "mixer", "brass", "infrared"],
  },
  {
    handle: "automatic-soap-dispenser",
    menuImage: { src: "/menu/soap-dispenser-lifestyle.webp", alt: "Chrome sensor soap dispenser releasing soap into a hand beside a white basin", width: 1448, height: 1086 },
    panelImage: { src: "/panels/soap-dispenser-spout.webp", alt: "Chrome gooseneck sensor dispenser spout above a white basin against pale green and white tiles", width: 2000, height: 848 },
    panelPortraitImage: { src: "/panels/soap-dispenser-spout.webp", alt: "", width: 2000, height: 848 },
    panelFocus: "76% 50%",
    panelMobileFocus: "61% 50%",
    panelTitleLines: ["Automatic", "Soap Dispensers"],
    title: "Automatic Soap Dispensers",
    shortTitle: "Soap Dispensers",
    summary:
      "Deck-mounted dispensers that release a measured dose every time, so soap lasts longer and counters stay clean between refills.",
    href: "/products/automatic-soap-dispenser",
    productCount: 14,
    specs: [
      { label: "Dosage", value: "Measured per activation" },
      { label: "Installation", value: "Deck mounted, top refill" },
      { label: "Contact", value: "None, infrared activation" },
    ],
    heroImage: img("ad51", "Chrome deck-mounted automatic soap dispenser with round spout"),
    keywords: ["soap", "dispenser", "sanitiser", "hand wash", "foam"],
  },
  {
    handle: "hand-dryer",
    menuImage: { src: "/menu/hand-dryer.webp", alt: "Illustration of a wall-mounted high-speed hand dryer", width: 1200, height: 1600 },
    panelImage: { src: "/panels/hand-dryer.webp", alt: "Illustration of a wall-mounted high-speed hand dryer", width: 2400, height: 1350 },
    title: "Hand Dryers",
    shortTitle: "Hand Dryers",
    summary:
      "High-speed and compact dryers in stainless steel or slim polymer bodies, with HEPA filtration and warm or cold air at the touch of a side switch.",
    href: "/products/hand-dryer",
    productCount: 5,
    specs: [
      { label: "Motor speed", value: "22,000 RPM" },
      { label: "Standby power", value: "0.5 W" },
      { label: "Shell", value: "Cast 304 stainless steel" },
    ],
    heroImage: null,
    keywords: ["dryer", "drier", "hand dryer", "air", "hepa", "high speed"],
  },
  {
    handle: "automatic-toilet-flush",
    menuImage: { src: "/menu/toilet-flush-lifestyle.webp", alt: "Round black touch-free flush plate above a wall-hung WC in a sunlit stone washroom", width: 1448, height: 1086 },
    panelImage: { src: "/panels/toilet-flush-oak.webp", alt: "Woman pointing towards a square steel touch-free flush plate with a glowing blue sensor above a wall-hung WC, beside an oak-slatted vanity wall", width: 1672, height: 941 },
    panelPortraitImage: { src: "/panels/toilet-flush-oak.webp", alt: "", width: 1672, height: 941 },
    panelMobileFocus: "72% 50%",
    title: "Toilet Flush",
    shortTitle: "Toilet Flush",
    summary:
      "Infrared WC flush plates in aluminium alloy frames. They flush when the user steps away and run a hygiene flush if the toilet has not been used for 24 hours.",
    href: "/products/automatic-toilet-flush",
    productCount: 12,
    specs: [
      { label: "Activation", value: "Infrared, with manual override" },
      { label: "Hygiene flush", value: "Every 24 hours when idle" },
      { label: "Frame", value: "Aluminium alloy" },
    ],
    heroImage: img("at75", "Black glass toilet flush plate with an illuminated sensor ring"),
    keywords: ["toilet", "wc", "flush", "flush plate", "cistern", "concealed"],
  },
  {
    handle: "urinal-flush",
    menuImage: { src: "/menu/urinal-flush-lifestyle.webp", alt: "Square stainless steel sensor flush plate above a wall-hung urinal in a warm stone washroom", width: 1448, height: 1086 },
    panelImage: { src: "/panels/urinal-flush-lifestyle.webp", alt: "Black wall-hung urinal below a stainless steel sensor flush plate on a stone wall, with a city view beyond", width: 1672, height: 941 },
    panelPortraitImage: { src: "/panels/urinal-flush-lifestyle.webp", alt: "", width: 1672, height: 941 },
    panelMobileFocus: "71% 50%",
    title: "Urinal Flush",
    shortTitle: "Urinal Flush",
    summary:
      "Stainless steel urinal sensors with a short pre-rinse and a timed after-flush. Range is adjustable by remote and a built-in valve regulates supply.",
    href: "/products/urinal-flush",
    productCount: 9,
    specs: [
      { label: "Flush programme", value: "2 s pre-flush, 6 s after-flush" },
      { label: "Hygiene flush", value: "Every 24 hours when idle" },
      { label: "Plate", value: "Brushed stainless steel" },
    ],
    heroImage: img("uf1", "Brushed stainless steel urinal flush plate with an illuminated button"),
    keywords: ["urinal", "flush", "sensor", "stainless", "washroom"],
  },
];

const faucetHighlights = ["Reduces water consumption", "Adjustable by remote control", "No physical contact"];
const soapHighlights = ["Accurate soap dosage", "Easy to install and refill", "No physical contact"];
const toiletHighlights = ["Infrared WC sensor", "24-hour hygiene flush", "Aluminium alloy frame"];
const urinalHighlights = ["2 s pre-flush, 6 s after-flush", "24-hour hygiene flush", "Remote-adjustable range"];

const product = (
  handle: string,
  title: string,
  sku: string,
  categoryHandle: string,
  image: ImageAsset | null,
  highlights: string[],
): Product => ({
  handle,
  title,
  sku,
  categoryHandle,
  href: `/products/${categoryHandle}/${handle}`,
  image,
  highlights,
});

export const products: Product[] = [
  product("touch-free-sensor-faucet-22", "Touch Free Sensor Faucet", "362.0022", "automatic-faucets", img("af22", "Chrome sensor tap with sculpted spout"), faucetHighlights),
  product("touch-free-sensor-faucet", "Touch Free Sensor Faucet", "362.0001", "automatic-faucets", img("af1", "Brushed steel angled cylinder sensor tap"), faucetHighlights),
  product("touch-free-sensor-faucet-5", "Touch Free Sensor Faucet", "362.0005", "automatic-faucets", img("af5", "Chrome round sensor tap with side mixing lever"), faucetHighlights),
  product("touch-free-sensor-faucet-10", "Touch Free Sensor Faucet, tall", "362.0010", "automatic-faucets", img("af10", "Tall square chrome sensor tap for vessel basins"), faucetHighlights),
  product("touch-free-sensor-faucet-3", "Touch Free Sensor Faucet", "362.0003", "automatic-faucets", img("af3", "Chrome sensor tap"), faucetHighlights),
  product("touch-free-sensor-faucet-15", "Touch Free Sensor Faucet", "362.0015", "automatic-faucets", img("af15", "Chrome sensor tap"), faucetHighlights),
  product("automatic-soap-dispenser", "Automatic Soap Dispenser", "363.1151", "automatic-soap-dispenser", img("ad51", "Chrome round automatic soap dispenser"), soapHighlights),
  product("automatic-soap-dispenser-5", "Automatic Soap Dispenser", "363.1155", "automatic-soap-dispenser", img("ad55", "Chrome automatic soap dispenser"), soapHighlights),
  product("automatic-soap-dispenser-9", "Automatic Soap Dispenser, square", "363.1159", "automatic-soap-dispenser", img("ad59", "Square chrome automatic soap dispenser"), soapHighlights),
  product("high-speed-hand-dryer", "High Speed Hand Dryer", "253.0100", "hand-dryer", null, ["22,000 RPM motor", "0.5 W standby", "Warm or cold air"]),
  product("high-speed-hand-dryer-2", "High Speed Hand Dryer", "253.0101", "hand-dryer", null, ["22,000 RPM motor", "0.5 W standby", "Modular, easy maintenance"]),
  product("compact-hygiene-hand-dryer", "Compact Hygiene Hand Dryer", "253.0103", "hand-dryer", null, ["Cast 304 stainless shell", "Infrared sensor", "Compact mini body"]),
  product("ultraslim-plastic-high-speed-hand-dryer", "Ultraslim High Speed Hand Dryer", "253.0104", "hand-dryer", null, ["HEPA filtration", "Warm or cold air switch", "Ultra slim body"]),
  product("compact-high-speed-hand-dryer", "Compact High Speed Hand Dryer", "253.0106", "hand-dryer", null, ["Cast 304 stainless shell", "Infrared sensor", "Anti-interference technology"]),
  product("automatic-toilet-flush-10", "Automatic Toilet Flush, black glass", "370.2175", "automatic-toilet-flush", img("at75", "Black glass toilet flush plate with sensor ring"), toiletHighlights),
  product("automatic-toilet-flush", "Automatic Toilet Flush, round", "370.2166", "automatic-toilet-flush", img("at66", "Round black toilet flush plate with push button"), toiletHighlights),
  product("automatic-toilet-flush-5", "Automatic Toilet Flush, square", "370.2170", "automatic-toilet-flush", img("at70", "Square satin toilet flush plate with touch-free sensor"), toiletHighlights),
  product("automatic-urinal-flush-stainless-steel", "Automatic Urinal Flush, stainless steel", "370.1752", "urinal-flush", img("uf1", "Brushed steel urinal flush plate with illuminated button"), urinalHighlights),
  product("automatic-urinal-flush-stainless-steel-3", "Automatic Urinal Flush, slimline sensor", "370.1754", "urinal-flush", img("uf3", "Square brushed steel urinal sensor plate"), urinalHighlights),
];
