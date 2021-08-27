const express = require('express');
const router = express.Router();
const Cattle = require('../Models/cattle');
const mongoose = require('mongoose');
const multer = require('multer');
 
const storage = multer.diskStorage({
   destination: function(req, file, cb){
     cb(null, './uploads/');
   },
   filename: function(req, file, cb){
     cb(null, new Date().toISOString + file.originalname);
   }
});

const ImageFilter = (req, file, cb) => {
   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
   {
      cb(null, true);
   }
   else
   {
      cb(null, false);
   }
};

const upload = multer({
   storage: storage, 
   limits:
   {
      fileSize: 1024 * 1024 * 5
   },
   fileFilter: ImageFilter
});

router.get('/', (req, res, next) =>{
   Cattle.find()
   .select('name _id description price productImage')
   .exec()
   .then(result => {
       const response = {
          count: result.length,
          cattle: result.map( resul => {
             return {
                _id: resul._id,
                type: resul.type,
                description: resul.description,
                price: resul.price,
                productImage: resul.productImage,
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

router.post('/', upload.single('productImage'), (req, res, next) =>{
   console.log(req.file);
    //creates a product object.
    const cattle = new Cattle({
          _id: mongoose.Types.ObjectId(),
          type: req.body.type,
          description: req.body.description,
          price: req.body.price,
          productImage: req.file.path
    });

    //Saves the product object to the Database.
    cattle.save()
    .then(result => {
        res.status(200).json({
           message: 'Product Saved to D',
           Cattle: {
              type: result.type,
              description: result.description,
              price: result.price,
              productImage: result.productImage,
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
     Cattle: cattle
    });
 });


router.get('/:cattleId', (req, res, next) =>
{
   const id = req.params.cattleId
   Cattle.findById(id)
   .select('type _id description price productImage')
   .exec()
   .then(result => {
      const response = {
         count: result.length,
         cattle: {
            _id: result._id,
            type: result.type,
            description: result.description,
            price: result.price,
            productImage: result.productImage,
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

router.patch('/:cattleId', (req, res, next) =>
{
   const id = req.params.cattleId;
   const updateops = {};
   for(const ops of req.body)
   {
     updateops[ops.propName] = ops.value;
   }

   Cattle.updateOne({ _id: id }, { $set: updateops })
   .exec()
   .then(result => {
       
       res.status(200).json({result});
   })
   .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
   });
});

router.delete('/:cattleId', (req, res, next) =>
{
   const id = req.params.cattleId;
   Cattle.remove({_id: id})
   .exec()
   .then(result =>{
      res.status(200).json({
         message: 'Cattle Deleted!',
         type: 'POST',
         url: '192.168.0.100:5000',
         data: {type: 'String', price: 'Number', description: 'String', _id: 'ObjectId'}
      });
   })
   .catch(err => {
    console.log("Cattle Could not be Removed from DB", err);
    res.status(500).json({err});
   });
});

module.exports = router;