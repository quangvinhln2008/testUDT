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
import {Customerbillingdetail} from '../models';
import {CustomerbillingdetailRepository} from '../repositories';

export class CustomerBillingDetailController {
  constructor(
    @repository(CustomerbillingdetailRepository)
    public customerbillingdetailRepository : CustomerbillingdetailRepository,
  ) {}

  @post('/customerbillingdetails')
  @response(200, {
    description: 'Customerbillingdetail model instance',
    content: {'application/json': {schema: getModelSchemaRef(Customerbillingdetail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerbillingdetail, {
            title: 'NewCustomerbillingdetail',
            
          }),
        },
      },
    })
    customerbillingdetail: Customerbillingdetail,
  ): Promise<Customerbillingdetail> {
    return this.customerbillingdetailRepository.create(customerbillingdetail);
  }

  @get('/customerbillingdetails/count')
  @response(200, {
    description: 'Customerbillingdetail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Customerbillingdetail) where?: Where<Customerbillingdetail>,
  ): Promise<Count> {
    return this.customerbillingdetailRepository.count(where);
  }

  @get('/customerbillingdetails')
  @response(200, {
    description: 'Array of Customerbillingdetail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Customerbillingdetail, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Customerbillingdetail) filter?: Filter<Customerbillingdetail>,
  ): Promise<Customerbillingdetail[]> {
    return this.customerbillingdetailRepository.find(filter);
  }

  @patch('/customerbillingdetails')
  @response(200, {
    description: 'Customerbillingdetail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerbillingdetail, {partial: true}),
        },
      },
    })
    customerbillingdetail: Customerbillingdetail,
    @param.where(Customerbillingdetail) where?: Where<Customerbillingdetail>,
  ): Promise<Count> {
    return this.customerbillingdetailRepository.updateAll(customerbillingdetail, where);
  }

  @get('/customerbillingdetails/{id}')
  @response(200, {
    description: 'Customerbillingdetail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Customerbillingdetail, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Customerbillingdetail, {exclude: 'where'}) filter?: FilterExcludingWhere<Customerbillingdetail>
  ): Promise<Customerbillingdetail> {
    return this.customerbillingdetailRepository.findById(id, filter);
  }

  @patch('/customerbillingdetails/{id}')
  @response(204, {
    description: 'Customerbillingdetail PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerbillingdetail, {partial: true}),
        },
      },
    })
    customerbillingdetail: Customerbillingdetail,
  ): Promise<void> {
    await this.customerbillingdetailRepository.updateById(id, customerbillingdetail);
  }

  @put('/customerbillingdetails/{id}')
  @response(204, {
    description: 'Customerbillingdetail PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() customerbillingdetail: Customerbillingdetail,
  ): Promise<void> {
    await this.customerbillingdetailRepository.replaceById(id, customerbillingdetail);
  }

  @del('/customerbillingdetails/{id}')
  @response(204, {
    description: 'Customerbillingdetail DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.customerbillingdetailRepository.deleteById(id);
  }
}
