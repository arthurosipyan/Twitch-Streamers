var status = 'all';
var online = [];
var offline = [];
var streamers = ["ninja", "monstercat", "ehvio", "jvpass21", "freecodecamp"];

$(document).ready(function() {

  getStreamers();
  setOnlineOffline();

  $('#all').click(function() {
    status = 'all';
    getStreamers();
  });

  $('#online').click(function() {
    $('#current').html('Online:');
    status = 'on';
    getStreamers();
  });

  $('#offline').click(function() {
    $('#current').html('Offline:');
    status = 'off';
    getStreamers();
  });

  function formatStreamers(data){
    return '<a href=' + data.url + ' target="_blank"><img src=' + data.logo + ' class="w3-bar-item w3-circle" style="width:75px"></a>'
         + '<div class="w3-rest">'
         + '<span class="w3-xlarge" style="color:pink"> ' + data.name + '</span><br>'
         + '<span style="font-style: italic"> ' + data.status + '</span>'
         + '</div><br>';
  }

  function getStreamers() {
    var twitchers;
    $('#result').html('');
    if (status === 'all'){
      twitchers = streamers;
    } else if (status === 'on') {
      twitchers = online;
    } else {
      twitchers = offline;
    }

      for (var i = 0; i < twitchers.length; i++){
        let channel = twitchers[i];

      $.ajax({
        type: 'GET',
        url: 'https://wind-bow.gomix.me/twitch-api/channels/' + channel,
        dataType: 'jsonp',
        success: function(data1) {
            $('#result').prepend(formatStreamers(data1));
        },
        error: function(errorMessage){
        alert("Error")
      }

    });
  };
 }

  function setOnlineOffline() {
        for (var i = 0; i < streamers.length; i++){
          let channel = streamers[i];

        $.ajax({
          type: 'GET',
          url: 'https://wind-bow.gomix.me/twitch-api/streams/' + channel,
          dataType: 'jsonp',
          success: function(data2) {
              if (data2.stream !== null){
                online.push(channel);
              }
              else {
                offline.push(channel);
              }
          },
          error: function(errorMessage){
          alert("Error")
        }
        });

      };
    }
});
