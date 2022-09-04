import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { validatePassword, comparePass } from '../utils/compare.js';
import CatchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import * as env from '../config/env-vars.js';

const signToken = (id, rol) => {
  return jwt.sign({ id, rol }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id, user.rol);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const login = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  const correct = await validatePassword(password, user.password);

  if (!user || !correct) {
    return next(new AppError('Email o contraseña incorrecta', 401));
  }

  createSendToken(user, 200, res);
});

export const signUp = CatchAsync(async (req, res, next) => {
  const { nombre, apellidos, email, password, confirmarPassword } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return next(new AppError('El usario ya existe', 400));
  } else if (!comparePass(password, confirmarPassword)) {
    return next(new AppError('Las contraseñas no coinciden', 400));
  }

  const newUser = await User.create({
    nombre,
    apellidos,
    email,
    password,
    confirmarPassword,
    //    foto: req.file.filename,
  });

  return createSendToken(newUser, 201, res);
});

export const getLogout = CatchAsync((req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.redirect('/');
});
