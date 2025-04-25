
import { env } from 'process'

import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import path from 'path'
const fastify = Fastify()

fastify.register(import('./plugins/prisma'))
fastify.register(import('./routes/index'), {
  prefix: '/api',
})

fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  
})
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'uploads'),
    prefix: '/uploads/',
  });
fastify.listen({ host: '0.0.0.0', port: parseInt(env.PORT || '3002') }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(fastify.printRoutes() )
  console.log(`fastify listening at ${address}`)
})