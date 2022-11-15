const router = require('express').Router();
const passport = require('passport');
require('../config/authGoogleConfig');

//(When user click the button)
router.route('/')
    .get(passport.authenticate("google", { scope: ["profile", "email"] }))

//  (When google redirect)
router.route('/redirect')
    .get(passport.authenticate("google", { session: false }), (req, res) => {
        // res.status(200).send(req.user); //user is a by default attribute
        res.sendFile(path.join(__basedir, "public/loginSuccess.html"));
    })

module.exports = router;

//Session Based Authentication
//Token Based Authentication