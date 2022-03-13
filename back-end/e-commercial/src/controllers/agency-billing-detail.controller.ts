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
import {Agencybillingdetail} from '../models';
import {AgencybillingdetailRepository} from '../repositories';

export class AgencyBillingDetailController {
  constructor(
    @repository(AgencybillingdetailRepository)
    public agencybillingdetailRepository : AgencybillingdetailRepository,
  ) {}

  @post('/agencybillingdetails')
  @response(200, {
    description: 'Agencybillingdetail model instance',
    content: {'application/json': {schema: getModelSchemaRef(Agencybillingdetail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agencybillingdetail, {
            title: 'NewAgencybillingdetail',
            
          }),
        },
      },
    })
    agencybillingdetail: Agencybillingdetail,
  ): Promise<Agencybillingdetail> {
    return this.agencybillingdetailRepository.create(agencybillingdetail);
  }

  @get('/agencybillingdetails/count')
  @response(200, {
    description: 'Agencybillingdetail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Agencybillingdetail) where?: Where<Agencybillingdetail>,
  ): Promise<Count> {
    return this.agencybillingdetailRepository.count(where);
  }

  @get('/agencybillingdetails')
  @response(200, {
    description: 'Array of Agencybillingdetail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Agencybillingdetail, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Agencybillingdetail) filter?: Filter<Agencybillingdetail>,
  ): Promise<Agencybillingdetail[]> {
    return this.agencybillingdetailRepository.find(filter);
  }

  @patch('/agencybillingdetails')
  @response(200, {
    description: 'Agencybillingdetail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agencybillingdetail, {partial: true}),
        },
      },
    })
    agencybillingdetail: Agencybillingdetail,
    @param.where(Agencybillingdetail) where?: Where<Agencybillingdetail>,
  ): Promise<Count> {
    return this.agencybillingdetailRepository.updateAll(agencybillingdetail, where);
  }

  @get('/agencybillingdetails/{id}')
  @response(200, {
    description: 'Agencybillingdetail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Agencybillingdetail, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Agencybillingdetail, {exclude: 'where'}) filter?: FilterExcludingWhere<Agencybillingdetail>
  ): Promise<Agencybillingdetail> {
    return this.agencybillingdetailRepository.findById(id, filter);
  }

  @patch('/agencybillingdetails/{id}')
  @response(204, {
    description: 'Agencybillingdetail PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agencybillingdetail, {partial: true}),
        },
      },
    })
    agencybillingdetail: Agencybillingdetail,
  ): Promise<void> {
    await this.agencybillingdetailRepository.updateById(id, agencybillingdetail);
  }

  @put('/agencybillingdetails/{id}')
  @response(204, {
    description: 'Agencybillingdetail PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() agencybillingdetail: Agencybillingdetail,
  ): Promise<void> {
    await this.agencybillingdetailRepository.replaceById(id, agencybillingdetail);
  }

  @del('/agencybillingdetails/{id}')
  @response(204, {
    description: 'Agencybillingdetail DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.agencybillingdetailRepository.deleteById(id);
  }
}
