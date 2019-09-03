/* Written by Stephen Mackey */
//Espruino code
//var i2c = new I2C();
//i2c.setup({ scl : D30, sda: D31 });
//var acc = require("https://github.com/allmackey/espruino/blob/master/KX022.js").connectI2C(i2c);
//print(acc.read()); // prints { x: ..., y: ..., z: ... }

var REG = { 
  WHO_AM_I: 0xFB,
  OUTX_L: 0x82,
  OUTX_H: 0x83,
  OUTY_L: 0x84,
  OUTY_H: 0x85,
  OUTZ_L: 0x86,
  OUTZ_H: 0x87,
};

//tt
function BMA280(spi, csPin) {
  this.spi = spi;
  this.csPin = csPin;
}

//tt
BMA280.prototype.init = function() {

};

//tt
BMA280.prototype.readAcc = function() {
  print("B");
  var xx_L = this.send([REG.OUTX_L,0])[1];
  var xx_M = this.send([REG.OUTX_H,0])[1];
  var yy_L = this.send([REG.OUTY_L,0])[1];
  var yy_M = this.send([REG.OUTY_H,0])[1];
  var zz_L = this.send([REG.OUTY_L,0])[1];
  var zz_M = this.send([REG.OUTY_H,0])[1];
  var xx = [xx_M << 6 | xx_L >> 2];
  var yy = [yy_M << 6 | yy_L >> 2];
  var zz = [zz_M << 6 | zz_L >> 2];
  return {
    x: xx,
    y: yy,
    z: zz,
    res: res
  };
};

BMA280.prototype.send = function(data) {
  var res = this.spi.send(data,this.csPin);
  return res;
};
exports.BMA280;

exports.connectSPI = function(spi, csPin) {
  var conn = new BMA280(spi, csPin);
  var acc = conn.send([0x80|0x00,0x00])[1];
  if (acc != REG.WHO_AM_I) conn = null;
  return conn;
};
