import { check } from 'express-validator';
import { validateResult } from '../utils/handleValidators.js';

export const validateProduct = [
  check('nombre').isString(),
  check('descripcion').isString(),
  check('technical_specs').isString(),
  check('precio').isInt(),
  check('stock').isInt(),
  check('nombre_marca').isString(),
  check('categoria').isArray(),
  check('porcentaje_oferta').isInt(),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];
