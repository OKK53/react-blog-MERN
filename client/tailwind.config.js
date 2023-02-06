module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      josefin: ["Josefin Sans", "sans-serif"],
      lora: ["Lora", "serif"],
      varela: ["Varela", "sans-serif"],
      varelaround: ["Varela Round", "sans-serif"],
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
