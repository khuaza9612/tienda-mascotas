import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env-vars.js';
// import { promisify } from 'util';
import AppError from '../utils/appError.js';
import CatchAsync from '../utils/catchAsync.js';
// import User from '../models/userModel.js';
// import * as env from '../config/env-vars.js';

// TODO: Recibir user id del token decoded

export const ensureAuth = CatchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('No se ha encontrado el token', 401));
  }
  //if (req.cookie('token')){
  //  token = req.cookie('token');
  //}
  next();
});

// creado por Kevin Huaza con ayuda de Mikel Diaz
export const restrictTo = (roles) =>
  CatchAsync(async (req, res, next) => {
    let token;
    if (!req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      return next(new AppError('No se ha pasado un token o es inválido', 400));
    }
    //if (!req.cookie.token){
    //  return next(new AppError('No se ha pasado un token o es inválido', 400));
    //}
    token = req.headers.authorization.split(' ')[1];
    const tokenData = await jwt.verify(token, JWT_SECRET);

    if (!roles.includes(tokenData.rol)) {
      return next(new AppError('No tienes los permisos', 403));
    }
    next();
  });
