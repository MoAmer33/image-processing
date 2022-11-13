import sharp from 'sharp'
import fs from 'fs/promises'

interface ImageResize {
  TheFullPathImage: string
  Heigth: number
  TheThumbsPathImage: string
  Width: number
}

//This function handel the image resize and put this image in Thumbs File
const ResizeTheImage = async ({
  TheFullPathImage,
  Heigth,
  TheThumbsPathImage,
  Width
}: ImageResize): Promise<Buffer> => {
  const TheRetrivelData: Buffer | null = await fs.readFile(TheFullPathImage).catch(() => null)

  if (TheRetrivelData) {
    const ImageWithSharp: Buffer | null = await sharp(TheRetrivelData)
      .resize(Width, Heigth)
      .toBuffer()
      .catch(() => null)

    if (ImageWithSharp) {
      return fs
        .writeFile(TheThumbsPathImage, ImageWithSharp)
        .then(() => {
          return ImageWithSharp
        })
        .catch(() => {
          return Promise.reject()
        })
    } else {
      return Promise.reject()
    }
  } else {
    return Promise.reject()
  }
}
export default { ResizeTheImage }
