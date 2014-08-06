// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 
	var schema   = mongoose.Schema;
	var objectId = schema.ObjectId;

	
					// mongoose for mongodb

	// configuration =================

	mongoose.connect('mongodb://user:user@novus.modulusmongo.net:27017/pahyrO9r'); 	// connect to mongoDB database on modulus.io

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
 		console.log("Conncection Success !");
	});

	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
	});

	var restaurantSchema =mongoose.Schema ({
		_id: objectId,
		name:{type:String, required:true},
		address:{type:String, required:true},
		location:{type:String, required:true},
		contact:{type:Number, required:true},
		category:{type:String, required:true},
		rating:{type:Number, required:true}
	});

	var Restaurant=mongoose.model("Restaurant",restaurantSchema);

	app.get('/api/restaurants',function(req,res){
		Restaurant.find(function(err,restaurants){
			if(err){
				res.send(err);
			}
			res.json(restaurants);
		});
	});

	app.post('/api/restaurants',function(req,res){
		Restaurant.create({
			name:req.body.name,
			address:req.body.address,
			location:req.body.location,
			contact:req.body.contact,
			category:req.body.category,
			rating:req.body.rating,
			done:false
		},function(err,restaurant){
				if(err)
					res.send(err);


				Restaurant.find(function(err,restaurants){
					if(err)
						res.send(err);
					res.json(restaurants);
				});
		});
	});
	
	app.delete('/api/restaurants/:restaurant_id',function(req,res){
		Restaurant.remove({
			_id:req.params.restaurant_id
		},function(err,restaurant){
			if(err)
				res.send(err);

			Restaurant.find(function(err,restaurants){
				if(err)
					res.send(err);
				res.json(restaurants);
			});
		});
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/View/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});


	// listen (start app with node server.js) ======================================
	app.listen(process.env.PORT || 5000);
	console.log("App listening on port 8080");
