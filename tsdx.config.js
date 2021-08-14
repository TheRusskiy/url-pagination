module.exports = {
  rollup(config, opts) {
    if (opts.format === 'esm') {
      config = { ...config, preserveModules: true }
      config.output = { ...config.output, dir: __dirname + '/dist/', entryFileNames: '[name].esm.js' }
      delete config.output.file
    }
    return config
  },
}
