/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // or .pug, .handlebars depending on your template engine
    './public/**/*.html',
  ],
  theme: {
    extend: {
      boxShadow: {
        'text': '0 0 1px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

