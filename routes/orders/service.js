const db = require("../../utils/db");

const OrderService = {
    createOrder: async function (userId, total, state, id){
        let message = true;
        try{
            const [result] = await db.query(
                `INSERT INTO orders (customerId, stateId, total, id) VALUES (:userId, :state, :total, :id)`,
                {replacements: {userId: userId, total: total, state: state, id: id}}
            );
        }catch (e) {
            console.log(e)
            message = false;
        }
        return message;
    }
}

module.exports = OrderService;