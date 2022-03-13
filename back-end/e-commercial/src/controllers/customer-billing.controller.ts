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
import {Customerbilling} from '../models';
import {CustomerbillingRepository} from '../repositories';

export class CustomerBillingController {
  constructor(
    @repository(CustomerbillingRepository)
    public customerbillingRepository : CustomerbillingRepository,
  ) {}

  @post('/customerbillings')
  @response(200, {
    description: 'Customerbilling model instance',
    content: {'application/json': {schema: getModelSchemaRef(Customerbilling)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerbilling, {
            title: 'NewCustomerbilling',
            
          }),
        },
      },
    })
    customerbilling: Customerbilling,
  ): Promise<Customerbilling> {
    return this.customerbillingRepository.create(customerbilling);
  }

  @get('/customerbillings/count')
  @response(200, {
    description: 'Customerbilling model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Customerbilling) where?: Where<Customerbilling>,
  ): Promise<Count> {
    return this.customerbillingRepository.count(where);
  }

  @get('/customerbillings')
  @response(200, {
    description: 'Array of Customerbilling model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Customerbilling, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Customerbilling) filter?: Filter<Customerbilling>,
  ): Promise<Customerbilling[]> {
    return this.customerbillingRepository.find(filter);
  }

  @patch('/customerbillings')
  @response(200, {
    description: 'Customerbilling PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerbilling, {partial: true}),
        },
      },
    })
    customerbilling: Customerbilling,
    @param.where(Customerbilling) where?: Where<Customerbilling>,
  ): Promise<Count> {
    return this.customerbillingRepository.updateAll(customerbilling, where);
  }

  @get('/customerbillings/{id}')
  @response(200, {
    description: 'Customerbilling model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Customerbilling, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Customerbilling, {exclude: 'where'}) filter?: FilterExcludingWhere<Customerbilling>
  ): Promise<Customerbilling> {
    return this.customerbillingRepository.findById(id, filter);
  }

  @patch('/customerbillings/{id}')
  @response(204, {
    description: 'Customerbilling PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerbilling, {partial: true}),
        },
      },
    })
    customerbilling: Customerbilling,
  ): Promise<void> {
    await this.customerbillingRepository.updateById(id, customerbilling);
  }

  @put('/customerbillings/{id}')
  @response(204, {
    description: 'Customerbilling PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() customerbilling: Customerbilling,
  ): Promise<void> {
    await this.customerbillingRepository.replaceById(id, customerbilling);
  }

  @del('/customerbillings/{id}')
  @response(204, {
    description: 'Customerbilling DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.customerbillingRepository.deleteById(id);
  }
}
