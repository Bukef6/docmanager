export const VARIANTS = {
  default: "bg-gray-200 text-gray-800",
  cyan: "bg-cyan-100 text-cyan-800",
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
};

export const VARIANT_KEYS = Object.keys(VARIANTS).filter(
  (v) => v !== "default"
);
