// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      // Only modify the client-side bundle
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false, // fs is not available in the browser
          stream: require.resolve("stream-browserify"),
          zlib: require.resolve("browserify-zlib"),
        };
      }
      return config;
    },
  };
  