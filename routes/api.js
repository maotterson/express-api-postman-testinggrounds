var express = require('express');
var router = express.Router();
var customers = [
  {
    id:1,
    name:"fred",
    money:50
  },
  {
    id:2,
    name:"bob",
    money:10
  },
  {
    id:3,
    name:"barbara",
    money:25
  },
]

/* api. */
router.get('/', function(req, res, next) {
  res.render('api', { message: 'Api' });
});

////////////////////////////////////////////////////////////////////////////////////
/* get */
router.get('/customers', function(req, res, next) {
  try{
    //..... if there is an external request...
    msg = "success"
  }
  catch (error){
    msg = "error: " + error
  }
  data = {
    message : msg,
    data : customers
  }
  res.send(data)
});

/* post */
router.post('/customers', function(req, res, next) {
  let msg = "";
  try{
    if(!req.body.name || !req.body.money){
      throw new Error("invalid customer")
    }
    const newCustomer = {
      id : customers[customers.length-1].id+1,
      name : req.body.name,
      money : req.body.money
    }
    customers.push(newCustomer);
    msg = newCustomer.name + " successfully added to array"
  }
  catch (error) {
    console.log(error)
    msg = "error:" + error
  }
  data = {
    message : msg
  }
  res.send(data)
});

/* put */
router.put('/customers/:id', function(req, res, next) {
  try{
    const match = customers.find(customer => customer.id == req.params.id);

    if(!req.body.name || !req.body.money){
      throw new Error("invalid data")
    }
    else if(!match){
      console.log(req.params.id)
      throw new Error("invalid customer id")
    }

    const index = customers.indexOf(match)
    const updatedCustomer = {
      id : match.id,
      name : req.body.name,
      money : req.body.money
    }
    customers[index] = updatedCustomer;
    msg = updatedCustomer.name + " successfully updated within array"
  }
  catch (error) {
    console.log(error)
    msg = "error:" + error
  }
  data = {
    message : msg
  }
  res.send(data)
});

/* delete */
router.delete('/customers/:id', function(req, res, next) {
  try{
    const match = customers.find(customer => customer.id == req.params.id);

    if(!match){
      console.log(req.params.id)
      throw new Error("invalid customer id")
    }

    const index = customers.indexOf(match)
    customers.splice(index,1)
    msg = match.name + " successfully deleted"
  }
  catch (error) {
    console.log(error)
    msg = "error:" + error
  }
  data = {
    message : msg
  }
  res.send(data)
});

/* get by index */
router.get('/customers/:id', function(req, res, next) {
  let msg = "";
  let match;
  try{
    match = customers.find(customer => customer.id == req.params.id);
    console.log(match)

    if(!match){
      console.log(req.params.id)
      throw new Error("invalid customer id")
    }
    msg = "success"
  }
  catch (error) {
    console.log(error)
    msg = "error:" + error
  }
  data = {
    message : msg,
    data : match
  }
  res.send(data)
});


module.exports = router;
