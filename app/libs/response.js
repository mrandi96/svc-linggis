const { isError } = require('./common');

module.exports = (res, payload, isPost = false) => {
  let code = isPost ? 201 : 200;
  let success = true;

  if (isError(payload)) {
    code = payload.status || 500;
    success = false;
    payload = payload.message;
  }

  const object = {
    success,
    code
  };

  if (typeof payload === 'string') object.message = payload;
  else object.data = payload;

  return res.status(code).json(object);
};
