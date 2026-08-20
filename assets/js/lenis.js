import Lenis from "../../node_modules/lenis/dist/lenis.mjs";

const lenis = new Lenis({
    duration: 2.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);

    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
