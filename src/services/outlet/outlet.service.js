/**
 * Outlet Service
 *
 */
const { auth } = require('@utils/auth');
const { outletRepository } = require('@services/repository');
const { APIError } = require('@utils/APIError');


const getOutlet = async () => { };
const getOutletById = async () => { };

const createOutlet = async (authorization, reqBody) => {
  const { user } = await auth.verifyToken(authorization);
  if (!user) throw APIError.forbidden();

  const { email } = user;
  const existingOutlet = await outletRepository.retrieve({ email });

  if (existingOutlet) {
    throw APIError.outletAlreadyExists();
  } else {
    reqBody.createdBy = email;
    return outletRepository.create(reqBody);
  }
};

const updateOutlet = async () => { };
const deleteOutlet = async () => { };

module.exports = {
  getOutlet, getOutletById, createOutlet, updateOutlet, deleteOutlet
};
