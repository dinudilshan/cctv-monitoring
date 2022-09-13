var format = 'application/x-www-form-urlencoded';
var file = 'http://127.0.0.1:8085/stream/player/H264_AAC';

window.jwplayer('rtsp').setup({
file: file,
stretching: "exactfit",
autostart: true,
aspectratio: '16:9',
skin: 'bekle'
});