import express from 'express'
import domainMiddlewareGenerator from './domainMiddlewareGenerator'

export default function Application({ app, domains,
    middlewareGenerators=[domainMiddlewareGenerator]
}) {
    app = app || new express()
    middlewareGenerators.forEach(
        generator => Object.values(generator(domains)).forEach(
            middleware => app.use(middleware)
        )
    )
    return app
}
