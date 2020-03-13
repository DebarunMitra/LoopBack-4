// Uncomment these imports to begin using these cool features!

//  import {inject} from '@loopback/context';
import {get, param} from '@loopback/rest';

// function greet(name: string) {
//   return `hello ${name}`;
// }

// const spec: OpenApiSpec = {
//   openapi: '3.0.0',
//   info: {
//     title: 'LoopBack Application',
//     version: '1.0.0',
//   },
//   paths: {
//     '/hello/greet': {
//       get: {
//         'x-operation': greet,
//         parameters: [{name: 'name', in: 'query', schema: {type: 'string'}}],
//         responses: {
//           '200': {
//             description: 'greeting text',
//             content: {
//               'application/json': {
//                 schema: {type: 'string'},
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// const app = new RestApplication();
// app.api(spec);

export class HelloController {
  constructor() {}
  @get('/hello')
  hello(): string {
    return 'Hello world!';
  }

  @get('/hello/greet', {
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

// export class HelloGreetController {
//   constructor() {}
//   @get('/hello/greet')
//   greet(): string {
//     return 'Hello Deabrun!';
//   }
// }
