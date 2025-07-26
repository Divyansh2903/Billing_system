const mongoose = require('mongoose');
const { OrderSchema } = require('./Order');

mongoose.connect(process.env.MONGOOSE_URL);

const Order = mongoose.model('Order', OrderSchema);

module.exports = {
  Order
}