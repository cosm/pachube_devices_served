$(document).ready(function(){

  if(!("WebSocket" in window)) {
    alert("I'm afraid your browser does not support WebSockets.\nTry the latest build of Chrome.");
    return;
  }
 
  // This is my user level GET advanced api key
  var api_key = "WpU94r-Sm3SazTROYhD6-J95169ZM5-ruPyP73qUZjA";
  var counter = 0;
  
  function formatTimestamp(ts) {
    return(ts.replace(/(\..{6}Z)$/, "").replace("T", " "));
  }

  function subscribe(ws, api_key) {
    ws.send('{"headers":{"X-PachubeApiKey":"' + api_key + '"}, "method":"subscribe", "resource":"/#"}');
  }
 
  function unsubscribe(ws, api_key) {
    ws.send('{"headers":{"X-PachubeApiKey":"' + api_key + '"}, "method":"unsubscribe", "resource":"/#"}');
  }

  // Use the Pachube beta websocket server
  ws = new WebSocket("ws://beta.pachube.com:8080/");

  ws.onerror = function(evt) {
    alert("Could not open WebSocket connection");
  }
  ws.onopen = function(evt) {
    var date = new Date();
    $('#counter_start').html(date.toUTCString());
    // subscribe(ws, api_key);
  }

  ws.onmessage = function(evt) {
    data = evt.data;
    response = JSON.parse(data);
    if (response.body) {
      counter++;
      $('#counter').html(counter);
    }
  }
  
});

