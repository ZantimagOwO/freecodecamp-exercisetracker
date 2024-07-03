const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
require('dotenv').config()
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./model/User');
const {Exercise, exerciseSchema} = require('./model/Exercise');

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", function (req, res, next) {
  console.log(req.method + " " + req.url);
  console.log(req.body)
  next();
});

app.post("/api/users", function (req, res){
  console.log(req.body.username);

  let user = new User({
    username: req.body.username
  })

  user.save(function (err, user){
    if(err) return res.json({error: err});

    return res.json({
      username: user.username,
      _id: user._id
    })  
  })
})

app.get("/api/users", function(req, res){
  User.find({}, function (err, user){
    res.json(user)
  })
})

app.post("/api/users/:id/exercises", function (req, res) {
  let userId = req.params.id;

  let exercise = new Exercise({
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: req.body.date ? new Date(req.body.date) : new Date(),
  });

  if (!exercise.description || !exercise.duration) {
    return res
      .status(400)
      .json({ error: "Description and duration are required" });
  }

  let user = User.findOne({ _id: userId }, function (err, user) {
    if (err) {
      return res.json({ error: err });
    }

    console.log(user);

    if (!user.exercise) {
      user.exercise = [];
    }

    console.log("Adding exercise: " + JSON.stringify(exercise));

    user.exercise.push(exercise);

    user.save(function (err, user) {
      if (err) {
        return res.json({ ex: exercise });
      } 

      return res.json({
        username: user.username,
        _id: user._id,
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toString().substring(0, 15),
      });
    });
  });

  console.log(user);
});

app.get("/api/users/:_id/logs", function (req, res){

  let userId = req.params._id

  let from = req.params.from
  let to = req.params.to
  let limit = req.params.limit

  User.findOne({ _id: userId})
    .limit(limit)
    .exec((err, user) => {
      if (err) {
        return res.json({ error: err });
      }

      if (!user) {
        return res.json({ error: "User with id " + userId + " not found" });
      }
      return res.json({
        username: user.username,
        count: user.exercise.length,
        _id: user._id,
        log: user.exercise,
      });
    });

})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

// zantimadowos: 66852fb17af3231fd8c455d7