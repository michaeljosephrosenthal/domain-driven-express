import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import nodeExternals from 'webpack-node-externals'

const devConfig = _ => (
    process.env.NODE_ENV !== 'production' ? 
         {devtool: 'source-map', debug: true} :
         {}
    )

module.exports = function({server, out, root}){
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
        extensions: ['', '.js', '.jsx']
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: [ 'babel-loader?{presets:["react","es2015","stage-0"],plugins:["transform-export-extensions"],env:{development:{presets:["react-hmre"]}, production: {plugins:["transform-react-remove-prop-types","transform-react-constant-elements","transform-react-inline-elements"]}}}' ],
            exclude: /node_modules/,
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
