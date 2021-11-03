module.exports = (options, webpack) => {
  const lazyImports = new Set([
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    'class-transformer/storage',
    'fastify-swagger',
  ]);

  return {
    ...options,
    externals: [],
    // mode: 'production',
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.has(resource)) {
            try {
              require.resolve(resource);
            } catch {
              return true;
            }
          }
          return false;
        },
      }),
    ],
  };
};
