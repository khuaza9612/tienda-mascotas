import Products from '../models/productsModel.js';
import AppError from '../utils/appError.js';
import CatchAsync from '../utils/catchAsync.js';

export const getProducts = CatchAsync(async (req, res, next) => {
  const products = await Products.findAll();
  if (!products) {
    return next(new AppError('No se ha encontrado ningun producto', 400));
  }
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

export const getProductById = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Products.findByPk(id);
  if (!id || !product) {
    return next(new AppError('No se ha especificado el id o Producto no econtrado', 400));
  }
  res.status(200).json(product);
});

export const deleteProduct = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const products = await Products.findByPk(id);
  if (!products || !id) {
    return next(new AppError('No se ha especificado el id o Producto no econtrado', 400));
  }
  await products.destroy();
  res.status(204).json({ message: 'Producto eliminado correctamente' });
});

export const updateProduct = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    technical_specs,
    precio,
    stock,
    existencia,
    nombre_marca,
    categoria,
    oferta,
    porcentaje_oferta,
    fotos,
  } = req.body;

  let products = await Products.findByPk(id);
  if (!products.id || !products) {
    return next(new AppError('No se ha especificado el id o Producto no econtrado', 400));
  } else {
    products = await products.update({
      nombre,
      descripcion,
      technical_specs,
      precio,
      stock,
      existencia,
      nombre_marca,
      categoria,
      oferta,
      porcentaje_oferta,
      fotos,
    });
    res.status(200).json({
      message: 'Producto actualizado correctamente',
      products,
    });
  }
});

export const addProduct = CatchAsync(async (req, res, next) => {
  const {
    categoria,
    technical_specs,
    precio,
    stock,
    state,
    oferta,
    porcentaje_oferta,
    nombre,
    nombre_marca,
    descripcion,
    fotos,
  } = req.body;

  const product = await Products.findOne({ where: { nombre } });
  if (product) {
    return next(new AppError('El producto ya existe', 400));
  }
  const newProduct = await Products.create({
    nombre,
    descripcion,
    technical_specs,
    precio,
    stock,
    state,
    nombre_marca,
    categoria,
    oferta,
    porcentaje_oferta,
    fotos,
  });
  res
    .send({
      message: 'Producto creado correctamente',
      newProduct,
    })
    .status(201);
});
