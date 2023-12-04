const { Toy } = require("../models/toysModel");
const { User } = require("../models/userModel")


exports.getAll = async (req, res, next) => {
    try {
        const query = req.query;
        console.log(query.page);
        const perPage = 10;
        const skip = (query.page - 1) * perPage;
        const toys = await Toy.find({}).skip(skip).limit(perPage);
        console.log("toys");
        res.send(toys);
    } catch (error) {
        next(error);
    }
}
const checkIfUserExists = async (email) => {
    const user = await User.findOne({ email });
    if (user)
        return user;
    return false;
}

exports.newToy = async (req, res, next) => {

    const body = req.body;
    const userId = res.locals.userId;
    console.log(userId);
    console.log(res.locals);
    try {
        const newToy = new Toy(body);
        // הוספת ID ע"פ ID מהטבלה
        newToy.id = newToy._id;
        newToy.ownerId = userId;

        //*שמירת המופע בטבלה
        await newToy.save();

        //* response to client
        res.status(200).send(newToy)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.getMyToys = async (req, res, next) => {
    try {
        // console.log(res.locals);
        const userId = res.locals.userId;
        const toys = await Toy.find({ ownerId: userId });
        res.send(toys);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
// const { s } = req.query;
// if (s) {
//     const toys = await Toys.find({ $or: [{ name: s }, { info: s }] })
//         .skip(skip).limit(perPage).populate('userId');
//     res.send(toys)
// }

exports.getToyByNameOrInfo = async (req, res, next) => {
    console.log("gcghvbkjbj");
    try {
        const s = req.query.s;
        console.log(s);
        const page = req.query.page;
        const perPage = 10;
        const skip = (page - 1) * perPage;
        const toys = await Toy.find({ $or: [{ name: s }, { info: s }] }).skip(skip).limit(perPage);
        console.log((toys));
        res.status(200).send(toys)
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

exports.getToyByCategory = async (req, res, next) => {
    // console.log(":/.kjg");
    try {
        category = req.params.catName;
        const page = req.query.page;
        const perPage = 10;
        const skip = (page - 1) * perPage;
        const toys = await Toy.find({ category }).skip(skip).limit(perPage);
        console.log((toys));
        res.status(200).send(toys)

    } catch (error) {
        console.log(error);
        // res.sendStatus(400)
        next(error)
    }
}

exports.editToy = async (req, res, next) => {
    try {
        let data = await Toy.updateOne({ id: req.params.id }, req.body, { new: true })
        console.log("edit Body", req.body);
        //if success -n=1
        res.send(data)
    } catch (error) {
        console.log(error);
        next(error)
    }
}
exports.deleteToy = async (req, res, next) => {
    try {
        let data = await Toy.deleteOne({ id: req.params.id }, { new: true })
        //if success -n=1
        res.json(data)
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getToyById = async (req, res, next) => {
    try {
        let toy = await Toy.find({ id: req.params.id })
        res.json(toy)


    } catch (error) {
        console.log(error);
        next(error);
    }
}