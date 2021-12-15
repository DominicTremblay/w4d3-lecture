const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = 8000;

app.post('/register', (req, res) => {
  console.log(req.body);

  res.json({ response: 'success', user: req.body });
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
