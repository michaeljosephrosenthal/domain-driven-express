import express from 'express'
import { server as ddServer } from 'strictduck-domain-driven-fullstack'
import { genericDomainMiddlewareGenerator, domainRouteMiddlewareGenerator } from './domainMiddlewareGenerator'
import getPrototypeChain from 'get-prototype-chain'

export default ddServer.implement({
    name: 'DomainDrivenExpress',
    constructor({
        Domains: domains,
        middlewareGenerators=[ genericDomainMiddlewareGenerator, domainRouteMiddlewareGenerator ],
        server=express()
    }){
        server._domains = server._domains || {}
        server.generateMiddleware = function(domains){
            middlewareGenerators.forEach(
                generator => generator(domains).forEach(
                    middleware => this.use(middleware)
                )
            )
            Object.assign(this._domains, domains)
        }
        server.generateMiddleware.bind(server)(domains)
        return [server]
    },
    provider({ port=3000, DomainDrivenClient: client }){
        if(client){
            this.generateMiddleware.bind(this)({'': client.provide()})
        }

        let app = express()
        app.use(this)
        app.listen(port, error => {
            if (error) {
                console.error(error)
            } else {
                console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
            }
        })
    }
})
