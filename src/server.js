import express from 'express'
import { server as ddServer } from 'strictduck-domain-drivers'
import domainMiddlewareGenerator from './domainMiddlewareGenerator'

export default ddServer.implement({
    name: 'ExpressDomainDriver',
    constructor({
        server, Domains,
        middlewareGenerators=[domainMiddlewareGenerator]
    }){
        server = server || new express()
        server._domains = server._domains || {}
        server.generateMiddleware = function(domains){
            middlewareGenerators.forEach(
                generator => Object.values(generator(domains)).forEach(
                    middleware => server.use(middleware)
                )
            )
            Object.assign(server._domains, domains)
            return server
        }
        return server.generateMiddleware(Domains)
    },
    provider({
        port=3000,
        Domains
    }){
        if(Domains){ this.generateMiddleware(Domains) }
        this.listen(port, function(error) {
            if (error) {
                console.error(error)
            } else {
                console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
            }
        })
    }
})
