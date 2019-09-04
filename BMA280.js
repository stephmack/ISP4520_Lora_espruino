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
  var zz_L = this.send([REG.OUTZ_L,0])[1];
  var zz_M = this.send([REG.OUTZ_H,0])[1];
  x = new Int8Array(2);
  xx = DataView(x.buffer,0,2);
  xx.setInt8(0, xx_M ,0);
  xx.setInt8(1, xx_L ,0);
  var x_acc = (xx.getInt16(0,0) >> 2)/4096;

  y = new Int8Array(2);
  yy = DataView(x.buffer,0,2);
  yy.setInt8(0, yy_M ,0);
  yy.setInt8(1, yy_L ,0);
  var y_acc = (yy.getInt16(0,0) >> 2)/4096;

  z = new Int8Array(2);
  zz = DataView(x.buffer,0,2);
  zz.setInt8(0, zz_M ,0);
  zz.setInt8(1, zz_L ,0);
  var z_acc = (zz.getInt16(0,0) >> 2)/4096;
  return {
    x: x_acc,
    y: y_acc,
    z: z_acc,
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
