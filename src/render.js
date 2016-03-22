import createHistory from 'history/lib/createMemoryHistory';
import {Server} from "hapi"
import React from "react"
import { renderToString } from 'react-dom/server'
import Router from "react-router";
import Main from "../Main"
import url from "url"
import nodemailer from "nodemailer"
import {routes} from "../Routes";

const defaultTemplate = ({title, client, serverUrl}) => `\
    <!doctype html>\
    <html lang="en">\
        <head>\
            <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />\
            <meta charset="UTF-8">\
            <title>${title}</title>\
            <link rel="icon" type="image/png" href="/assets/logo2.png" />\
            <link href='http://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet' type='text/css'>\
        </head>\
        <body>\
            <div id="react-root">${string}</div>\
        </body>\
        <script type="text/javascript" src="${serverUrl}/dist/client.js"></script>\
    </html>\
`

export function render({template = defaultTemplate, client}){
server.ext("onPreResponse", (request, reply) => {
	if (typeof request.response.statusCode !== "undefined") {
		return reply.continue();
	}

    try {
        const history = createHistory()
        const location = history.createLocation(request.url)
        let reactString = renderToString(
            <Main>
                <Router location={location} history={history} routes={routes} />
            </Main>
        )
        reply(
            
        );
    } catch(error) {
        reply(error.stack).type("text/plain").code(500);
    }
});

}
