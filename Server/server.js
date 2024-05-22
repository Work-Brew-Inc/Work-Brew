const path = require('path');
const express = require('express');
const webpack = require('webpack');
const dotenv = require('dotenv');
// const cors = require("cors");
// const supabase = require("./Models/model.js");
//import router
const router = require('./Routes/Route');

// Load environment variables from .env file
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

// enable parsing req
app.use(express.json());

if (isDev) {
  const webpackConfig = require('../webpack.config.js');
  const compiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));

  app.use(express.static('../dist'));

  // router to handle requests
  app.use('/Brew', router);

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/static/index.html'));
  });
} else {
  // Serve static files from 'dist' directory in production
  app.use(express.static(path.resolve(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  });
}

//Catch all route handler
app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Error Handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// supabase
//   .from("coffee_shop")
//   .select("*")
//   .then((response) => {
//     if (response.error) {
//       console.error("Error connecting to Supabase:", response.error);
//     } else {
//       console.log("Connected to Supabase");
//       console.log(response.data); // Log the retrieved data
//     }
//   })
//   .catch((error) => {
//     console.error("Unexpected error:", error);
//   });
