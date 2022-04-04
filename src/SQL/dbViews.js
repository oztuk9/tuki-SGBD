const { getStorage } = require("../JS/local");

const returnConsult = async (query) => {
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        return res
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    returnConsult
}