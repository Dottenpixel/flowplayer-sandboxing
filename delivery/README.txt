UNION BANK FLOWPLAYER VIDEO PLAYER IMPLEMENTATION
////////////////////////////////////////////////////////////////////////////////////

Package contents:
	jquery.min.js (v1.6.2) 
	videoplayer.js (includes Flowplayer iPad plugin)
	flowplayer.commercial-3.2.7.swf (flowplayer SWF)
	flowplayer.rtmp-3.2.3.swf (flowplayer streaming plugin)
	flowplayer.akamai-3.2.0.swf (flowplayer amakmai plugin)
	flowplayer.controls-3.2.5.swf (flowplayer controls skin)
	style.css (styles in this document should be placed into existing site CSS)
	video.html (video demonstration page)
	config.html (example of the CMS configuration options needed to display a video)

The Union Bank Video Player is implemented as a jQuery plugin that is passed parameters via a JSON Object that is populated by values from the CMS.

config.html shows the CMS fields that need to be implemented in the CMS in order to configure an instance of a video player. The inputs in config.html represent each of the necessary parameters required for a proper video instantiation. The values of these parameters will need to be printed to the page.

Parameter spec:

{{VIDID}} 		: 	String	: Unique ID. Can be generated randomly, just needs to be unique in any page
{{ELEMID}} 		: 	String	: Tracking ID
{{AUTOPLAY}} 	: 	String	: Set to true(checked) to have video play as soon as it loads
{{WIDTH}} 		: 	String	: The desired width in which to display the video
{{HEIGHT}} 		: 	String	: The desired width in which to display the video
{{SHAREBAR}} 	: 	Boolean	: true(checked) shows the share bar underneath the video / false(unchecked) hides the share bar
{{MOBVIDURL}}	:	String 	: URL of the iOS compatable
{{BRANDED}} 	: 	Boolean : true(checked) will display Union bank branding in and around player / false(unchecked) displays an unbranded player 
{{LOGOLINK}} 	:	String 	: URL that the logo links to when clicked


To instantiate a video player instance the following code is needed in the web page. Demonstrated in video.html. Values in brackets "{{}}" represent vales set in the CMS and printed to the page:

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


Values in videoplayer.js that should be changed to reflect the location of file in the Union Bank file system:

