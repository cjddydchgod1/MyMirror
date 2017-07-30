function Search($scope, $http, SpeechService, $rootScope, Focus) {
	var searchYouTube = function (query) {		
		return $http({
			url: 'https://www.googleapis.com/youtube/v3/search',
			method: 'GET',
			params: {
				'part': 'snippet',
				'order': 'relevance',
				'q': query,
				'type': 'video',
				'maxResults':21,
				// 'videoEmbeddable': 'true',
				// 'videoSyndicated': 'true',
				'key': config.youtube.key
			}
		});
	}

	var stopVideo = function() {
		var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
		iframe.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
	}

    //Search for a video
	SpeechService.addCommand('video_search', function (query) {
		searchYouTube(query).then(function (results) {
			var videoObj = [];
			angular.forEach(results.data.items, function (item, index) {
				if(!item.snippet.description.includes('Provided')){
					videoObj.push({
						id : item.id.videoId,
						title : item.snippet.title,
						thumb : item.snippet.thumbnails.default
					});
				}
			});
			
			$scope.items = videoObj;
			$scope.video = 'http://www.youtube.com/embed/' + videoObj[0].id + '?autoplay=1&controls=0';
			AutoSleep.ServieManager("stop")
			Focus.change("video");
		});
	});
	
	 //Stop video
	SpeechService.addCommand('video_stop', function () {
		Focus.change("default");
		stopVideo();
		AutoSleep.ServieManager("start")
	});

	$rootScope.$on('focus', function (targetScope, newFocus, oldFocus) {
		if(oldFocus == "video" && newFocus != "video"){
			stopVideo();
			AutoSleep.ServieManager("start")
		}
	})
	
	

	// var request = require('request');
	// var options = {
	  // url: 'https://www.youtube.com/get_video_info?video_id=Yj3Il9rKQO4',
	  // headers: {
		// 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36'
	  // }
	// };

	// function callback(error, response, body) {
		// console.log(error);
		// console.log(response);
		// console.log(body);
	// }

	// request(options, callback);


	// $scope.video = 'http://www.youtube.com/embed/Yj3Il9rKQO4?autoplay=1&controls=0';
	// AutoSleep.ServieManager("stop")
	// Focus.change("video");
	
	searchYouTube("kanye chainsmokers").then(function (results) {
		var videoObj = [];
		angular.forEach(results.data.items, function (item, index) {
			videoObj.push({
				id : item.id.videoId,
				title : item.snippet.title,
				// thumb : item.snippet.thumbnails.default
				 thumb : "https://i.ytimg.com/vi/"+item.id.videoId
			});
		});
		console.log(results.data);
		$scope.items = videoObj;
		// $scope.video = 'http://www.youtube.com/embed/' + videoObj[0].id + '?autoplay=1&controls=0';
		// AutoSleep.ServieManager("stop")
		// Focus.change("video");
	});
		
		
	var youtubedl = require('youtube-dl');
	var url = 'http://www.youtube.com/watch?v=kdemFfbS5H0';
	var option = {maxBuffer:2000*1024};
	youtubedl.getInfo(url, [], option, function(err, info) {
	  if (err) throw err;

	  console.log('id:', info.id);
	  console.log('title:', info.title);
	  console.log('url:', info.url);
	  console.log('thumbnail:', info.thumbnail);
	  console.log('filename:', info._filename);
	  console.log('format id:', info.format_id);
	  
		$scope.video = info.url;
		AutoSleep.ServieManager("stop")
		Focus.change("video");
			
			
	});
   

}

angular.module('SmartMirror')
    .controller('Search', Search);
	

	