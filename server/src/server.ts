import express, { json, request, response } from 'express'
import {PrismaClient} from '@prisma/client'
import { convertHourToMin } from './utils/convert-hour-to-min'
import { convertMinutesToHours } from './utils/convert-minutes-to-hours'
import cors from 'cors'

const app = express()

app.use(express.json())

//define quais dominios podem fazer requisições para o sua API
app.use(cors())

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
app.post('/games/:id/ads', async(request, response) => {
    const gameId = request.params.id;
    const body:any = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourToMin(body.hourStart),
            hourEnd: convertHourToMin(body.hourEnd),
            userVoiceChannel: body.userVoiceChannel,
        }
    })
    return response.status(201).json(ad);
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
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHours(ad.hourStart),
            hourEnd: convertMinutesToHours(ad.hourEnd),
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