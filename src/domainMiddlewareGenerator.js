import express from 'express'

function routeBuilder(router, routes, prefix='') {
  Object.keys(routes).forEach(endpoint => {
     var {methods, handlers} = routes[endpoint];
     methods.forEach(method => {
       router[method].call(router, prefix+endpoint, ...handlers);
     });
  });
  return router;
};

function domainRoutes({prefix, routes}){
    return routeBuilder(express.Router(), routes, `/${prefix}`)
}
export default function domainMiddlewareGenerator(domains){
    return Object.values(domains)
        .filter(domain => domain.routes)
        .map(domainRoutes)
}
