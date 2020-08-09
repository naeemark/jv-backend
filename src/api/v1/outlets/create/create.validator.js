const Joi = require('joi');

const defaultTimeTable = [
  { day: 'Monday', start: '9:00', end: '18:00' },
  { day: 'Tuesday', start: '9:00', end: '18:00' },
  { day: 'Wednesday', start: '9:00', end: '18:00' },
  { day: 'Thursday', start: '9:00', end: '18:00' },
  { day: 'Friday', start: '9:00', end: '18:00' },
  { day: 'Saturday', start: '9:00', end: '18:00' },
  { day: 'Sunday', start: '9:00', end: '18:00' }
];


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
      timeTable: Joi.object().default(defaultTimeTable)
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
