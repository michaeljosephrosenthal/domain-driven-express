import { server as ddServer } from 'strictduck-domain-driven-fullstack'

export default ddServer.implement({
    name: 'DomainDrivenExpress',
    constructor({ Domains: domains, middlewareGenerators=[], server={} }){
        server._domains = server._domains || {}
        server.generateMiddleware = function(domains) { return this }
        server.generateMiddleware.bind(server)(domains)
        server.use = function() { return Error("express requires a node context") }
        server.listen = function() { return Error("express requires a node context") }
        return [server]
    },
    provider(){ return this }
})
