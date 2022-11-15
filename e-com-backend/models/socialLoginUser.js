const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const socialLoginUserSchema = new Schema({
    name: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 100
    },
    googleId: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }

}, { timestamps: true })


socialLoginUserSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role,
        name: this.name,
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    return token;
}

module.exports.SocialLoginUser = new model("SocialLoginUser", socialLoginUserSchema);