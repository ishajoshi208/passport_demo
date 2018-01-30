const comments = require('../models/comments');

exports.postComment = function (req, res) {
    var Comments = new comments({
        comment: req.body.comments
    })
    Comments.save((err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "Error occured"
            });
        }
        else {
            res.json({
                success: true,
                data: data,
                message: "valid"
            });
        }
    })
}