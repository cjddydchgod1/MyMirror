function AutoSleep($http, $q, SpeechService,AutoSleepService) {


    // Hide everything and "sleep"
	SpeechService.addCommand('sleep', function () {
		console.debug("Ok, going to sleep...");
		AutoSleepService.sleep();
	});
	
	AutoSleep.ServieManager = function(mode) {
		switch(mode){
			case "stop":
				AutoSleepService.stopAutoSleepTimer();
				break;
			case "start":
				AutoSleepService.startAutoSleepTimer();
				break;
		}
		
	}

}

angular.module('SmartMirror')
    .controller('AutoSleep', AutoSleep);