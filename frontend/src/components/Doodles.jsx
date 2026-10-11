const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
const mk = (paths, filled = false) => ({ className = "" }) => (
  <svg viewBox="0 0 24 24" {...S} fill={filled ? "currentColor" : "none"} className={className} aria-hidden="true">
    {paths.map((d, i) => <path key={i} d={d} />)}
  </svg>
);

export const DoodleStar = mk(["M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"]);
export const DoodleBolt = mk(["M13 2L4 14h7l-2 8 11-12h-7l2-8z"]);
export const DoodleCrown = mk(["M3 18L5 8l5 5 2-7 2 7 5-5 2 10z"]);
export const DoodleSquiggle = mk(["M2 14c3-6 6-6 9 0s6 6 9 0"]);
export const DoodleZigzag = mk(["M2 8l5 5 5-5 5 5 5-5"]);
export const DoodleArrow = mk(["M4 4c7 1 13 7 16 15", "M20 13v6h-6"]);
export const DoodleHeart = mk(["M12 21C7 16.5 3 13.2 3 9.3 3 6.4 5.2 4 8 4c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.8 0 5 2.4 5 5.3 0 3.9-4 7.2-9 11.7z"], true);
