var socket = io.connect('https://entri-fetch.glitch.me/');
socket.on('connect', function(data) {
  socket.emit('join', 'Hello World from client');
  socket.on('messages', function(data) {
    alert(data);
  });
});