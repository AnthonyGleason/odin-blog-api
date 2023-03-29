var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api', function(req, res, next) {
  res.json({message: 'welcome to the api'});
});
router.post('/api/login',function(req,res,next){
  
});
module.exports = router;
