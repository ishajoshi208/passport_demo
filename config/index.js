const mongoose = require('mongoose');
module.exports = {
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl': mongoose.connect("mongodb://passport:passport123@ds129966.mlab.com:29966/passport", { useMongoClient: true }, function (err, data) {
        if (err) {
            console.log("Error connecting database");
        }
        else {
            console.log("Connected to database");
        }
    })
}