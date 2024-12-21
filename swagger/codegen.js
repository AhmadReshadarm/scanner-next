const swagger = require('swagger-axios-codegen');

swagger.codegen({
  methodNameMode: 'operationId',
  source: require('./swagger.json'),
  // remoteUrl: 'http://localhost:44307/swagger/v1/swagger.json',
  outputDir: './swagger/services',
  strictNullChecks: false,
  modelMode: 'interface',
  extendDefinitionFile: './swagger/customerDefinition.ts',
  extendGenericType: ['JsonResult'],
  sharedServiceOptions: true,
});
