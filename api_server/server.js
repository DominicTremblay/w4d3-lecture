const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = 8000;

app.post('/register', (req, res) => {
  console.log(req.body);

  res.json({ response: 'success', user: req.body });
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
