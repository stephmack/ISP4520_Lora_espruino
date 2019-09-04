SPI1.setup({sck:D17, miso:D12, mosi:D10});
var csPin = D7;
var acc = require("https://github.com/stephmack/ISP4520_Lora_espruino/blob/master/BMA280.js").connectSPI(SPI1,csPin);
var res = acc.readAcc();
print(res);

var t = setInterval(function () {
 var res = acc.readAcc();
 print(res);
}, 1000);

SPI1.setup({ sck:D23, miso:D25, mosi:D26 });

var sx = require("https://github.com/stephmack/ISP4520_Lora_espruino/blob/master/SX127x.js").connect({spi: SPI1, cs: D24, rst : D19 });

var config = {
  rxContinuous : true
};
// Until DIO0 line irqs are implemented we need this:
setInterval(function() { sx.onIRQ(); }, 100);
