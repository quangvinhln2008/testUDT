import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Cartdetail, CartdetailRelations} from '../models';

export class CartdetailRepository extends DefaultCrudRepository<
  Cartdetail,
  typeof Cartdetail.prototype.id,
  CartdetailRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Cartdetail, dataSource);
  }
}
