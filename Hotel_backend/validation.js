const Joi = require('joi');

const registerValidation = async (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    role: Joi.string().min(6).required()
  });

  try {
    return await schema.validate(data);
  } catch (error) {
    return error; // You can handle the validation error as needed
  }
};

const loginValidation = async (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid().required()
  });

  try {
    return await schema.validate(data);
  } catch (error) {
    return error; // You can handle the validation error as needed
  }
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
