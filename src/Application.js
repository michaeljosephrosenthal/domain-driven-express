import express from 'express'
import domainMiddlewareGenerator from './domainMiddlewareGenerator'

var app = new express()

export default function Application({app=app, domains}) {
    Object.values(domainMiddlewareGenerator(domains)).forEach(
        middleware => app.use(middleware)
    )
    return app
}
