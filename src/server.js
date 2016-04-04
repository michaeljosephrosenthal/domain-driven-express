import { resolve } from 'strictduck'
import express from 'express'
import { server as ddServer, storePersistencePlugin } from 'strictduck-domain-driven-fullstack'
import { genericDomainMiddlewareGenerator, domainRouteMiddlewareGenerator } from './domainMiddlewareGenerator'

export default ddServer.implement({
    name: 'DomainDrivenExpress',
    constructor({
        Domains: domains,
        DomainDrivenStorePersistencePlugin : persister,
        middlewareGenerators=[ genericDomainMiddlewareGenerator, domainRouteMiddlewareGenerator ],
        server=express(),
        container,
    }){
        if(!(persister instanceof Error)){
            persister.provide(domains)
            domains = persister.provideInjectionForDomainRouteHandlers(domains)
        }

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
