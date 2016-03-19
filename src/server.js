import express from 'express'
import { server as ddServer } from 'strictduck-domain-driven-fullstack'
import domainMiddlewareGenerator from './domainMiddlewareGenerator'
import getPrototypeChain from 'get-prototype-chain'

export default ddServer.implement({
    name: 'DomainDrivenExpress',
    constructor({
        Domains: domains,
        middlewareGenerators=[domainMiddlewareGenerator],
        server=express(), ...rest
    }){
        server._domains = server._domains || {}
        server.generateMiddleware = domains => {
            middlewareGenerators.forEach(
                generator => generator(domains).forEach(
                    middleware => server.use(middleware)
                )
            )
            Object.assign(server._domains, domains)
            return server
        }
        return [server.generateMiddleware(domains)]
    },
    provider({ port=3000, domains }){
        if(domains){ this.generateMiddleware(domains) }
        this.listen(port, error => {
            if (error) {
                console.error(error)
            } else {
                console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
            }
        })
    }
})
