var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var XRegExp = require('xregexp');

module.exports = function(options){
    var server     = options.server,
        out        = options.out,
        es6Modules = options.es6Modules;
    process.chdir(process.env.PWD)
    var pwd = './'
    var config =  {
      externals: [ nodeExternals({ whitelist: ["webpack/hot/poll?1000"] }) ],
      plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin()
      ],
      target: 'node',
      debug: true,
      cache:   false,
      node: {
        __dirname: true,
        __filename: true
      },
      context: path.resolve(pwd),
      resolve: {
        moduleDirectories: ["src", "node_modules"],
        extensions: ['', '.json', '.js', '.jsx']
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: [ 'babel-loader?{presets:["es2015","stage-0"]}' ],
            exclude: XRegExp('/node_modules\/(?!' + es6Modules + ')/'),
          },
          {
              test: /\.json$/, loader: 'json'
          }
        ],
      },
      entry: [ "webpack/hot/poll?1000", server ],
      output: {
        path: path.dirname(out),
        filename: path.basename(out),
      },
    }
    if (process.env.NODE_ENV !== 'production'){
        config.devtool = 'source-map'
        config.debug = true
    }
    return config
}
