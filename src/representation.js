import { server as ddServer } from 'strictduck-domain-driven-fullstack'

export default ddServer.implement({
    name: 'DomainDrivenExpress',
    constructor({ Domains: domains, middlewareGenerators=[], server={} }){
        server._domains = server._domains || {}
        server.generateMiddleware = (domains) => server
        server.generateMiddleware.bind(server)(domains)
        return [server]
    },
    provider(){ return this }
})
