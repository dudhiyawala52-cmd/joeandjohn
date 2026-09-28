"use client";

import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, useGSAP);

export { gsap, Observer, ScrollTrigger, useGSAP };
