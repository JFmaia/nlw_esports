import express, { json, request, response } from 'express'
import {PrismaClient} from '@prisma/client'

const app = express()
const prisma = new PrismaClient({
    log:['query']
})

//HTTP methods / API RESTful / HTTP Codes

// GET, POST, PUT, PATCH, DELETE

/**
 * Query: Usado para manter estado.
 * Route: Acessar algo especifico
 * Body: Usado apra cadastro de multiplas campos e senhas
 */

// rota para listagem de games
app.get('/games', async(request, response) => {
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    ads: true,
                }
            }
        }
    })

    return response.json(games);
})

// criar anúncio
app.post('/ads', (request, response) => {
    return response.status(201).json([]);
})

//listamento de anúncio por game
app.get('/games/:id/ads', async(request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id:true,
            name:true,
            weekDays: true,
            userVoiceChannel:true,
            yearsPlaying:true,
            hourStart: true,
            hourEnd: true,
        },
        where:{
            gameId,
        },
        orderBy:{
            createAt:'desc'
        }
    })

    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(',')
        }
    }))
})

//buscar discord por id do anúncio
app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true,
        },
        where:{
            id: adId,
        }
    })
    
    return response.json({
        discord: ad.discord,
    });
})

app.listen(3333)