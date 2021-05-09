const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, 'A dictionary must have a word'],
    unique: true,
    // maxlength: [40, 'A dictionary must have less or equal then 40 charaters'],
    // minlength: [10, 'A dictionary must have more or then 10 character']
  },
  english_mean: {
    type: String,
    required: [true, 'A dictionary must have a word'],
    unique: true,
  },
  vietnamese_mean: {
    type: String,
    required: [true, 'A dictionary must have a word'],
    unique: true,
  },
  pronunciation: {
    type: String,
    required: [true, 'A dictionary must have a word'],
    unique: true,
  },
  type: {
    type: String,
    required: [true, 'A dictionary must have a word'],
    unique: true,
  },
  example: {
    type: String,
    required: [true, 'A dictionary must have a word'],
    unique: true,
  }
})

wordSchema.index({ word: 1 })

const Dic = mongoose.model('Word', wordSchema)

module.exports = Dic

