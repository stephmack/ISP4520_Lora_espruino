SPI1.setup({sck:D17, miso:D12, mosi:D10});
var csPin = D7;
var acc = require("https://github.com/stephmack/ISP4520_Lora_espruino/blob/master/BMA280.js").connectSPI(SPI1,csPin);
var res = acc.readAcc();
print(res);


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
 var res = acc.readAcc();
 print(res);
}, 1000);
