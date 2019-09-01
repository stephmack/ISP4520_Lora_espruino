/* Written by Stephen Mackey */
//Espruino code
//print(acc.read()); // prints { x: ..., y: ..., z: ... }

var REG = { 
  WHO_AM_I: 0xFB,
  OUTX_L: 0x01,
  OUTX_M: 0x02,
  OUTY_L: 0x03,
  OUTY_M: 0x04,
  OUTZ_L: 0x05,
  OUTZ_M: 0x06,
};

//tt
function BMA280(spi, csPin) {
  this.spi = spi;
  this.csPin = csPin;
  //if (this.spi.send(REG.WHO_AM_I,1)[0]!=0xFB) throw new Error("WHO_AM_I incorrect");
}

//tt
BMA280.prototype.init = function() {
  
};

//tt
BMA280.prototype.read = function() {
  var d = new DataView(this.r(REG.OUTX_L,6).buffer);
  var xx = d.getInt16(0,1);
  var yy = d.getInt16(2,1);
  var zz = d.getInt16(4,1);
  
};

exports.connectSPI = function (spi, csPin) {
  var spi = new BMA280(spi, csPin);
  var acc = spi.send([0x80|0x00,0x00],csPin);
  if (acc != 0xEF) spi = null;
  return spi;
};

exports = BMA280;
