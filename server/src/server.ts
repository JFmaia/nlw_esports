import express, { json, request, response } from 'express'

const app = express()

//HTTP methods / API RESTful / HTTP Codes

// GET, POST, PUT, PATCH, DELETE

/**
 * Query: Usado para manter estado.
 * Route: Acessar algo especifico
 * Body: Usado apra cadastro de multiplas campos e senhas
 */

// rota para listagem de games
app.get('/games', (request, response) => {
    return response.json([]);
})

// criar anúncio
app.post('/ads', (request, response) => {
    return response.status(201).json([]);
})

//listamento de anúncio por game
app.get('/games/:id/ads', (request, response) => {
    // const gameId = request.params.id;

    return response.json([
        {id:1, name:'Anuncio 1'},
        {id:2, name:'Anuncio 2'},
        {id:3, name:'Anuncio 3'},
        {id:4, name:'Anuncio 4'},
    ])
})

//buscar discord por id do anúncio
app.get('/ads/:id/discord', (request, response) => {
    // const adId = request.params.id;

    return response.json([]);
})

app.listen(3333)