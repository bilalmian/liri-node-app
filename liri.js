var keys = require('./keys.js');
var fs = require('fs');
var request = require('request');
var prompt = require('prompt');
var Twitter = require('twitter');
var Spotify = require('spotify');

//Twitter API Function
function twitter(twitterHandle){
	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});
	 
	var params = {screen_name: twitterHandle, count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	  	console.log("\n---------------------\n");
	  		for (var i = 0; i < params.count; i++) {
	  			console.log("@" + tweets[i].user.screen_name);
		      	console.log("Tweet " + "#" + (i + 1) + ": " + tweets[i].text);
		      	console.log("Created: " + tweets[i].created_at + "\n");
		  	}
		console.log("\n---------------------\n");
	  }
	});
}

//Spotify API Function
function spotify(song){
	if (!song) {song = 'Whats my age again'};

	var spotify = require('spotify');
	 
	spotify.search({ type: 'track', query: song}, function(err, data) {
	    if (!err) {
	        for (var i = 0; i < 10; i++) {
	        	if (data.tracks.items[i] != undefined) {
			    	console.log('Artist: ' + data.tracks.items[i].artists[0].name)//Artist name
			    	console.log('Song: ' + data.tracks.items[i].name)//Song name
			    	console.log('Album: ' + data.tracks.items[i].album.name)//Album name
			    	console.log('Preview Url: ' + data.tracks.items[i].preview_url)//Preview URL
			    }
	        }

	    } else {
	    	console.log('Error occurred: ' + err);
	        return;
	    }
	});
}

//OMDB API movie function
function omdB(movie){
	if(!movie) {movie = 'Mr. Nobody'};
	Request('http://www.omdbapi.com/?t=' + choice + '&y=&plot=short&r=json', function (error, response, body) {
		if(!error & response.statusCode = 200) {
			var info = JSON.parse(body)
			console.log("\n---------------------\n");
			console.log("Title: " + info.Title);
			console.log("Year: " + info.Year);
			console.log("IMDB Rating: " + info.imdbRating);
			console.log("Country: " + info.Country + "\n");
			console.log("Plot: " + info.Plot);	
			console.log("Starring: " + info.Actors + "\n");

			console.log("Tomato Score: " + info.tomatoUserMeter);
			console.log("Tomato URL: " + info.tomatoURL);
			console.log("\n---------------------\n");
		} else {
			console.log('Error occurred' + error);
			return;
		}
	});
}