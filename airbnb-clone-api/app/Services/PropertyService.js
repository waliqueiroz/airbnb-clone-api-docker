'use strict'

const Property = use("App/Models/Property");

class PropertyService {
  async all(latitude, longitude) {

    const properties = await Property.query().with('images')
      .nearBy(latitude, longitude, 10)
      .fetch()

    return properties;
  }

  async getById(id) {
    const property = await Property.findOrFail(id)

    await property.load('images')

    return property
  }

  async create(data) {
    const property = await Property.create(data)

    return property
  }

  async update(id, data) {
    const property = await Property.findOrFail(id)

    property.merge(data)

    await property.save()

    return property
  }
}

module.exports = PropertyService;
