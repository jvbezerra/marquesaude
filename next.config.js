module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    config.optimization.splitChunks = {
      chunks: 'all',
    };

    config.optimization.splitChunks.cacheGroups = {
      userArea: {
        test: /[\\/]src[\\/]containers[\\/]UserArea[\\/]/,
        priority: 10
      },
      appointmentArea: {
        test: /[\\/]src[\\/]containers[\\/]AppointmentArea[\\/]/,
        priority: 10
      },
    }

    return config
  },
}
