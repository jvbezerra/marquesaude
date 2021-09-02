module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.optimization.splitChunks = {
      chunks: 'all',
    };

    return config
  },
}
