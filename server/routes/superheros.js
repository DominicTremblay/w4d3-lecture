const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.get('/:id/biography', (req, res) => {
  const { id } = req.params;
  console.log("Getting biography", id)

  axios({
    url: `https://superheroapi.com/api/${process.env.TOKEN}/${id}/biography`,
  })
    .then((result) => {
      console.log("result:", result.data)
      res.json(result.data)
    }) 
    .catch((err) => res.json(err.message));
});

module.exports = router;