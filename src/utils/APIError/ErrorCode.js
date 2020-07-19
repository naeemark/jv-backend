module.exports = {
  UNSPECIFIED: {
    errTitle: 'Error code not specified',
    errDesc: 'Please try again, if problem still persist, please contact web master',
    errDebugDesc: 'Error code not specified in the system'
  },
  UNKNOWN: {
    errTitle: 'Oops...something went wrong',
    errDesc: 'System is not responding properly',
    errDebugDesc: 'System is not able to handle the error gracefully'
  },
  EXTERNAL_SERVICE_TIMEOUT: {
    errTitle: 'External service getting timed out',
    errDesc: 'Please try again, if problem still persist, please contact web master',
    errDebugDesc: 'External Service not responding in stipulated time'
  },
  BAD_REQUEST: {
    errTitle: 'External service getting timed out',
    errDesc: 'Please try again, if problem still persist, please contact web master',
    errDebugDesc: 'External Service not responding in stipulated time'
  },
  NOT_FOUND: {
    errTitle: 'Oops! Something is wrong',
    errDesc: 'The resource you are looking for does not exist!',
    errDebugDesc: 'Client with that name is already exist'
  },
  EXTERNAL_SERVICE_FAILURE: {
    errTitle: 'External service failure',
    errDesc: 'Please try again, if problem still persist, please contact web master',
    errDebugDesc: 'External Service not responding properly'
  },
  FORBIDDEN: {
    errTitle: 'Access Denied. Missing `Authorization` Token.',
    errDesc: 'Missing `Authorization` Token',
    errDebugDesc: 'Client with that name is already exist'
  },
  UNAUTHORIZED: {
    errTitle: 'Access Denied. Invalid Authorization',
    errDesc: 'This name already exist, please choose another name',
    errDebugDesc: 'Client with that name is already exist'
  },
  EXTERNAL_SERVICE_INVALID_RESPONSE: {
    errTitle: 'Invalid response by external service',
    errDesc: 'Please try again, if problem still persist, please contact web master',
    errDebugDesc: 'External Service not responding properly'
  }
};
