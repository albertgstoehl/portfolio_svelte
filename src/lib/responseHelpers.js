import { json } from '@sveltejs/kit';

/**
 * Generates a standardized success response.
 * @param {Object} data - Response data.
 * @param {string} message - A message describing the response.
 * @param {number} [status=200] - HTTP status code.
 */
export function success(data = {}, message = 'Success', status = 200) {
  return json(
    {
      type: 'success',
      message,
      ...data,
    },
    { status }
  );
}

/**
 * Generates a standardized info response.
 * @param {string} message - A message describing the response.
 * @param {number} [status=200] - HTTP status code.
 */
export function info(message, status = 200) {
  return json(
    {
      type: 'info',
      message,
    },
    { status }
  );
}

/**
 * Generates a standardized error response.
 * @param {string} message - A message describing the error.
 * @param {number} [status=500] - HTTP status code.
 */
export function errorResponse(message, status = 500) {
  return json(
    {
      type: 'error',
      message,
    },
    { status }
  );
}
