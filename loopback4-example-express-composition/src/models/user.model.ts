import {Entity, model, property} from '@loopback/repository';
import {getJsonSchema} from '@loopback/repository-json-schema';
import mongoose from 'mongoose';

@model({
  name: 'user',
  settings: {
    mongo: {
      schema: 'user',
    },
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  googleID?: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'string',
  })
  email?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

const user = getJsonSchema(User);

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

//export mongoose.model('user', user);
// module.exports = mongoose.model('user', User);
