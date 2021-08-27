const express = require('express');
const router = express.Router();
const wbm = require('wbm');
const Contact = require('../Models/contact_info');
const puppeteer = require('puppeteer');

router.post('/', (req, res, next) =>{
  
    const contact = new Contact({
        name: req.body.name,
        msg: req.body.msg,
        phone: req.body.phone
    });

    res.status(200).json({
        message: "Handling POST requests in Contacts!",
        Contact: contact
    });

    wbm.start({showBrowser: true, qrCodeData: true, session: true}).then(async () => {
        const phones = ['+923479666466', '+923461236123'];
        const message = "Hello! I'm " + contact.name + ". " + contact.msg;
        await wbm.waitQRCode();
        await wbm.send(phones, message);
        await wbm.end();
    }).catch(err => console.log(err));
});

module.exports = router;