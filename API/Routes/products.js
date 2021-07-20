const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
   res.status(200).json({
    message: "Handling GET requests in Products!"
   });
});

router.post('/', (req, res, next) =>{
    const productInfo = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }

    res.status(200).json({
     message: "Handling POST requests in Products!",
     Product: productInfo
    });
 });


router.get('/:productId', (req, res, next) =>
{
   const id = req.params.productId
   if(id === 'special') 
   {
       res.status(200).json({
            message: 'ID Found',
            id: id
       });
   }
   else{
       res.status(200).json({
           message: 'ID Not Found'
       });
   }
});

router.patch('/:productId', (req, res, next) =>
{
   res.status(200).json({
       message: 'Updated product!'
   });
});

router.delete('/:productId', (req, res, next) =>
{
   res.status(200).json({
       message: 'Deleted product!'
   });
});

module.exports = router;