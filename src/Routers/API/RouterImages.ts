import express, { Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'
import { Stats } from 'fs'
import ImageHelper from '../../HelperOfImage/ImageHelper'

const RoutingOfImage = express.Router()

RoutingOfImage.get('/', async (req: Request, res: Response): Promise<void> => {
  //get the data of image
  let Heigth = NaN
  let Width = NaN
  const FileNameImage = req.query['filename']
  if (req.query['height']) Heigth = parseInt(req.query['height'] as string, 10)
  if (req.query['width']) Width = parseInt(req.query['width'] as string, 10)

  if (FileNameImage && Heigth && Number(req.query['width']) && Number(req.query['height'])) {
    // Get path of image in full
    const TheFullPathImage = `${path.resolve(
      __dirname,
      `../../../Images/Full/${FileNameImage}.jpg`
    )}`

    // save image with this format
    const TheThumbsPathImage = `${path.resolve(
      __dirname,
      `../../../Images/Thumbs/${FileNameImage}-${Heigth}x${Width}.jpg`
    )}`

    //check image exist or not
    const ImageOfFull: Stats | null = await fs.stat(TheFullPathImage).catch(() => {
      res.status(400).send('Error the image not found')
      return null
    })
    if (!ImageOfFull) return
    //check if image founded in Thumbs folder
    const ImageOfThumbs: Stats | null = await fs.stat(TheThumbsPathImage).catch(() => {
      return null
    })

    //Here make resize of image
    if (!ImageOfThumbs) {
      ImageHelper.ResizeTheImage({ TheFullPathImage, Heigth, TheThumbsPathImage, Width })
        .then((ResizedImage: Buffer) => {
          res.status(200).contentType('jpg').send(ResizedImage)
        })
        .catch(() => {
          res.status(500).send('Error in Loading Image')
        })
    } else {
      //I read image data from file and check if there error handle it
      fs.readFile(TheThumbsPathImage)
        .then((ExistData: Buffer) => {
          res.status(200).contentType('jpg').send(ExistData)
        })
        .catch(() => {
          res.status(500).send('The Exist data have been failed')
        })
    }
  } else {
    res.status(400).send('Error Check the url')
    return
  }
})

export default RoutingOfImage
