const { getConnection } = require("../connesione")


const listPersona = async () => {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM persona')
    return rows;
}

module.exports = {
    listPersona
}