/**
 * Created by Aria on 31/01/2017.
 */

var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://aria:1234@ds135039.mlab.com:35039/tasklist');

//Get 1 Task
router.get('/tasks/:id', (req, res, next) =>{
    db.tasks.findOne({_id:mongojs.ObjectID(req.params.id)}, (err, task) => {
        if (err) {throw err;}
        res.json(task);
    });
});

//Get All Tasks
router.get('/tasks', (req, res, next) =>{
    db.tasks.find((err, tasks) => {
        if (err) {throw err;}
        res.json(tasks);
    });
});

//Add a Task
router.post('/task', (req,res,next) => {
   var task = req.body;
   if (!task.title || task.isDone + ''){
       res.status('400');
       res.json({
           'error':'Bad Data Type'
       });
   }else{
       db.tasks.save(task, (err, task) => {
          if (err) {throw err;}
          res.json(task);
       });
   }
});

// Delete Task
router.delete('/tasks/:id', (req,res,next) => {
   db.tasks.remove({'_id': mongojs.ObjectID(req.params.id)}, (err, task) => {
      if (err){throw err}
      res.json(task);
   });
});

//Update Task
router.put('/task/:id', (req,res,next) => {
    var task = req.body;
    var updTask = {};

    if(task.isDone){updTask.isDone = task.isDone;}
    if(task.title){updTask.title = task.title;}
    if (!updTask){
        res.status(400);
        res.json({
            'error':'Bad Data Type'
        });
    }else{
        db.tasks.update({'_id': mongojs.ObjectID(req.params.id)},updTask,{}, function(err, task) {
            if (err){throw err}
            res.json(task);
        });
    }
});

module.exports = router;/**
 * Created by Aria on 31/01/2017.
 */
