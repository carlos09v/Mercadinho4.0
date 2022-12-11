/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    // Arquivos estilizados
    './src/**/*.tsx'
  ],
  theme: {
    // colors: {
    //   'main': {
    //     light: '#f0f8ff70',
    //     dark: 'black/[.65]'
    //   } 
    // },
    screens: {
      /* Responsivity - Max-width Breackpoints */
      'logo2': {'max': '1076px'},
      'logo1': {'max': '561px'},
      'headerHomeLinks2': {'max': '880px'},
      'headerHomeLinks3': {'max': '414px'},
    },
    extend: {},
  },
  plugins: [],
}
