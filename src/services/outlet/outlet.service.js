/**
 * Outlet Service
 *
 */
const { auth } = require('@utils/auth');
const { outletRepository } = require('@services/repository');
const { APIError } = require('@utils/APIError');


const getOutlet = async (authorization) => {
  const { user } = await auth.verifyToken(authorization);
  if (!user) throw APIError.forbidden();
  const createdBy = user.email;
  return outletRepository.read({ createdBy });
};

const getOutletById = async () => { };

const createOutlet = async (authorization, reqBody) => {
  const { user } = await auth.verifyToken(authorization);
  if (!user) throw APIError.forbidden();

  reqBody.createdBy = user.email;
  return outletRepository.create(reqBody);
};

const updateOutlet = async () => { };
const deleteOutlet = async () => { };

module.exports = {
  getOutlet, getOutletById, createOutlet, updateOutlet, deleteOutlet
};
