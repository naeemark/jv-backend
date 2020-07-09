const Joi = require('joi');

module.exports = {
  name: 'start',
  path: '/api/v1/start',
  type: 'post',
  joiSchema: {
    headers: Joi.object({
      'client-app-token': Joi.string().min(3).required(),
      timestamp: Joi.number().integer().required(),
      'device-id': Joi.string().min(3).required()
    }).options({ stripUnknown: true }),
    response: {
      200: {
        description: 'OK',
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required(),
          response: {}
        }
      },
      400: {
        description: 'Error Response',
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(Joi.object().keys({
              errorCode: Joi.string().required(),
              errorTitle: Joi.string().required(),
              errorDescription: Joi.string().required(),
              errorDebugDescription: Joi.string()
            }))
          }
        }
      }
    }
  }
};
