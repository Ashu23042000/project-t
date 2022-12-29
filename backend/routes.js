const router = require("express").Router();
const joi=require("joi");
const validator=require("express-joi-validation").createValidator({});

const authController = require("./controllers/user-controller");


const registerSchema=joi.object({
    name:joi.string().max(15).min(3).required(),
    email:joi.string().email().required(),
    level:joi.string().required(),
    profession:joi.string().required(),
    password:joi.string().min(6).max(15).required(),
    confirmPassword:joi.string().min(6).max(15).required()
});

const loginSchema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).max(15).required(),
});

router.post("/signup",validator.body(registerSchema), authController.signup);
router.post("/login",validator.body(loginSchema) ,authController.login);


module.exports = router;