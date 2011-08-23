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
	
	if(o.sharebar) {
		$this.append(
			$('<div>', {
				"style" : "width:640px;height:360px",
				"class" : "overlay"
			}).append(
				$('<a>', {
					"href" : "#",
					"text" : "CLOSE",
					"class" : "close"
				}),
				$('<textarea>', {
					"style" : "width:620px;height:300px,margin: 0;overflow:hidden;",
					"rows" : "",
					"cols" : ""
				})
			)
		);
		
		$this.append(
			$('<div>', {
				"style" : "width:640px;",
				"class" : "share_bar"
			}).append(
					$('<a>', {
						"href" : "#",
						"text" : "EMBED",
						"class" : "embed"
					}),
					$('<a>', {
						"href" : "#",
						"text" : "SHARE",
						"class" : "share"
					})
				)
		);
	}
	
	
	
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
		
		//player level events
		onLoad: function(c) { 
			$(".debug_text").vidtrack("loaded");
			var cc=this.getClip(0);
		},
		onMute: function() { 
			$(".debug_text").vidtrack("mute");
		},
		onUnmute: function() { 
			$(".debug_text").vidtrack("unmute"); 
		},
		onFullscreenExit: function() { 
			$(".debug_text").vidtrack("fullscreen_exit");
		},
		onFullscreen: function() { 
			$(".debug_text").vidtrack("fullscreen");
		},
		onVolume: function(level) { 
			$(".debug_text").vidtrack("volume_"+level);
		},
	
		clip: {
			ipadUrl : "http://pseudo01.hddn.com/vod/demo.flowplayervod/flowplayer-960.mp4",
			autoPlay : false,
			autoBuffering : true,
			bufferLength : 10,
			onStart: function(c) { 
			},
			onSeek: function(c,t) { 
				$(".debug_text").vidtrack("seek_"+t); 
			},
			onBeforeBegin: function(c) { 
			},
			onMetaData: function(c){ //console.log("metaData"); 
				var cc=c;
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
			},
			onStop: function(c) { 
				$(".debug_text").vidtrack("stop"); 
			},
			onResume: function() { 
				$(".debug_text").vidtrack("play");
			},
			onPause: function() { 
				$(".debug_text").vidtrack("pause");
			},
			onFinish: function(c) {
				$(".debug_text").vidtrack("finish");
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