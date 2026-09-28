import type { HeroSlide } from "../types";

export const heroSlides: HeroSlide[] = [
  {
    id: "washroom",
    label: "Touch-free washrooms",
    heading: "Washrooms that work without a touch",
    cta: { label: "Explore products", href: "/products" },
    tone: "dark",
    shade: { left: "34 25 17", right: "32 25 19", top: "28 25 23" },
    media: {
      kind: "photo",
      image: {
        src: "/hero/washroom-lake-travertine.png",
        alt: "Travertine washroom overlooking a lake, with sensor taps at a curved vanity and touch-free flush plates above a wall-hung WC and a urinal",
        width: 3168,
        height: 1344,
      },
      // Keeps the urinal in frame while the far right-hand edge stays off-screen.
      focus: "55% 50%",
      mobileFocus: "56% 50%",
    },
  },
  {
    id: "sensor-taps",
    label: "Sensor taps",
    heading: "Water flows only while hands are there",
    cta: { label: "View Automatic Faucets", href: "/products/automatic-faucets" },
    tone: "dark",
    shade: { left: "26 26 25", right: "26 26 25" },
    media: {
      kind: "video",
      src: "/hero/sensor-tap-pour.mp4",
      poster: {
        src: "/hero/sensor-tap-pour-poster.webp",
        alt: "Chrome sensor tap above a marble basin",
        width: 1284,
        height: 716,
      },
      description: "A chrome sensor tap starts pouring water into a marble basin in a grey stone washroom",
      duration: 5,
      focus: "50% 50%",
      mobileFocus: "52% 50%",
    },
  },
  {
    id: "flush-controls",
    label: "Flush controls",
    heading: "Flush plates that sense when you leave",
    cta: { label: "View Toilet Flush", href: "/products/automatic-toilet-flush" },
    tone: "dark",
    headerTone: "light",
    shade: { left: "32 25 19", right: "31 25 20" },
    media: {
      kind: "photo",
      image: {
        src: "/hero/wall-hung-toilet-marble.png",
        alt: "Round black touch-free flush plate above a white wall-hung WC on cream marble tiles, beside a glass walk-in shower",
        width: 1672,
        height: 941,
      },
      focus: "50% 50%",
      mobileFocus: "62% 50%",
    },
  },
];
