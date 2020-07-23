module.exports = {
  UNSPECIFIED: {
    title: 'Error code not specified',
    description: 'Please try again. Error code not specified in the system'
  },
  UNKNOWN: {
    title: 'Oops...something went wrong',
    description: 'System is not able to handle the error gracefully'
  },
  EXTERNAL_SERVICE_TIMEOUT: {
    title: 'External service getting timed out',
    description: 'Please try again, if problem still persist, please contact web master'
  },
  BAD_REQUEST: {
    title: 'External service getting timed out',
    description: 'Please try again, if problem still persist, please contact web master'
  },
  NOT_FOUND: {
    title: 'Oops! Something is wrong',
    description: 'The resource you are looking for does not exist!'
  },
  EXTERNAL_SERVICE_FAILURE: {
    title: 'External service failure',
    description: 'Please try again, if problem still persist, please contact web master'
  },
  FORBIDDEN: {
    title: 'Access Denied. Missing `Authorization` Token.',
    description: 'Missing `Authorization` Token'
  },
  UNAUTHORIZED: {
    message: 'Provided Authorization Token is not valid',
    title: 'Access Denied. Invalid Authorization Provided',
    description: 'Your session has expired. Please refresh or restart session to continue.'
  },
  EXTERNAL_SERVICE_INVALID_RESPONSE: {
    title: 'Invalid response by external service',
    description: 'Please try again, if problem still persist, please contact web master'
  }
};
