import routeBuilder from 'express-routebuilder'
import express from 'express'


function domainRoutes({prefix, routes}){
    return routeBuilder(express.Router(), routes, `/${prefix}`)
}
export function domainMiddlewareGenerator(domains){
    return Object.values(domains)
        .filter(domain => domain.routes)
        .map(domainRoutes)
}
