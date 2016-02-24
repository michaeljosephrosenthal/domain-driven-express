import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import XRegExp from 'xregexp'


const devConfig = _ => (
    process.env.NODE_ENV !== 'production' ? 
         {devtool: 'source-map', debug: true} :
         {}
    )

module.exports = function({server, out, es6Modules}){
    process.chdir(process.env.PWD)
    var pwd = './'
    return {
      ...devConfig(),
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
            exclude: XRegExp(`/node_modules\/(?!${es6Modules})/`),
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
}
