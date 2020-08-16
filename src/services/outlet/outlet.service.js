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

const createOutlet = async (authorization, params) => {
  const { user } = await auth.verifyToken(authorization);
  if (!user) throw APIError.forbidden();

  params.createdBy = user.email;
  return outletRepository.create(params);
};

const updateOutlet = async (authorization, params) => {
  const { user } = await auth.verifyToken(authorization);
  if (!user) throw APIError.forbidden();

  params.createdBy = user.email;
  return outletRepository.update(params);
};
const deleteOutlet = async (authorization) => {
  const { user } = await auth.verifyToken(authorization);
  if (!user) throw APIError.forbidden();
  const createdBy = user.email;
  return outletRepository.delete({ createdBy });
};

module.exports = {
  getOutlet, getOutletById, createOutlet, updateOutlet, deleteOutlet
};
