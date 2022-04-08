const { personExistsById } = require("../database/dao/persona.dao");

const checkPerson = async (req, res, next) => {
    // check if id exist
    const person_id = req.params.person_id;
    if (!person_id) {
        return res.status(404).json({
            message: "missing person id"
        }).send();
    }

    // check if id is int
    const isInt = parseInt(person_id);
    if (isNaN(isInt)) {
        return res.status(400).json({
            message: "id must be an integer"
        }).send();
    }

    // check if person exist
    const p = await personExistsById(person_id);
    if (!p) {
        return res.status(404).json({
            message: "person doesn't exist"
        }).send();
    }
    next();
}

module.exports = {
    checkPerson
}