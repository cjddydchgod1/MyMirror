
=====================================
=					   				=  
=			General Docs			=
=									=  
=====================================
====================================================================

1. Layout (CSS 테마) 
	
	****
	*
	*	Path 		: /app/js/
	*	View		: /index.html
	*	Controller	: /app/js/controller.html	:: themeController
	*	Config.js 	: general/layout
	*	Options		: config.general.layout 	:: CSS NAME
	*
	****
	
	- CSS 파일을 Config.general.layout에  정의된 {val-Name}.css 로 로딩 

--------------------------------------------------------------------
	
====================================================================



 
=====================================
=					   				=  
=			PlugIn Docs				=
=									=  
=====================================
====================================================================

1. Greeting (초기(대문)화면)
	
	****
	*
	*	Path 		: /plugin/greeting/
	*	View		: /index.html
	*	Controller	: /plugin/greeting/controller.html
	*	Config.js 	: greeting 
	*	Options		: allDay / time
	*
	****
	
	- AllDay : 하루 종일 배열에서 랜덤
	- Time	 : 시간 구간 별 배열에서 랜덤

----------------------------------------------------------------------

2. ForeCast (DarkSky API)
	
	****
	*
	*	Path 		: /plugin/weather/
	*	View		: /weather/index.html
	*	Controller	: /plugin/weather/controller.html
	*	Config.js 	: forecast 
	*	Options		: key / units / refreshInterVal
	*	restFullApi : https://darksky.net/dev/
	*
	****
	
	- darkSky API : 발급된 API 이용
	- Limits : 1,000/day (-> default refreshInterVal : 2min == 720/day)
	- 한국어 지원 X 
	- icon Animation 함수 존재 -> $scope.icnoLoad :: 추후 Check123

----------------------------------------------------------------------

2. Geolocation (Optional Setting) :: dafault service
	
	****
	*
	*	Path 		: /plugin/gelocation/
	*	View		: /index.html
	*	Controller	: /plugin/gelocation/service.js
	*	Config.js 	: geolocation 
	*	Options		: latitude / longitude
	*	restFullApi : https://maps.googleapis.com/maps/api/browserlocation/json?browser=chromium
	*
	****
	
	- default : 구글 API 사용해서 geolocation 획득(GPS X)
	- optional : config에 수동 입력으로 geolocation 고정 가능

----------------------------------------------------------------------

3. 	Calandar(iCal Parser)
	
	****
	*
	*	Path 		: /plugin/calandar/
	*	View		: /plugin/calandar/index.html
	*	Controller	: /plugin/calandar/controller.js
	*	Config.js 	: calendar 
	*	Options		: maxResults, maxDays, showCalendarNames
	*
	****
	
	- iCal Url : 등록후 로딩 -> Parsing -> Show
	- iCal 규격
		https://support.google.com/calendar/answer/37118?hl=ko
	- iCal에 전체 달력 일정 나오는듯...? Past, toatlEvent, Future Event 로 분기해서
		Get 가능
	- Google Calandar : 비공개 주소로도 이용가능
		
----------------------------------------------------------------------

4. 	Giphy(gif Search API)
	
	****
	*
	*	Path 		: /plugin/giphy/
	*	View		: /plugin/giphy/index.html
	*	Controller	: /plugin/giphy/controller.js
	*	Config.js 	: giphy 
	*	Options		: key
	*	restFullApi : https://developers.giphy.com/docs/
	*
	****
	
	- default key : dc6zaTOxFJmzC :: Fixed Key
		
----------------------------------------------------------------------

5. 	YouTube(YouTube Search API)
	
	****
	*
	*	Path 		: /plugin/search/
	*	View		: /plugin/search/index.html
	*	Controller	: /plugin/search/controller.js
	*	Config.js 	: youtube 
	*	Options		: key
	*	restFullApi : https://developers.google.com/youtube/v3/getting-started#before-you-start
	*
	****
	
	- youtube V3 API 참조
	- Angular WhiteList Exception 처리 필요 : /app/app.js :: config.$sceDelegateProvider
		
----------------------------------------------------------------------

6. 	SoundCloud(SoundCloud Search API)  :: 현재 SoundCloud API Register Broken 인듯...   :: 추후 Check123
	
	****
	*
	*	Path 		: /plugin/soundcloud/
	*	View		: /plugin/soundcloud/index.html
	*	Controller	: /plugin/soundcloud/controller.js
	*	Config.js 	: soundcloud 
	*	Options		: key
	*	restFullApi : https://soundcloud.com/you/apps
	*
	****
		
----------------------------------------------------------------------

7. 	Traffic(BingMaps Portal API)
	
	****
	*
	*	Path 		: /plugin/traffic/
	*	View		: /plugin/traffic/index.html
	*	Controller	: /plugin/traffic/controller.js
	*	Config.js 	: traffic 
	*	Options		: key
	*	restFullApi : https://www.bingmapsportal.com/Application
	*	restFullApi : https://msdn.microsoft.com/en-us/library/ff701717.aspx    :: Calcualte a Route API
	*
	****
	
	- 출발/도착지 교통 별 소요 시간 계산 API
	- Bing Maps API > Calculate  a Route API 사용 
	- 사용 Plugin Service :: TimeboxService :: /plugin/timebox/ :: 추후 Check123
		
----------------------------------------------------------------------

8. 	TV Shows(epguides list API)
	
	****
	*
	*	Path 		: /plugin/tvshow/
	*	View		: /plugin/tvshow/index.html
	*	Controller	: /plugin/tvshow/controller.js
	*	Config.js 	: tvshows 
	*	Options		: tv show names / refresh interval 
	*	restFullApi : http://epguides.frecar.no/
	*
	****
	
	- eqguides tv show li api 
	- 자체 리스트만 가능한듯
		
----------------------------------------------------------------------
		
====================================================================