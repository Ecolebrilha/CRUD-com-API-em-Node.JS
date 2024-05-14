const express = require('express');
const app = express();
const pizzaRoutes = express.Router();

let Pizza = require('../model/Pizza');

// api to add pizza
pizzaRoutes.route('/add').post(function (req, res) {
  let pizza = new Pizza(req.body);
  pizza.save()
  .then(pizza => {
    res.status(200).json({'status': 'success','mssg': 'pizza added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get pizzas
pizzaRoutes.route('/').get(function (req, res) {
  Pizza.find(function (err, pizzas){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','pizzas': pizzas});
    }
  });
});

// api to get pizza
pizzaRoutes.route('/pizza/:id').get(function (req, res) {
  let id = req.params.id;
  Pizza.findById(id, function (err, pizza){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','pizza': pizza});
    }
  });
});

// api to update route
pizzaRoutes.route('/update/:id').put(function (req, res) {
    Pizza.findById(req.params.id, function(err, pizza) {
    if (!pizza){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        pizza.flavor = req.body.flavor;
        pizza.price = req.body.price;
        pizza.ingredients = req.body.ingredients;
        pizza.size = req.body.size;
        pizza.available = req.body.available;

        pizza.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
pizzaRoutes.route('/delete/:id').delete(function (req, res) {
  Pizza.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = pizzaRoutes;