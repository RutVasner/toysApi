const express = require("express");
const {getAll, newToy, getMyToys, getToyByNameOrInfo, getToyByCategory, editToy, deleteToy, getToyById } = require("../controllers/ToyController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/",getAll);
router.get("/:id",getToyById);
router.get("/category/:catName",getToyByCategory);
router.get("/search",getToyByNameOrInfo);
router.put("/:id",auth(),editToy)
router.post("/",auth(),newToy);
router.delete("/:id",auth(),deleteToy)

module.exports = router