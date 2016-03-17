import express from 'express'
import { server as ddServer } from 'strictduck-domain-driven-fullstack'
import domainMiddlewareGenerator from './domainMiddlewareGenerator'

export default ddServer.implement({
    name: 'DomainDrivenExpress',
    constructor({
        server, Domain,
        middlewareGenerators=[domainMiddlewareGenerator]
    }){
        server = server || express()
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
        return [server.generateMiddleware(Domain)]
    },
    provider({ port=3000, Domain }){
        if(Domain){ this.generateMiddleware(Domain) }
        this.listen(port, error => {
            if (error) {
                console.error(error)
            } else {
                console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
            }
        })
    }
})
