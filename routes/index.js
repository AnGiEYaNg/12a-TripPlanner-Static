var express = require('express');
var router = express.Router();
var models = require('../models/index');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var ThingToDo = models.ThingToDo;
//var app=require('../app');

// var async = require('async')//for async ex
router.get('/', function(req, res, next) {
	//Method 1: sync:
	// Hotel.find({}, function(err, hotels) {
	//     Restaurant.find({}, function(err, restaurants) {
	//         ThingToDo.find({}, function(err, thingToDo) {
	//             res.render('index', {
	//                 all_hotels: hotels,
	//                 all_restaurants: restaurants,
	//                 all_things_to_do: thingToDo
	//             });
	//         });
	//     });
	// });

	/* call back hell
	Hotels
		Restaurants
			ThingToDo 
	*/

	//Method 2: async:

	// async.parallel({
	// 	hotels:function(done){
	// 		models.Hotel.find(done)
	// 	},
	// 	restaurants:function(done){
	// 		models.restaurants.find(done)
	// 	},
	// 	thingToDo:function(done){
	// 		models.thingToDo.find(done)
	// 	},

	// },function(err, resultsHash){
	// 	res.json(resultsHash);
	// })

// method 2: async
/*
Hotels
--------
Restarants
-------
thingsTodo
-----
               */

	//Method 3: Promises (sync, slow)
	// Hotel
	// .find()
	// .exec()
	// .then(function(hotels){
	// 	res.locals.hotels = hotels
	// 	return models.Restaurant.find().exec()
	// })//returns an array
	// .then(function(restaurants){
	// 	res.locals.restaurants = restaurants
	// 	return models.ThingToDo.find().exec()
	// })
	// .then(function(thingToDo){
	// 	res.locals.thingToDo = thingToDo
	// 	res.json(res.locals);
	// })

	/*
Hotels
--------
        Restarants
        -------
               thingsTodo
               ----
*/

	//Method 4 fast promises
	//Promise.all([])
	Promise.join(
		Restaurant.find().exex(),
		thingToDo.find().exex(),
		Hotels.find().exec
		)
		.spread(function(resturants, thingsToDo, hotels){
			res.render('inded',{
				hotels:hotels,
				restaurants: restaurants,
				thingsToDo,thingsToDo
			})
		})
});

router.get('/error/', function(req, res, next) {
    
    //models.Page.find(function(err, docs) {
        res.render('error', {title: 'error', docs: docs});
    
    //})
});

module.exports = router;