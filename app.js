const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('666f24452508fa5c70d8a25f')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));


});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect("mongodb://localhost:27017/shopApp", { useNewUrlParser: true })
  .then(result => {
    console.log("connected to mongoDb")
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Munnu kumar',
          email: 'munnu@gmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
    console.log("server is listing on PORT 3000")
  })
  .catch(err => {
    console.log(err);
  });