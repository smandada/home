var User = require('../models/user');
var Story = require('../models/story');
var config = require('../../config');
var secretKey = config.secretKey;
var jwt = require('jsonwebtoken');

function createToken(user) {
  var token = jwt.sign({
    id: user.id,
    name: user.name,
    username: user.username
  }, secretKey, {
    expiresIn: '1d'
  });
  return token;
}

module.exports = function(app, express){
  var api = express.Router();
  
  api.post('/signup', function(req, res){
    var user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });
    user.save(function(err){
      if (err) {
        res.send(err);
        return;
      }
      res.json({ message: 'User has been created!'});
    });
  });

  api.get('/users', function(req, res){
    User.find({}, function(err, users){
      if (err) {
        res.send(err);
        return;
      }
      res.json(users);
    });
  });

  api.post('/login', function(req,res) {
    User.findOne().select('password').exec(function(err, user){
      if(err) throw err;

      if(!user) {
        res.send({ message: "User doesn't exist"});
      } else if (user) {
        var validPassword = user.comparePassword(req.body.password);

        if (!validPassword) {
          res.send( {message: "Invalid Password"} );
        } else {
          var token = createToken(user);
          res.json({
            success: true,
            message: 'Successful',
            token: token
          });
        }
      }
    })
  });

  api.use(function(req, res, next){
    var token = req.body.token || req.params['token'] || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, secretKey, function(err, decoded){
        if (err) {
          res.status(403).send({ success: false, message: 'Failed to authenticate user!'})
        } else {
          req.decoded = decoded;
          next();
        }
      })
    } else {
      return res.status(403).send({ success: false, message: 'Missing token, try login again.'})
    }
  });

  // api.get('/', function(req, res) {
  //     res.json("Hello Node Bozz!")
  // })

  api.get('/stories', function(req, res){
    Story.find({}, function(err, stories){
      if (err) {
        res.send(err);
        return;
      }
      res.json(stories);
    });
  });

  api.route('/')
    .post(function(req, res){
      var story = new Story({
        creator: req.decoded.id,
        content: req.body.content,
      });

      story.save(function(err) {
        if(err) {
          res.send(err);
          return;
        }
        res.json({message: "New Story Created"});
      })

    })


  return api;

}