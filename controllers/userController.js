const Joi = require("joi")
const bcrypt = require("bcryptjs")
const { User } = require("../models/userModel")
const { generateToken } = require("../utils/jwt")

const userJoiSchema = {
    login: Joi.object().keys({
        password: Joi.string(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('email is not valid'))
    }),
    register: Joi.object().keys({
        password: Joi.string().required().min(8),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('email is not valid')),
        userName: Joi.string()
    })
}

const checkIfUserExists = async (email) => {
    const user = await User.findOne({ email });
    if (user)
        return user;
    return false;
}

exports.register = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await User.findOne({ email: body.email })
        if (user) {
            throw new Error("user is already exist")
        }
        const validate = userJoiSchema.register.validate(body);
        if (validate.error)
            throw Error(validate.error);
        //* הצפנת סיסמא
        const hash = await bcrypt.hash(body.password, 10)
        body.password = hash;
        //* הוספת מופע לטבלה
        const newUser = new User(body);
        
        // הוספת ID ע"פ ID מהטבלה
        newUser.id = newUser._id;
        //*שמירת המופע בטבלה
        await newUser.save();

        //* response to client
        res.status(200).send("user "+newUser.userName+" added")
    } catch (error) {
        console.log(error);
        next(error)
    }

}
exports.login = async (req, res, next) => {
    const body = req.body;
    try {
        const validate = userJoiSchema.login.validate(body);
        if (validate.error) {
            throw Error(validate.error);
        }

        //בדיקה אם יוזר קיים והאם סיסמא תואמת
        const user = await checkIfUserExists(body.email);
        if (!user || ! await bcrypt.compare(body.password, user.password)) {
            throw new Error('Password or email not valid');
        }
        //* יצירת תוקן
        const token = generateToken(user);
        return res.send({ token });
        // send the user object to the client
    } catch (error) {
        next(error);
    }
}
exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (error) {
        next(error);
    }
}
exports.getById = async (req, res, next) => {
    try {
        const user = await User.find({ id: req.params.id});
        res.send(user)
    } catch (error) {
        next(error);
    }
}
exports.editUser = async (req, res, next) => {
    try {
        let data = await User.updateOne({ id: req.params.id }, req.body)
        console.log("edit Body", req.body);
        //if success -n=1
        res.json(data)
    } catch (error) {
        console.log(error);
        next(error)
    }
}
exports.deleteUser = async (req, res, next) => {
    try {
        let data = await User.deleteOne({ id: req.params.id })
        //if success -n=1
        res.json(data)
    } catch (error) {
        console.log(error);
        next(error);
    }
}