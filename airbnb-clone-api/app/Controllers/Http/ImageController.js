'use strict'

const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {

  static get inject() {
    return [
      'App/Services/ImageService',
    ]
  }

  constructor(imageService) {
    this.imageService = imageService;
  }
  /**
   * Create/save a new image.
   * POST images
   */
  async store({ params, request }) {

    const images = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    await this.imageService.create(images, params.id);
  }

  async show({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }
}

module.exports = ImageController
