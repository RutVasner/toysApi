const { Schema , model, default: mongoose} = require("mongoose");
const { User } = require("./userModel");

const toySchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["babies", "children", "adoults"],
    },
    imgUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref:User,
        required: true
    }
});

const Toy = model("Toy", toySchema);
module.exports.Toy = Toy;