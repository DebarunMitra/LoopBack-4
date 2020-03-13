// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import {get, param} from '@loopback/rest';

export class GreetController {
  constructor() {}

  // Note that we can still use OperationObject fragments with the
  // route decorators for fine-tuning their definitions and behaviours.
  // This could simply be `@get('/')`, if desired.
  @get('/greet', {
    responses: {
      '200': {
        description: 'greeting text',
        content: {
          'application/json': {
            schema: {type: 'string'},
          },
        },
      },
    },
  })
  greet(@param.query.string('name') name: string) {
    return `hello ${name}`;
  }
}
