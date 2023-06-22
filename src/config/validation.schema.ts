import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.required().valid('development', 'stage', 'production', 'test'),

  // App
  NEST_APP_PORT: Joi.number().required(),
  CORS_ORIGIN: Joi.string().required(),

  // Database
  DATABASE_URL: Joi.string().required(),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required(),

  // Swagger
  API_AUTH_ADMIN_USERNAME: Joi.string().required(),
  API_AUTH_ADMIN_PASSWORD: Joi.string().required(),
  SWAGGER_DOC_URL: Joi.string().required().pattern(new RegExp('^/.*$')),
});
