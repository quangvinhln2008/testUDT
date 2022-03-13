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
import {Agenybilling} from '../models';
import {AgenybillingRepository} from '../repositories';

export class AgencyBillingController {
  constructor(
    @repository(AgenybillingRepository)
    public agenybillingRepository : AgenybillingRepository,
  ) {}

  @post('/agenybillings')
  @response(200, {
    description: 'Agenybilling model instance',
    content: {'application/json': {schema: getModelSchemaRef(Agenybilling)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agenybilling, {
            title: 'NewAgenybilling',
            
          }),
        },
      },
    })
    agenybilling: Agenybilling,
  ): Promise<Agenybilling> {
    return this.agenybillingRepository.create(agenybilling);
  }

  @get('/agenybillings/count')
  @response(200, {
    description: 'Agenybilling model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Agenybilling) where?: Where<Agenybilling>,
  ): Promise<Count> {
    return this.agenybillingRepository.count(where);
  }

  @get('/agenybillings')
  @response(200, {
    description: 'Array of Agenybilling model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Agenybilling, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Agenybilling) filter?: Filter<Agenybilling>,
  ): Promise<Agenybilling[]> {
    return this.agenybillingRepository.find(filter);
  }

  @patch('/agenybillings')
  @response(200, {
    description: 'Agenybilling PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agenybilling, {partial: true}),
        },
      },
    })
    agenybilling: Agenybilling,
    @param.where(Agenybilling) where?: Where<Agenybilling>,
  ): Promise<Count> {
    return this.agenybillingRepository.updateAll(agenybilling, where);
  }

  @get('/agenybillings/{id}')
  @response(200, {
    description: 'Agenybilling model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Agenybilling, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Agenybilling, {exclude: 'where'}) filter?: FilterExcludingWhere<Agenybilling>
  ): Promise<Agenybilling> {
    return this.agenybillingRepository.findById(id, filter);
  }

  @patch('/agenybillings/{id}')
  @response(204, {
    description: 'Agenybilling PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agenybilling, {partial: true}),
        },
      },
    })
    agenybilling: Agenybilling,
  ): Promise<void> {
    await this.agenybillingRepository.updateById(id, agenybilling);
  }

  @put('/agenybillings/{id}')
  @response(204, {
    description: 'Agenybilling PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() agenybilling: Agenybilling,
  ): Promise<void> {
    await this.agenybillingRepository.replaceById(id, agenybilling);
  }

  @del('/agenybillings/{id}')
  @response(204, {
    description: 'Agenybilling DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.agenybillingRepository.deleteById(id);
  }
}
