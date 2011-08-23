$.fn.makeVideo = function(o) {
	var $this = $(this);
	console.log(o);
	var playerID = "vid"+o.elementID;
	$this.append(
		$('<a>', {
			"href" : o.videoURL,
			"style" : "display:block;width:640px;height:360px",
			"id" : playerID,
			"name" : playerID,
			"class" : "video_player"
		})
	);
	
	// <a  
	// 	href="http://c3343383.r83.cf0.rackcdn.com/Sean McGuinn.flv"
	// 	style="display:block;width:640px;height:360px"  
	// 	id="vid_012345678"
	// 	class="video_player"
	// 	name="vid_012345678"> 
	// </a>
	// <div class="overlay" style="width:640px;height:360px" >
	// 	<a class="close" href="#">close</a>
	// 	<textarea style="width:620px;height:300px" style="margin: 0;overflow:hidden;"></textarea>
	// </div>
	// <div class="share_bar" style="width:640px;" >
	// 	<a class="embed" href="#">EMBED</a>
	// 	<a class="share" href="#">SHARE</a>
	// </div>
	
	
	
	$f(playerID, {src: "../flowplayer.commercial-3.2.7.swf", wmode: "transparent"}, {
	
		// log: { level: 'debug'//, filter: 'org.flowplayer.akamai.*, org.flowplayer.rtmp.*'
		// 				},
	
		// commercial version requires product key
		key: '#@905cc47e8164939b12d',
	
		/*
			logo can a JPG, PNG or SWF file.
			NOTE: the logo can only be changed in commercial versions
			the url must be absolute or relative to the flowplayer SWF
		*/
		logo: {

			// default logo and its position, relative to video SWF
			url: 'deploy/img/video_logo.png',
			top: 10,
			right: 15,
			opacity: 0.4,

			// for SWF-based logos you can supply a relative size (to make the logo larger in fullscreen)
			// width: '6.5%',
			// height: '6.5%',

			// if set to false, then the logo is also shown in non-fullscreen mode
			fullscreenOnly: false,

			// time to display logo (in seconds). 0 = show forever
			displayTime: 0,

			/*
				if displayTime > 0 then this specifies the time it will take for
				the logo to fade out. this happens internally by changing the opacity
				property from its initial value to full transparency.
				value is given in milliseconds.
			*/
			fadeSpeed: 0,

			// for commercial versions you can specify where the user is redirected when the logo is clicked
			linkUrl: 'http://flowplayer.org'
		},
	
		// play: {
		// 
		// 	/*
		// 		relative path to the play button, this can be a JPG, PNG or SWF file.
		// 		NOTE: the button can only be changed in the commercial versions
		// 	*/
		// 	url: 'img/video_loader_3d.png',
		// 
		// 	// all display properties, except the z-index, can be modified in all versions
		// 	opacity: 0.8,
		// 
		// 	// label text; by default there is no text
		// 	label: null,
		// 
		// 	// label text at end of video clip
		// 	replayLabel: 'Play again',
		// 
		// 	/*
		// 		progress indicator - this is shown while video is being loaded.
		// 		it is always in the same place as the play button.
		// 	*/
		// 	// how fast progress indicator fades out after video is loaded
		// 	fadeSpeed: 500,
		// 
		// 	// how fast buffering animation rotates
		// 	rotateSpeed: 50
		// 
		// },
	
		onLoad: function(c) { 
			$(".debug_text").vidtrack("loaded");
			//console.log("loaded"); 
			var cc=this.getClip(0);
			//console.log(c);
			//console.log(cc);
		},
		onMute: function() { 
			$(".debug_text").vidtrack("mute");
			//console.log("mute"); 
		},
		onUnmute: function() { 
			$(".debug_text").vidtrack("unmute"); 
			//console.log("unmute"); 
		},
		onFullscreenExit: function() { 
			$(".debug_text").vidtrack("fullscreen_exit");
			//console.log("fullscreen exit"); 
		},
		onFullscreen: function() { 
			$(".debug_text").vidtrack("fullscreen");
			//console.log("fullscreen"); 
		},
		onVolume: function(level) { 
			$(".debug_text").vidtrack("volume_"+level);
			//console.log("volume level is now " + level); 
		},
	
		clip: {
			ipadUrl : "http://pseudo01.hddn.com/vod/demo.flowplayervod/flowplayer-960.mp4",
			autoPlay : false,
			autoBuffering : true,
			bufferLength : 10,
			onStart: function(c) { 
				//console.log("start");
			},
			onSeek: function(c,t) { 
				$(".debug_text").vidtrack("seek_"+t); 
				//console.log("seeked to"); 
				//console.log(c);
				//console.log(t); 
			},
			onBeforeBegin: function(c) { 
				var cc=c;
				//console.log(cc.metaData) 
			},
			onMetaData: function(c){ //console.log("metaData"); 
				var cc=c;//console.log(cc); 
				var fd = c.fullDuration;
				var cues = [
					{ time:fd*.25*c.cuepointMultiplier, name: "25%" }, 
					{ time:fd*.5*c.cuepointMultiplier, name: "50%" }, 
					{ time:fd*.75*c.cuepointMultiplier, name: "75%" }
				];

				c.onCuepoint(
					// each integer represents milliseconds in the timeline
					cues,
					// this function is triggered when a cuepoint is reached
					function(clip, cuepoint) {
						$(".debug_text").vidtrack("progress_"+cuepoint.name);
					}
				 );
			},
			onBegin: function(c) { 
				//console.log("begin");
				//console.log(c);
			},
			onStop: function(c) { 
				$(".debug_text").vidtrack("stop"); 
				//console.log("stop"); 
			},
			onResume: function() { 
				$(".debug_text").vidtrack("play");
				//console.log("resume");
			},
			onPause: function() { 
				$(".debug_text").vidtrack("pause");
				//console.log("pause");
				//console.log(this.getStatus());
				//console.log(this.getTime());
			},
			onFinish: function(c) {
				$(".debug_text").vidtrack("finish");
				//console.log("finish");
			}
		},
		plugins: {
			controls: {
				fullscreen : true,
				bottom: 0,
				autoHide: "always"
			}
		}
	}).ipad(); //{simulateiDevice: true}
};