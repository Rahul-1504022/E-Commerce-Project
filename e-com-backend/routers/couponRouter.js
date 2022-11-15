const express = require('express');
const router = express.Router();
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');
const { createNewCoupon, getCoupon, deleteCoupon } = require('../controllers/couponController');

router.route('/')
    .post([authorize, admin], createNewCoupon)
    .get([authorize, admin], getCoupon)


router.route('/:id')
    .delete([authorize, admin], deleteCoupon)

module.exports = router;