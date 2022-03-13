import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Agencybillingdetail, AgencybillingdetailRelations} from '../models';

export class AgencybillingdetailRepository extends DefaultCrudRepository<
  Agencybillingdetail,
  typeof Agencybillingdetail.prototype.id,
  AgencybillingdetailRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Agencybillingdetail, dataSource);
  }
}
