(function() {
  
  
  // Our callback loops through the returned videos, alerting their names.
  function handle (response) {
          for (var video in response.items) {
                  alert(video.name);
          }
  }
  // Simply make a call to the API requesting content.
  // Note that a callback function is needed to handle the returned data.
  kudos.get("find_all_videos", {
    callback: function(response) {
      console.log('lol');
    }
  
  
  });

  
  
})();