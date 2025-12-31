/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust this to your file paths
  theme: {
    extend: {},
  },
  safelist: [
    // --- Layout & Container ---
    "max-w-4xl",
    "mx-auto",
    "w-full",
    "block",
    "inline-block",
    "flex",
    "flex-col",
    "items-center",
    "items-start",
    "justify-center",
    "justify-between",
    "flex-shrink-0",
    "gap-2",
    "gap-4",
    "gap-6",
    
    // --- Spacing (Vertical Flow) ---
    "space-y-2",
    "space-y-4",
    "space-y-6",
    "space-y-8",
    "space-y-12",
    "space-y-16",
    
    // --- Margins (Common for AI output) ---
    "my-4", "my-6", "my-8", "my-10", "my-12", "my-20",
    "mt-4", "mt-6", "mt-8", "mt-10", "mt-12", "mt-16",
    "mb-2", "mb-4", "mb-6", "mb-8", "mb-10", "mb-12", "mb-16",
    "mr-2", "mr-4",
    
    // --- Padding ---
    "p-4", "p-6", "p-8", "p-10",
    "py-4", "py-6", "py-8", "py-10", "py-12",
    "px-4", "px-6", "px-8",
    "pl-0", "pl-4", "pl-5", "pl-6", "pl-8",
    "pb-4","pt-6",
    
    // --- Typography: Sizes ---
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    
    // --- Typography: Weights & Styles ---
    "font-normal",
    "font-medium",
    "font-semibold",
    "font-bold",
    "font-extrabold",
    "italic",
    "uppercase",
    "tracking-tight",
    "tracking-wide",
    "antialiased",
    "leading-tight",
    "leading-snug",
    "leading-relaxed",
    
    // --- Colors: Text (Based on your "Professional" palette) ---
    "text-slate-50", "text-slate-100", "text-slate-200", "text-slate-300", "text-slate-400", "text-slate-500", "text-slate-600", "text-slate-700", "text-slate-800", "text-slate-900",
    "text-gray-500", "text-gray-600", "text-gray-700", "text-gray-800", "text-gray-900",
    "text-blue-500", "text-blue-600", "text-blue-700", "text-blue-800", "text-blue-900",
    "text-emerald-500", "text-emerald-600", "text-emerald-700",
    "text-amber-600", "text-amber-700", "text-amber-800",
    "text-red-500", "text-red-600",
    "text-white",
    
    // --- Colors: Backgrounds (Callout boxes) ---
    "bg-white",
    "bg-slate-50", "bg-slate-100",
    "bg-blue-50", "bg-blue-100",
    "bg-emerald-50", "bg-emerald-100",
    "bg-amber-50", "bg-amber-100",
    "bg-gray-50", "bg-gray-100",
    
    // --- Borders & Rounded Corners ---
    "border",
    "border-b",
    "border-t",
    "border-l-2",
    "border-l-4",
    "border-slate-200", "border-slate-300",
    "border-blue-200", "border-blue-500",
    "border-emerald-100", "border-emerald-500",
    "border-amber-200", "border-amber-500",
    "rounded",
    "rounded-md",
    "rounded-lg",
    "rounded-xl",
    "rounded-2xl",
    "rounded-r-xl", // Specific for your "Pro Tip" box
    
    // --- Lists ---
    "list-none",
    "list-disc",
    "list-decimal",
    
    // --- Shadows ---
    "shadow-sm",
    "shadow",
    "shadow-md",
    "shadow-lg",
    
    // --- Icons (SVG sizing) ---
    "w-4", "h-4",
    "w-5", "h-5",
    "w-6", "h-6",
    
    // --- Images ---
    "object-cover",
    "max-w-full",
    "h-auto",
  ],
  plugins: [
    require("@tailwindcss/typography"),
  ],
};