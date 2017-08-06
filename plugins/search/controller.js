function Search($scope, $http, SpeechService, $rootScope, Focus) {
	var youtubedl = require('youtube-dl');
	var videoObj = [];
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



    //Search for a video
	SpeechService.addCommand('video_search', function (query) {
		searchYouTube(query).then(function (results) {
			videoObj = [];
			angular.forEach(results.data.items, function (item, index) {
				videoObj.push({
					id : item.id.videoId,
					title : item.snippet.title,
					// thumb : item.snippet.thumbnails.default
					 thumb : "https://i.ytimg.com/vi/"+item.id.videoId
				});
			});
			$scope.items = videoObj;
			playVideo(videoObj[0]);
			
		});
	});
	
	 //Stop video
	SpeechService.addCommand('video_stop', function () {
		stopVideo();
	});
	
	//Next Video
	SpeechService.addCommand('video_next', function () {
		if(Focus.get()!="video") return;
		var idx = $(".selected").index(".itemWrapper");
		if(idx+1 == $(".itemWrapper").length) idx = -1;
		$(".selected").removeClass("selected");
		$(".itemWrapper").eq(idx+1).addClass("selected");
		playVideo(videoObj[idx+1]);
	});
	
	//Previous Video
	SpeechService.addCommand('video_prev', function () {
		if(Focus.get()!="video") return;
		var idx = $(".selected").index(".itemWrapper");
		if(idx == 0) return;
		$(".selected").removeClass("selected");
		$(".itemWrapper").eq(idx-1).addClass("selected");
		playVideo(videoObj[idx-1]);
	});
	
	var playVideo =  function(obj){
		var url = 'http://www.youtube.com/watch?v='+obj.id;
		var option = {maxBuffer:2000*1024};
		youtubedl.getInfo(url, [], option, function(err, info) {
			// $scope.video = info.url;
			$(".videoPlayer").html('<video class="video" name="media"><source src="'+info.url+'" type="video/webm"></video> ');
			AutoSleep.ServieManager("stop")
			Focus.change("video");
			
			setTimeout( function() {
				$(".videoPlayer").find(".video").get(0).play();

				$(".videoPlayer").find('.video').on('ended',function(){
					stopVideo();
				});
				
			}, 1000 );
				
		});
	}
	
	
	
	var stopVideo = function() {
		// var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
		// iframe.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		$(".videoPlayer").html("");
		Focus.change("default");
		AutoSleep.ServieManager("start")
		
	}
	
	
	searchYouTube("kanye chainsmoker").then(function (results) {
		videoObj = [];
		angular.forEach(results.data.items, function (item, index) {
			videoObj.push({
				id : item.id.videoId,
				title : item.snippet.title,
				// thumb : item.snippet.thumbnails.default
				 thumb : "https://i.ytimg.com/vi/"+item.id.videoId
			});
		});
		$scope.items = videoObj;
		playVideo(videoObj[0]);
		
	});
	

		
}

angular.module('SmartMirror')
    .controller('Search', Search);
	

	