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
BMA280.prototype.readAcc = function() {
  var xx_L =this.send([0x82,0])[1];
  var xx_M =this.send([0x83,0])[1];
  var yy_L =this.send([0x84,0])[1];
  var yy_M =this.send([0x85,0])[1];
  var zz_L =this.send([0x86,0])[1];
  var zz_M =this.send([0x87,0])[1];
  var xx = ([xx_M << 8 | xx_L])/4;
  var yy = ([yy_M << 8 | yy_L])/4;
  var zz = ([zz_M << 8 | zz_L])/4;
  return {
    x: xx,
    y: yy,
    z: zz
  };
};
BMA280.prototype.send = function(data) {
  var res = this.spi.send(data,this.csPin);
  return res;
}

exports = BMA280;

exports.connectSPI = function (spi, csPin) {
  var conn = new BMA280(spi, csPin);
  var acc = conn.send([0x80|0x00,0x00])[1];
  if (acc != 0xFB) conn = null;
  return conn;
};


