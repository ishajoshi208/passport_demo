const mongoose = require('mongoose');
const express = require('express');


var commentsSchema = new mongoose.Schema({
  comment:{
      type: String
  }
})

var Comment = module.exports = mongoose.model('comment', commentsSchema);




