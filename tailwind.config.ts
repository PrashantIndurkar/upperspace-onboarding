/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#e7f160",
        overlay: "rgba(0,0,0,0.5)",
        overlayLight: "rgba(0,0,0,0.4)",
        icon: "#171717",
        iconMuted: "#525252",
      },
    },
  },
  plugins: [],
};
