/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Extraído fielmente do logótipo Carpintaria Marinheiro
        brand: {
          orange:       '#C4521A',  // laranja terracota "MARINHEIRO"
          'orange-dark':'#A03F10',  // hover / sombra
          'orange-light':'#D9703A', // highlight
          charcoal:     '#2D2D2D',  // antracite do texto "CARPINTARIA" e serra
          dark:         '#1A1A1A',  // preto profundo
          white:        '#FFFFFF',
          offwhite:     '#F5F3EF',  // fundo quente
          beige:        '#EAE6DF',  // secções alternadas
          sand:         '#D5CFC5',  // bordas, separadores
          gray:         '#6B6B6B',  // texto secundário
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'Helvetica Neue', 'sans-serif'],
      },
      maxWidth: { '8xl': '88rem' },
      letterSpacing: { brand: '0.15em' },
      transitionDuration: { '400': '400ms', '600': '600ms' },
    },
  },
  plugins: [],
}
