import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Cartdetail} from '../models';
import {CartdetailRepository} from '../repositories';

export class CartDetailController {
  constructor(
    @repository(CartdetailRepository)
    public cartdetailRepository : CartdetailRepository,
  ) {}

  @post('/cartdetails')
  @response(200, {
    description: 'Cartdetail model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cartdetail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cartdetail, {
            title: 'NewCartdetail',
            
          }),
        },
      },
    })
    cartdetail: Cartdetail,
  ): Promise<Cartdetail> {
    return this.cartdetailRepository.create(cartdetail);
  }

  @get('/cartdetails/count')
  @response(200, {
    description: 'Cartdetail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cartdetail) where?: Where<Cartdetail>,
  ): Promise<Count> {
    return this.cartdetailRepository.count(where);
  }

  @get('/cartdetails')
  @response(200, {
    description: 'Array of Cartdetail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cartdetail, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cartdetail) filter?: Filter<Cartdetail>,
  ): Promise<Cartdetail[]> {
    return this.cartdetailRepository.find(filter);
  }

  @patch('/cartdetails')
  @response(200, {
    description: 'Cartdetail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cartdetail, {partial: true}),
        },
      },
    })
    cartdetail: Cartdetail,
    @param.where(Cartdetail) where?: Where<Cartdetail>,
  ): Promise<Count> {
    return this.cartdetailRepository.updateAll(cartdetail, where);
  }

  @get('/cartdetails/{id}')
  @response(200, {
    description: 'Cartdetail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cartdetail, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cartdetail, {exclude: 'where'}) filter?: FilterExcludingWhere<Cartdetail>
  ): Promise<Cartdetail> {
    return this.cartdetailRepository.findById(id, filter);
  }

  @patch('/cartdetails/{id}')
  @response(204, {
    description: 'Cartdetail PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cartdetail, {partial: true}),
        },
      },
    })
    cartdetail: Cartdetail,
  ): Promise<void> {
    await this.cartdetailRepository.updateById(id, cartdetail);
  }

  @put('/cartdetails/{id}')
  @response(204, {
    description: 'Cartdetail PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cartdetail: Cartdetail,
  ): Promise<void> {
    await this.cartdetailRepository.replaceById(id, cartdetail);
  }

  @del('/cartdetails/{id}')
  @response(204, {
    description: 'Cartdetail DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cartdetailRepository.deleteById(id);
  }
}
