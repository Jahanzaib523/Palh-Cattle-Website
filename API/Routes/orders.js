const express = require('express');
const router = express.Router();
const mongoose  = require('mongoose');
const order = require('../Models/order');
const Order  = require('../Models/order');
const Prodcut = require('../Models/product');

router.get('/', (req, res, next) => {
  Order.find()
  .select('product _id quantity')
  .exec()
  .then(result => {
     console.log(result);
     res.status(200).json({
       count: result.length,
       orders: result.map(results =>{
         return {
          _id: results._id,
          product: results.product,
          quantity: results.quantity,
          request: {
            type: 'GET',
            url: 'https:localhost:5000/orders/' + results._id
          }
         }
       }),
     });
  }) 
  .catch(error=> {
     console.log(error);
     res.status(500).json({error});
  });
});

router.post('/', (req, res, next) => {
  product.findById(req.body.productId)
  .then(product => {
    if(!product)
    {
      res.status(404).json({
        message: 'Prodcut not found'
      })
    }
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId
   });
 
   return order.save()
  })
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Order stored',
      createdOrder: {
        _id: result._id,
        product: result.productId,
        quantity: result.quantity
      },
      request:{
        type: 'GET',
        url: 'https//:localhost:5000/orders/' + result._id
      }
    });
 })
 .catch(err=> {
  console.log(err);
  res.status(500).json({
    error: err
  });
});
});

router.get('/:orderId', (req, res, next) => {
    const id =  req.params.orderId;
    Order.findById(id)
    .select('product _id quantity')
    .exec()
    .then(result => {
      if(!result)
      {
        return res.status(404).json({ message: 'Order not Found' });
      }
       res.status(200).json({
         order: result,
         request:{
          type: 'GET',
          url: 'https//:localhost:5000/orders'
        }
       })
    })
    .catch(err => {
        res.status(500).json({
          error: err
        })
    })
});

router.patch('/:orderId', (req, res, next) => {
    const id =  req.params.orderId;
    if(id === 'order1')
    {
        res.status(200).json({
          message: 'Order Updated!',
          id: id
        });
    }
    else{
        res.status(200).json({
            message: 'Order could not update!',
          });
    }
});

router.delete('/:orderId', (req, res, next) => {
    Order.remove({_id: req.params.orderId})
    .exec()
    .then(result=>{
      res.status(200).json({
        message: 'Order Deleted',
        request:{
         type: 'GET',
         url: 'https//:localhost:5000/orders',
         body: {productId: 'String', orderId: 'String', 'quantity': 'Number'}
       },
      })
    })
    .catch(err=>{

    })
});
module.exports = router;