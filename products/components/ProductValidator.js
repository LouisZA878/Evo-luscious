// Modules
const mongoose = require('mongoose')

// Components
const { ExpressValidator } = require('express-validator')

// Custom decoder
const { body, query, param, validationResult, matchedData } = new ExpressValidator(
    {
      isAboveZero: async value => {
        if (value < 1){
          throw new Error('Value must be an integer above Zero')
        }
      },
    },
  );


module.exports = {
  body,
  query,
  param,
  validationResult,
  matchedData
}