import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Customerbilling, CustomerbillingRelations, Product, Customerbillingdetail} from '../models';
import {CustomerbillingdetailRepository} from './customerbillingdetail.repository';
import {ProductRepository} from './product.repository';

export class CustomerbillingRepository extends DefaultCrudRepository<
  Customerbilling,
  typeof Customerbilling.prototype.customerBillingId,
  CustomerbillingRelations
> {

  public readonly products: HasManyThroughRepositoryFactory<Product, typeof Product.prototype.productId,
          Customerbillingdetail,
          typeof Customerbilling.prototype.customerBillingId
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CustomerbillingdetailRepository') protected customerbillingdetailRepositoryGetter: Getter<CustomerbillingdetailRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Customerbilling, dataSource);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productRepositoryGetter, customerbillingdetailRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
