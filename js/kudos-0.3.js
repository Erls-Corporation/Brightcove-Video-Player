	/*********************************************************************

		Kudos-JS, Brightcove Javascript SDK
		Version 0.3
	
		Official Website - http://www.kudos-js.com
	
		Authors:
			Brian Franklin, Services Engineer, Brightcove, Inc
			Matthew Congrove, Services Engineer, Brightcove, Inc

		Copyright 2010 Brian Franklin, Matthew Congrove
	
		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
		THE SOFTWARE.

	*********************************************************************/

	var kudos = new function () {
	
		// Enter your Brightcove Media Read API token below
		this.token = "";
		
		// Only change this if you want a different default callback
		this.cb = "kudos.flush";
		
		// Don't change below this line
		this.api = "http://api.brightcove.com/services/library";
		this.calls = [
			{ "s":"find_all_videos", "o":false },
			{ "s":"find_playlists_for_player_id", "o":"player_id" },
			{ "s":"find_all_playlists", "o":false },
			{ "s":"find_playlist_by_id", "o":"playlist_id" },
			{ "s":"find_related_videos", "o":"video_id" },
			{ "s":"find_video_by_id", "o":"video_id" },
			{ "s":"find_videos_by_ids", "o":"video_ids" },
			{ "s":"find_videos_by_tags", "o":"or_tags" },
			{ "s":"find_video_by_reference_id", "o":"reference_id" },
			{ "s":"find_video_by_reference_ids", "o":"reference_ids" },
			{ "s":"find_videos_by_user_id", "o":"user_id" },
			{ "s":"find_videos_by_campaign_id", "o":"campaign_id" },
			{ "s":"find_videos_by_text", "o":"text" },
			{ "s":"find_modified_videos", "o":"from_date" },
			{ "s":"find_playlists_by_ids", "o":"playlist_ids" },
			{ "s":"find_playlist_by_reference_id", "o":"reference_id" },
			{ "s":"find_playlists_by_reference_ids", "o":"reference_ids" }
		];

		// Create a script element and include the API result
		this.inject = function (s) {
			var e = document.createElement("script");
			e.setAttribute("src", this.api+"?"+s);
			e.setAttribute("type", "text/javascript");
			document.getElementsByTagName("head")[0].appendChild(e);
			return true;
		};
		
		// Construct the API call
		this.get = function (s, v) {
			v = v || null;
			var o = null;
			var q = "";
			s = s.toLowerCase().replace(/(find_)|(_)|(get_)/g, "");
			for (var z in this.calls) {
				if (s == this.calls[z].s.toLowerCase().replace(/(find_)|(_)|(get_)/g, "")) {
					s = this.calls[z].s;
					o = this.calls[z].o;
				}
			}
			q = "command="+s
			if ((typeof v == "object") && v) {
				for (var x in v) {
					if (x == "selector") {
						q += "&"+o+"="+encodeURIComponent(v[x]);
					} else {
						q += "&"+x+"="+encodeURIComponent(v[x]);
					}
				}
				if (typeof v.callback != "string") {

					q += "&callback="+this.cb;
				}
				if (typeof v.token != "string") {
					q += "&token="+this.token;
				}
			} else if (v) {
				q += "&"+o+"="+encodeURIComponent(v)+"&callback="+this.cb;
				q += "&token="+this.token;
			} else {
				q += "&token="+this.token;
				q += "&callback="+this.cb;
			}			

			this.inject(q);
			return true;
		};
		
		// Default callback which does nothing
		this.flush = function (s) {
			return true;
		};
	
	}();
