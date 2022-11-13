import express, { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import Router from './Routers/Index'

const application = express()

const port = 3030
application.use('/API', Router)

application.get('/', (req: Request, res: Response): void => {
  res.status(200).send('the server initilize correct')
})

//Check the folder of resize image is created or not
application.listen(port, (): void => {
  const CreateFolderOfImageResize = path.resolve(__dirname, '../Images/Thumbs')
  if (fs.existsSync(CreateFolderOfImageResize) === true) {
    console.log('Folder Thumbs is exist')
  } else {
    fs.mkdirSync(CreateFolderOfImageResize)
  }

  console.log(`server Running on port ${port}`)
})
export default application
