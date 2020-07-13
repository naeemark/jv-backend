const Joi = require('joi');

module.exports = {
  name: 'register',
  path: '/api/v1/register',
  type: 'post',
  joiSchema: {
    body: Joi.object({
      email: Joi.string().email().required().strict(),
      password: Joi.string().min(6).required().strict(),
      name: Joi.string().min(3).required().strict(),
      userType: Joi.string().valid(['Merchant', 'Consumer']).default('Consumer'),
      isActive: Joi.bool().default(true),
      isEmailVerified: Joi.bool().default(false)
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
