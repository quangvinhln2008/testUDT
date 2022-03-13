import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Customerbillingdetail, CustomerbillingdetailRelations} from '../models';

export class CustomerbillingdetailRepository extends DefaultCrudRepository<
  Customerbillingdetail,
  typeof Customerbillingdetail.prototype.id,
  CustomerbillingdetailRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Customerbillingdetail, dataSource);
  }
}
