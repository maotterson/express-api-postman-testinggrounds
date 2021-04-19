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
  res.send(customers)
});

/* post */
router.post('/customers', function(req, res, next) {
  let msg = "";
  try{
    if(!req.body.name || !req.body.money){
      throw new Error("invalid customer")
    }
    const newCustomer = {
      id : customers.length+1,
      name : req.body.name,
      money : req.body.money
    }
    customers.push(newCustomer);
    msg = newCustomer + " successfully added to array"
  }
  catch (error) {
    console.log(error)
    msg = "error:" + error
  }
  res.send(msg)
});

/* put */
router.put('/customers/:id', function(req, res, next) {
  res.send('put')
});

/* delete */
router.delete('/customers/:id', function(req, res, next) {
  res.send('delete')
});

/* get by index */
router.get('/customers/:id', function(req, res, next) {
  res.send('get unique id')
});


module.exports = router;
