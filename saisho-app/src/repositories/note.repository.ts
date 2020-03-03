import {DefaultCrudRepository} from '@loopback/repository';
import {Note, NoteRelations} from '../models';
import {DbDataSource, MongoatlasDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NoteRepository extends DefaultCrudRepository<
         Note,
         typeof Note.prototype.id,
         NoteRelations
       > {
         constructor(
           @inject('datasources.mongoatlas') dataSource: MongoatlasDataSource,
         ) {
           super(Note, dataSource);
         }
       }
