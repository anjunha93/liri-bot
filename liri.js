var twitterKeys = require("./keys.js")
var Twitter = require('twitterKeys');
var Spotify = require('node-spotify-api')
var request = require('request')
var fs = require("fs")
 
var client = new Twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
});

if (process.argv[2] === "my-tweets") {
    if (process.argv[3]) {
        var screenName = process.argv[3];
    } else {
        var screenName = helloworld9399
    }

    var params = {screen_name: screenName};
    
    tweets(params);

} else if (process.argv[2] === "spotify-this-song") {
    if (process.argv[3]) {
        var songName = process.argv[3];
    } else {
        var songName = "The Sign Ace of Base"
    }

    spotify(songName);

} else if (process.argv[2] === "movie-this") {

    if (process.argv[3]) {
        var movieName = process.argv[3];
    } else {
        var movieName = "Mr. Nobody"
    }

    movie(movieName);

} else if (process.argv[2] === "do-what-it-says") {
    
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error) {
            return console.log(error);
        }

    var dataArr = data.split(",");

        if(dataArr[0] === "my-tweets") {
            if (dataArr[1]) {
                var screenName = dataArr[1];
            } else {
                var screenName = helloworld9399
            }
        
            var params = {screen_name: screenName};
            
            tweets(params);
        
        } else if (dataArr[0] === "spotify-this-song") {
            if (dataArr[1]) {
                var songName = dataArr[1];
            } else {
                var songName = "The Sign Ace of Base"
            }
        
            spotify(songName);
        
        } else if (dataArr[0] === "movie-this") {
        
            if (dataArr[1]) {
                var movieName = dataArr[1];
            } else {
                var movieName = "Mr. Nobody"
            }
        
            movie(movieName);
        
        }

    });
    
}

function tweets(params) {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length; i++)
    console.log(tweets);
    }
    });
};


function spotify(songName) {
    var spotify = new Spotify({
        id: 'dfac293dc8e448d89c0e144eecbeeb2b',
        secret: '82fb5efced714e97b88ab51b401d2685'
      });
       
      spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        var song = data.tracks.items[0];
        console.log(data)
       
      
      });
};



function movie(movieName) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName.replace(/ /g, "+") + "&y=&plot=short&apikey=40e9cece";
	console.log(queryUrl)
	request(queryUrl, function(error, response, body) {
		if(!error && response.statusCode === 200){

			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
			console.log("Rotten Tomatos Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
			console.log("\n")
		}
	});
}


