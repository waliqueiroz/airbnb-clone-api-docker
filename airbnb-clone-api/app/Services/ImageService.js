'use strict'

const Image = use('App/Models/Image')
const Helpers = use('Helpers')

class ImageService {

  async create(images, id) {

    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))

    if (!images.movedAll()) {
      return images.errors()
    }

    await Promise.all(
      images
        .movedList()
        .map(img => Image.create({ path: img.fileName, property_id: id }))
    )

  }

}

module.exports = ImageService;
