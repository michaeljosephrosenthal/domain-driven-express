import express from 'express'

function filterDomainsForType(domains, type){
    return Object.keys(domains)
        .map(k => domains[k])
        .filter(domain => Object.keys(domain.get(type)).length)
}

function routeBuilder(router, routes, prefix='') {
  Object.keys(routes).forEach(endpoint => {
     var {methods, handlers} = routes[endpoint];
     methods.forEach(method => {
       router[method](prefix+endpoint, ...handlers);
     });
  });
  return router;
};

function domainRoutes({prefix, routes}){
    return routeBuilder(express.Router(), routes, `/${prefix}`)
}


function genericMiddlewareFlattener(domains){
    return filterDomainsForType(domains, 'middleware')
        .reduce((list, domain) => [...list, ...domain.get('middleware')], [])
        .filter(middleware => typeof(middleware) == 'function')
}

export function domainRouteMiddlewareGenerator(domains){
    return filterDomainsForType(domains, 'routes').map(domainRoutes)
}

export function genericDomainMiddlewareGenerator(domains){
    return genericMiddlewareFlattener(domains)
}
