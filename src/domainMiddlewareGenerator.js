import express from 'express'

function filterDomainsForType(domains, type){
    return Object.keys(domains)
        .map(k => domains[k])
        .filter(domain => Object.keys(domain.get(type)).length)
}

function routeBuilder({router, routes, order, prefix=''}) {
  let keys = order || Object.keys(routes)
  keys.forEach(endpoint => {
     var {methods, handlers} = routes[endpoint];
     methods.forEach(method => {
       router[method](prefix+endpoint, ...handlers);
     });
  });
  return router;
};

function domainRoutes({prefix, routes, order}){
    return routeBuilder({router: express.Router(), routes, order, prefix: `/${prefix}`})
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
