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

	SpeechService.addCommand('audio_search', function (query) {
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
	
	SpeechService.addCommand('audio_stop', function () {
		stopAudio();
	});
	
	SpeechService.addCommand('audio_widget', function () {
		$(".disc-placeholder").addClass("active");
	});
	
	SpeechService.addCommand('audio_next', function () {
		if(Focus.get()!="audio") return;
		var idx = $(".selected").index(".itemWrapper");
		if(idx+1 == $(".itemWrapper").length) idx = -1;
		$(".selected").removeClass("selected");
		$(".itemWrapper").eq(idx+1).addClass("selected");
		playVideo(audioObj[idx+1]);
	});
	
	SpeechService.addCommand('audio_prev', function () {
		if(Focus.get()!="audio") return;
		var idx = $(".selected").index(".itemWrapper");
		if(idx == 0) return;
		$(".selected").removeClass("selected");
		$(".itemWrapper").eq(idx-1).addClass("selected");
		playVideo(audioObj[idx-1]);
	});
	
	var playAudio =  function (obj){
		var url = 'http://www.youtube.com/watch?v='+obj.id;
		var option = {maxBuffer:2000*1024};
		youtubedl.getInfo(url, [], option, function(err, info) {
			// $scope.video = info.url;
			
			//$(".disc-placeholder").addClass("active");
			$(".disc-placeholder").find(".play-button").css("background-image","url("+audioObj[0].thumb+"/hqdefault.jpg)");
			
			
			$("#container").addClass("playing");
			
			console.log(audioObj[0].thumb);
			$scope.items = audioObj;
			$scope.audioThumb = audioObj[0].thumb;
			$scope.audioTitle = audioObj[0].title;
		
			$(".audioPlayer").append('<audio class="audio" name="media"><source src="'+info.url+'" type="video/webm"></audio> ');
			AutoSleep.ServieManager("stop")
			Focus.change("audio");
			
			setTimeout( function() {
				$(".audioPlayer").find(".audio").get(0).play();

				$(".audioPlayer").find('.audio').on('ended',function(){
					stopAudio();
				});
				
			}, 1000 );
				
		});
	}
	
	var stopAudio = function() {
		// var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
		// iframe.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		$(".audioPlayer").find("audio").remove();
		$("#container").removeClass("playing");
		$(".disc-placeholder").removeClass("active");
		Focus.change("default");
		AutoSleep.ServieManager("start")
		
	}
	
	// searchYouTube("kanye chainsmoker").then(function (results) {
		// audioObj = [];
		// angular.forEach(results.data.items, function (item, index) {
			// audioObj.push({
				// id : item.id.videoId,
				// title : item.snippet.title,
				 // thumb : "https://i.ytimg.com/vi/"+item.id.videoId
			// });
		// });
		
		// playAudio(audioObj[0]);
		
	// });
}

angular.module('SmartMirror')
    .controller('SearchAudio', SearchAudio);
	

	