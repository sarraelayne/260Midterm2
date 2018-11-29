var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    Name: String,
    Price: Number,
    Image: String,
    orders: {type: Number, default: 0}
});

itemSchema.methods.upvote = function(cb) {
    this.orders += 1;
    this.save(cb);
};

mongoose.model('Items', itemSchema);