const _ = require('lodash');
const { Comment } = require('../models/comments');

module.exports.postComment = async (req, res) => {
    const userId = req.user._id;
    const comment = _.pick(req.body, ['productId', 'comment']);
    comment["userId"] = userId;
    let newComment = new Comment(comment);
    await newComment.save();
    return res.status(200).send("Submit Comment Successfully!");

}
module.exports.loadComment = async (req, res) => {
    const productId = req.params.id;
    const comment = await Comment.find({ productId: productId }).populate('userId', 'name');
    return res.status(200).send(comment);
}
