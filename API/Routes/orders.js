const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
     message: 'Orders were fetched!'
  });
});

router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }
    res.status(200).json({
       message: 'Order was placed!',
       placedOrder: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const id =  req.params.orderId;
    if(id === 'order1')
    {
        res.status(200).json({
          message: 'Order fetched!',
          id: id
        });
    }
    else{
        res.status(200).json({
            message: 'Order could not fetched!',
          });
    }
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
    const id =  req.params.orderId;
    if(id === 'order1')
    {
        res.status(200).json({
          message: 'Order Deleted!',
          id: id
        });
    }
    else{
        res.status(200).json({
            message: 'Order could not Delete!',
          });
    }
});
module.exports = router;