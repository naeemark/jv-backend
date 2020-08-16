const Joi = require('joi');


module.exports = {
  name: 'create',
  path: '/api/v1/outlet',
  type: 'post',
  joiSchema: {
    headers: Joi.object({ authorization: Joi.string().required() }).options({ stripUnknown: true }),
    body: Joi.object({
      name: Joi.string().min(2).required().strict(),
      mobile: Joi.string().min(10).optional(),
      email: Joi.string().email().required().strict(),
      url: Joi.string().min(6).required().strict(),
      seatCapacity: Joi.number().integer().min(1).max(20)
        .default(1)
        .required(),
      cnic: Joi.string().min(12).max(12).required(),
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
      }).required()
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
