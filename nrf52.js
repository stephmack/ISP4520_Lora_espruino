var spi = SPI1.setup({sck:D17, miso:D12, mosi:D10});
var acc = require("https://https://github.com/stephmack/ISP4520_Lora_espruino/blob/master/BMA280.js").connectSPI(spi);
acc.init();
var ic = 1;
var i = 0;
var xL = 0;
var xH = 0;
var yL = 0;
var yH = 0;
var zL = 0;
var zH = 0;
var xP = 0;
var yP = 0;
var zP = 0;
var cnt = 0;
var tempd = 0;

var i = 0;

function hex_to_ascii(str1)
 {
	//var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < str1.length; n++) {
		str += String.fromCharCode(str1[n]);
	}
	return str;
 }

var t = setInterval(function () {
  tempd = acc.read();
  xL = tempd.xL;
  xH = tempd.xH;
  yL = tempd.yL;
  yH = tempd.yH;
  zL = tempd.zL;
  zH = tempd.zH;
  xP = tempd.xP;
  yP = tempd.yP;
  zP = tempd.zP;
}, 1000);
