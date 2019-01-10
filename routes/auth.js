var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
var Users = require('../bdd/Users.js')
var jwt = require('jsonwebtoken');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(404).send(JSON.parse('{"error": "Not found !"}'))
});

router.post('/', function(req, res, next) {
  /*var query = url.parse(req.url,true).query*/
  var user = new Users(req.body.email, req.body.password);
  console.log(req.body.email)

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     'http://localhost:3000/find',
    body:    '{"email": "'+ req.body.email +'"}'},
    function(error, response, body){
    var us = JSON.parse(body)

    if(response.statusCode != 200) {
        return res.status(response.statusCode).send(JSON.parse('{"error":"Aucun utilisateur pour ces identifiants"}'))
    }
    else {
        bcrypt.compare(user.getPassword(), us.password, (err, isValid) => {
          if (err) {
            console.log(err)
            return res.status(401).send(JSON.parse('{"error":"Ces identifiants sont incorrectes"}'))
          }
          else if (!isValid) {
            console.log(isValid)
            return res.status(401).send(JSON.parse('{"error":"Ces identifiants sont incorrectes"}'))
          }
          else {
            var token = jwt.sign({ name: us.name, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, 'secret');
            return res.send(JSON.parse('{"token":"'+token+'"}'))
          }
        })   
    }   
});
})

module.exports = router;
