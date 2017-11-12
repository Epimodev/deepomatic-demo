module.exports = {
  entryHTML: 'index.html',
  entryFile: 'src/index.jsx',
  assetsDir: 'assets',
  outputDir: 'dist',
  outputHTML: 'index.html',
  outputJS: 'app_[hash:5].js',
  outputCSS: 'style_[contenthash:5].css',
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
