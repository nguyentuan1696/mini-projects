const express = require('express')
const wordController = require('./../controllers/wordController')

const router = express.Router()

router
  .route('/')
  .get(wordController.getAllwords)
  .post(wordController.createTour)

router
  .route('/:id')
  .get(wordController.getWord)
  .patch(wordController.updateWord)
  .delete(wordController.deleteWord)

router.route('/:word')
  .get(wordController.findWord)