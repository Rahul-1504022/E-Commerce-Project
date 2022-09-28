require('dotenv/config');
const mongoose = require('mongoose');
const app = require('./app');

//SERVER connection
mongoose.connect(process.env.MONGODB_URL_LOCAL)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.log("Connection Failed!"));
//PORT initialization
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}!`);
})
