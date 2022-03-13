import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Cart, CartRelations, Product, Cartdetail} from '../models';
import {CartdetailRepository} from './cartdetail.repository';
import {ProductRepository} from './product.repository';

export class CartRepository extends DefaultCrudRepository<
  Cart,
  typeof Cart.prototype.cartId,
  CartRelations
> {

  public readonly products: HasManyThroughRepositoryFactory<Product, typeof Product.prototype.productId,
          Cartdetail,
          typeof Cart.prototype.cartId
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CartdetailRepository') protected cartdetailRepositoryGetter: Getter<CartdetailRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Cart, dataSource);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productRepositoryGetter, cartdetailRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
