module.exports = {
  entryHTML: 'index.html',
  entryFile: 'src/index.jsx',
  assetsDir: 'assets',
  outputDir: 'dist',
  outputHTML: 'index.html',
  outputJS: 'app.js',
  outputCSS: 'style.css',
  sassOptions: {
    includePaths: ['src/styleUtils'],
  },
  cssOptions: {
    modules: true,
    importLoaders: 1,
    localIdentName: '[path][local]',
    url: false,
    minimize: true,
  },
};
