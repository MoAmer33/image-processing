import express from 'express'
import ImagesFolder from './API/RouterImages'

const Routing = express.Router()

Routing.use('/ImagesInFolder', ImagesFolder)

export default Routing
