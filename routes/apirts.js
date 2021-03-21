const router = require('express').Router();
const Workouts = require('../models/workout.js');

//to grab workout, duration
router.get('/api/workouts', (req, res) => {
  Workouts.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration', //shows total duration of workouts
        },
      },
    },
  ])
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});
//to post workout
router.post('/api/workouts', (req, res) => {
  Workouts.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//shows workouts, updates the workout, adds the exercises
router.put('/api/workouts/:id', ({ body, params }, res) => {
  Workouts.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body }},
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//to grab workout range, duration
router.get('/api/workouts/range', (req, res) => {
  Workouts.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration', //shows total duration of workouts
        },
      },
    },
  ])
    .sort({ _id: -1 })
    //shows the last 7 days of workouts
    .limit(7)
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

//to delete workout
router.delete('/api/workouts', ({ body }, res) => {
  Workouts.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;