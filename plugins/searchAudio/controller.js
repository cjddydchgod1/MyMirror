function SearchAudio($scope, $http, SpeechService, $rootScope, Focus) {
	var youtubedl = require('youtube-dl');
	var audioObj = [];
	
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

	SpeechService.addCommand('video_search', function (query) {
		searchYouTube(query).then(function (results) {
			audioObj = [];
			angular.forEach(results.data.items, function (item, index) {
				audioObj.push({
					id : item.id.videoId,
					title : item.snippet.title,
					 thumb : "https://i.ytimg.com/vi/"+item.id.videoId
				});
			});
			$scope.items = audioObj;
			playVideo(audioObj[0]);
			
		});
	});
	
	SpeechService.addCommand('video_stop', function () {
		stopVideo();
	});
	
	SpeechService.addCommand('video_next', function () {
		if(Focus.get()!="video") return;
		var idx = $(".selected").index(".itemWrapper");
		if(idx+1 == $(".itemWrapper").length) idx = -1;
		$(".selected").removeClass("selected");
		$(".itemWrapper").eq(idx+1).addClass("selected");
		playVideo(audioObj[idx+1]);
	});
	
	SpeechService.addCommand('video_prev', function () {
		if(Focus.get()!="video") return;
		var idx = $(".selected").index(".itemWrapper");
		if(idx == 0) return;
		$(".selected").removeClass("selected");
		$(".itemWrapper").eq(idx-1).addClass("selected");
		playVideo(audioObj[idx-1]);
	});
	
	var playAudio =  function(obj){
		var url = 'http://www.youtube.com/watch?v='+obj.id;
		var option = {maxBuffer:2000*1024};
		youtubedl.getInfo(url, [], option, function(err, info) {
			// $scope.video = info.url;
			$(".audioPlayer").append('<audio class="audio" name="media"><source src="'+info.url+'" type="video/webm"></audio> ');
			AutoSleep.ServieManager("stop")
			Focus.change("video");
			
			setTimeout( function() {
				$(".audioPlayer").find(".audio").get(0).play();

				$(".audioPlayer").find('.audio').on('ended',function(){
					stopVideo();
				});
				
			}, 1000 );
				
		});
	}
	
	var stopVideo = function() {
		// var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
		// iframe.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		$(".audioPlayer").html("");
		Focus.change("default");
		AutoSleep.ServieManager("start")
		
	}
	
	
	searchYouTube("kanye chainsmoker").then(function (results) {
		audioObj = [];
		angular.forEach(results.data.items, function (item, index) {
			audioObj.push({
				id : item.id.videoId,
				title : item.snippet.title,
				// thumb : item.snippet.thumbnails.default
				 thumb : "https://i.ytimg.com/vi/"+item.id.videoId
			});
		});
		$scope.items = audioObj;
		// playAudio(audioObj[0]);
		AutoSleep.ServieManager("stop")
		$("#container").addClass("playing");
		console.log(audioObj[0].thumb);
		$scope.audioThumb = audioObj[0].thumb;
		$scope.audioTitle = audioObj[0].title;
		Focus.change("video");
		
	});
	
		
}

angular.module('SmartMirror')
    .controller('SearchAudio', SearchAudio);
	

	