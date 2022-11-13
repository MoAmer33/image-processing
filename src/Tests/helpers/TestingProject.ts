import ImageHelper from '../../HelperOfImage/ImageHelper'
import req from 'supertest'
import fs from 'fs/promises'
import path from 'path'
import Application from '../../index'
import { Stats } from 'fs'

//Direction of Images
const TheThumbsPathImage = path.resolve(__dirname, '../../../Images/Thumbs/encenadaport.jpg')


const TheFullPathImage = path.resolve(__dirname, '../../../Images/Full/encenadaport.jpg')

//Resizing Image
describe('Resizing Image', (): void => {
  //Error in Resizing Images
  it('Error In resizing', async (): Promise<void> => {
    await expectAsync(
      ImageHelper.ResizeTheImage({
        TheFullPathImage: '',
        Heigth: 200,
        Width: 600,
        TheThumbsPathImage
      })
    ).toBeRejected()
  })
})
describe('GET/API/ImagesInFolder', () => {
  //check if there are not parameters
  it('Error when there are not parameters', (good): void => {
    req(Application).get('/API/ImagesInFolder').expect(400, good)
  })
  //check if there is not one parameters
  it('Error when there is not one parameters', (good): void => {
    req(Application).get('/API/ImagesInFolder?filename=hello&height=300').expect(400, good)
  })
  //check if there is not images
  it('when the path correctly and image exist', (good): void => {
    req(Application)
      .get('/API/ImagesInFolder?filename=palmtunnel&height=200&width=500')
      .expect(200, good)
  })
  //check if the image exist in the file Thumbs
  it('created a thumb version of the image', (good): void => {
    req(Application)
      .get('/API/ImagesInFolder?filename=palmtunnel&height=300&width=600')
      .then(() => {
        fs.stat(path.resolve(__dirname, '../../../Images/Thumbs/palmtunnel-300x600.jpg')).then(
          (MyFile: Stats) => {
            expect(MyFile).not.toBeNull()
          }
        )
        good()
      })
  })
})
