const server = ($ES.CONTEXT == 'NODE' ? require('./server') : require('./representation')).default
export default server
