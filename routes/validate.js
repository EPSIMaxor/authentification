var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
    res.status(404).send(JSON.parse('{"error": "Not found !"}'))
});

router.post('/', function(req, res, next) {
    console.log(req.body)
    
    jwt.verify(req.body.token, 'secret', function(err, decoded) {
        var time = new Date(Date.now()/1000)
        if(decoded != undefined) {
            if(decoded.exp > time) {        
                return res.send(true)
            } 
            else {
                return res.status(401).send(false)
            }
        }else {
            return res.status(401).send(false)
        }
      });
});


module.exports = router