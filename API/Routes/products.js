const express = require('express');
const router = express.Router();
const Product = require('../Models/product');
const mongoose = require('mongoose');

router.get('/', (req, res, next) =>{
   Product.find()
   .select('name _id description price')
   .exec()
   .then(result => {
       const response = {
          count: result.length,
          product: result.map( resul => {
             return {
                _id: resul._id,
                name: resul.name,
                description: resul.description,
                price: resul.price,
                request: {
                   type: 'GET',
                   url: '192.168.0.100:5000'
                }
             }
          })
       };

       res.status(200).json(response);
   })
   .catch(err => {
       res.status(500).json({error: err});
   });
});

router.post('/', (req, res, next) =>{
    //creates a product object.
    const product = new Product({
          _id: mongoose.Types.ObjectId(),
          name: req.body.name,
          description: req.body.description,
          price: req.body.price
    });

    //Saves the product object to the Database.
    product.save()
    .then(result => {
        res.status(200).json({
           message: 'Product Saved to D',
           Product: {
              name: result.name,
              description: result.description,
              price: result.price,
              request: {
                 type: 'POST',
                 url: '192.168.0.100:5000'
              }
           }
        });
        console.log('' + result);
    })
    .catch(err => {
        console.log('Product could not be Saved to DB' + err);
    });

    res.status(200).json({
     message: "Handling POST requests in Products!",
     Product: product
    });
 });


router.get('/:productId', (req, res, next) =>
{
   const id = req.params.productId
   Product.findById(id)
   .select('name _id description price')
   .exec()
   .then(result => {
      const response = {
         count: result.length,
         product: {
            _id: result._id,
            name: result.name,
            description: result.description,
            price: result.price,
            request: {
               type: 'GET',
               url: '192.168.0.100:5000'
            }
         }
      }

      if(result)
      {
        //console.log("ID Found in DB", result);  
        res.status(200).json(response);
      }
      else
      {
        console.log("ID not Found in DB", err);
        res.status(404).json({message: "ID valid not found in DB"});
      }
     
   })
   .catch(err =>{
      console.log(err);
      res.status(500).json({error: err});
   });
});

router.patch('/:productId', (req, res, next) =>
{
   const id = req.params.productId;
   const updateops = {};
   for(const ops of req.body)
   {
     updateops[ops.propName] = ops.value;
   }

   Product.updateOne({ _id: id }, { $set: updateops })
   .exec()
   .then(result => {
       
       res.status(200).json({result});
   })
   .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
   });
});

router.delete('/:productId', (req, res, next) =>
{
   const id = req.params.productId;
   Product.remove({_id: id})
   .exec()
   .then(result =>{
      res.status(200).json({
         message: 'Product Deleted!',
         type: 'POST',
         url: '192.168.0.100:5000',
         data: {name: 'String', price: 'Number', description: 'String', _id: 'ObjectId'}
      });
   })
   .catch(err => {
    console.log("Product Could not be Removed from DB", err);
    res.status(500).json({err});
   });
});

module.exports = router;