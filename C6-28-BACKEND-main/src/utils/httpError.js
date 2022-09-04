const handleHttpError = (res, errorMsg = 'Ocurrió un problema', code = 403) => {
  res.status(code);
  res.send({ error: errorMsg });
};

export default handleHttpError; // no se si hay que pasarlo como objeto
