import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {MongoatlasDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.mongoatlas') dataSource: MongoatlasDataSource,
  ) {
    super(User, dataSource);
  }
}
