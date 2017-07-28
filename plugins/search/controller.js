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
				'maxResults':8,
				'videoEmbeddable': 'true',
				'videoSyndicated': 'true',
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
            //Set cc_load_policy=1 to force captions
			
			$scope.video = '//www.youtube.com/embed/' + results.data.items[0].id.videoId + '?autoplay=1&controls=0';


			Focus.change("video");
		});
	});
	
	searchYouTube("Demi Lovato - sorry not sorry").then(function (results) {
		//Set cc_load_policy=1 to force captions
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
			
		console.log(videoObj);
		
		// $scope.video = 'http://www.youtube.com/embed/' + results.data.items[0].id.videoId + '?autoplay=1&controls=0';
		
		Focus.change("video");
	});
		
		

    //Stop video
	// SpeechService.addCommand('video_stop', function () {
		// Focus.change("default");
		// stopVideo();
	// });

	// $rootScope.$on('focus', function (targetScope, newFocus, oldFocus) {
		// if(oldFocus == "video" && newFocus != "video"){
			// stopVideo();
		// }
	// })

}

angular.module('SmartMirror')
    .controller('Search', Search);
	

	