UNION BANK FLOWPLAYER VIDEO PLAYER IMPLEMENTATION

The Union Bank Video Player is implemented as a jQuery plugin that is passed parameters via a JSON Object that is populated by values from the CMS.

////////////////////////////////////////////////////////////////////////////////////

Package contents (* files are for demonstration purposes only and not necessary for implementation):
	* config.html (demonstration example of the CMS configuration options needed to display a video)
	* video.html (video demonstration page)
	jquery.min.js (v1.6.2) 
	flowplayer-3.2.6.min.js (necessary to implement and configure FlowPlayer)
	videoplayer.js (includes Flowplayer iPad plugin)
	flowplayer.commercial-3.2.7.swf (flowplayer SWF)
	flowplayer.rtmp-3.2.3.swf (flowplayer streaming plugin)
	flowplayer.akamai-3.2.0.swf (flowplayer amakmai plugin)
	flowplayer.controls-3.2.5.swf (flowplayer controls skin)
	style.css (styles in this document should be placed into existing site CSS)
	[img]
		video_loader_3d.png (player background image)
		video_logo.png (player watermark logo displayed in upper right of Flash player)
		video_logo_sm.png (logo that sits in the share bar that displays below the player)

For demonstration purposes, submitting the form on config.html will bring up video.html and pass the form values via the query string.

config.html shows the fields that need to be implemented in the CMS in order to configure an instance of a video player. The inputs in config.html represent each of the necessary parameters required for a proper video instantiation. The values of these parameters will need to be printed to the page.

Video parameter spec:

	{{VIDID}} 		: 	String	: Unique ID. Can be generated randomly, just needs to be unique in any page
	{{ELEMID}} 		: 	String	: Tracking Element ID
	{{AUTOPLAY}} 	: 	String	: Set to true (checked) to have video play as soon as it loads
	{{WIDTH}} 		: 	String	: The desired width in which to display the video
	{{HEIGHT}} 		: 	String	: The desired width in which to display the video
	{{SHAREBAR}} 	: 	Boolean	: true (checked) shows the share bar underneath the video / false (unchecked) hides the share bar
	{{MOBVIDURL}}	:	String 	: URL of the iOS-compatable video
	{{BRANDED}} 	: 	Boolean : true (checked) will display Union bank branding in and around player / false (unchecked) displays an unbranded player 
	{{LOGOLINK}} 	:	String 	: URL that the logo links to when clicked


To instantiate a video player instance the following code is needed in the web page, as shown in video.html. Values in brackets "{{}}" represent vales set in the CMS and printed to the page:

	<div id="{{VIDID}}" class="video_area"></div>
	<script type="text/javascript">
		$("#{{VIDID}}").makeVideo(//JSON Object tobe populated for configuration of each video player instance
			{
				"elementID" : {{ELEMID}},
				"videoURL" : {{VIDURL}},
				"autoPlay" : {{AUTOPLAY}},
				"width" : {{VIDWIDTH}},
				"height" : {{VIDHEIGHT}},
				"sharebar" : {{SHOWSHARE}},
				"mobileVideoURL" : {{MOBVIDURL}},
				"branded" : {{BRANDED}},
				"logoLink" : {{LOGOLINK}}
			}
		);
	</script>


There are some values in the $.fn.makeVideo.paths object of videoplayer.js that should be changed to reflect the location of files in the Union Bank file system. The values to change are:
	"mainPlayer"		:	"flowplayer.commercial-3.2.7.swf",
	"rtmpPlugin"		:	"flowplayer.rtmp-3.2.3.swf",
	"akamaiPlugin"		:	"flowplayer.akamai-3.2.0.swf",
	"controlsPlugin"	:	"flowplayer.controls-3.2.5.swf",
	"videoLogo"			:	"img/video_logo.png"

There are two background-image declarations in the style.css that should be changed to reflect the location of files in the Union Bank file system. The values to change are:
	.video_area.branded .share_bar .logo { background-image: url(img/video_logo_sm.png); }
	.video_area.branded .video_player { background-image: url(img/video_loader_3d.png); }

Several tracking events are caught in the player and then call the $.fn.makeVideo.vidTrack() function. In vidTrack() is where the event is handled and this is where a custom tracking function code can be executed.

Tracking events that exist:
	loaded		:	video player has been loaded
	play		:	user started playing the video
	pause		:	user paused the video
	resume		:	user resumed the video from paused state
	seek		:	user moved the playhead. Event data contains the playhead's new position time in milliseconds
	progress	:	event fired when playing at 25, 50 and 75% of the video's duration. Possible event data of "25%", "50%" and "75%"
	finish		:	end of the video has been reached 
	mute		:	user muted the video
	unmute		:	user unmuted the video
	volume		:	user changed the volume of player. Event data contains the user's chosen volume level (0-100)
	fullscreen	:	video entered full-screen mode
	fullscreen	:	video exited full-screen mode

In the vidTrack( name:String, eventdata ) function there are two arguments. With in this function is where the proprietary  code is to be created to send tracking calls to your analytics provider:
Arguments:
	name	:	String	:	The event name, from the list above
	data	:	String	:	Any extra event data

