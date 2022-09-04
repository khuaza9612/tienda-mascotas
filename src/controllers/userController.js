import User from '../models/userModel.js';
import Member from '../models/memberModel.js';
import AppError from '../utils/appError.js';
import CatchAsync from '../utils/catchAsync.js';
import multer from 'multer';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/userPhoto');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.params.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Solo imagenes permitidas!', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single('foto');

export const getUser = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!id || !user) {
    return next(new AppError('No se ha especificado el id o Usuario no econtrado', 400));
  }
  res.status(200).json(user);
});

export const getAllUsers = CatchAsync(async (req, res, next) => {
  const users = await User.findAll();
  if (!users) {
    return next(new AppError('No se ha encontrado ningun usuario', 400));
  }
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

export const deleteUser = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user || !id) {
    return next(new AppError('No se ha especificado el id o Usuario no econtrado', 400));
  }
  await user.destroy();
  res.status(204).json({ message: 'Usuario eliminado correctamente' });
});

export const updateUser = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { nombre, apellidos, email } = req.body;

  let user = await User.findByPk(id);
  if (!user.id || !user) {
    return next(new AppError('No se ha especificado el id o Usuario no econtrado', 400));
  } else {
    user = await user.update({
      nombre,
      apellidos,
      email,
      foto: req.file.filename,
    });
    res.status(200).json({
      message: 'Usuario actualizado correctamente',
      user,
    });
  }
});

export const createMember = CatchAsync(async (req, res) => {
  const { nombre, apellidos, nickname, linkedin, github, twitter } = req.body;

  const member = await Member.create({
    nombre,
    apellidos,
    nickname,
    linkedin,
    github,
    twitter,
  });

  res.status(201).json({
    message: 'Miembro creado correctamente',
    member,
  });
});
