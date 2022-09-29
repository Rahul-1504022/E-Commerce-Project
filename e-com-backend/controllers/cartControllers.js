const { escapeRegExp } = require('lodash');
const _ = require('lodash');
const { CartItem } = require('../models/cartItem');

module.exports.createCartItem = async (res, req) => {
    let { price, product } = _.pick(req.body, ['price', 'product']);
    const item = await CartItem.findOne({ user: req.user._id, product: product });
    if (item) {
        return res.send(400).send("Item already exist in cart!");
    }
    let cartItem = new CartItem({
        price: price,
        product: product,
        user: req.user._id
    });
    const result = await cartItem.save();
    return res.status(201).send({
        message: "Item added successfully!",
        data: result
    })
}
module.exports.getCartItem = async (res, req) => {
    const cartItem = await CartItem.find({ user: req.user._id })
        .populate('user', 'name').populate('product', 'name');
    return res.status(200).send(cartItem);
}

module.exports.updateCartItem = async (res, req) => {
    const { _id, count } = _.pick(req.body, ['_id', 'count']);
    let userId = req.user._id;
    await CartItem.updateOne({ _id: _id, user: userId });
    return res.status(200).send("Item updated");
}

module.exports.deleteCartItem = async (res, req) => {
    const _id = req.params.id; //comes as a parameter in URI (/:id)
    let userId = req.user._id;
    await CartItem.deleteOne({ _id: _id, user: userId });
    return res.status(200).send("Item deleted");
} 