const Joi = require('joi');

module.exports = {
  name: 'update',
  path: '/api/v1/outlets',
  type: 'put',
  joiSchema: {
    headers: Joi.object({ authorization: Joi.string().required() }).options({ stripUnknown: true }),
    body: Joi.object({
      name: Joi.string().min(2).strict(),
      mobile: Joi.string().min(10).optional(),
      email: Joi.string().email().strict(),
      url: Joi.string().min(6).strict(),
      seatCapacity: Joi.number().integer().min(1).max(20)
        .default(1),
      cnic: Joi.string().min(12).max(12),
      workingHours: Joi.object({
        default: Joi.object({
          start: Joi.string().required().strict(),
          end: Joi.string().required().strict()
        }).required(),
        Monday: Joi.array().default(null),
        Tuesday: Joi.array().default(null),
        Wednesday: Joi.array().default(null),
        Thursday: Joi.array().default(null),
        Friday: Joi.array().default(null),
        Saturday: Joi.array().default(null),
        Sunday: Joi.array().default(null)
      })
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
