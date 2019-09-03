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
  var acc_res = new ArrayBuffer(6);
  //var res = new DataView(acc_res);
 // res.setInt8(0,(this.send([0x82,0])[1]));
  //res.setInt8(1,(this.send([0x83,0])[1]));
 // res.setInt8(2,(this.send([0x84,0])[1]));
 // res.setInt8(3,(this.send([0x85,0])[1]));
  //res.setInt8(4,(this.send([0x86,0])[1]));
  //res.setInt8(5,(this.send([0x87,0])[1]));
  //var xx_L = this.send([0x82,0])[1];
  //var xx_M =this.send([0x83,0])[1];
  //var yy_L =this.send([0x84,0])[1];
  //var yy_M =this.send([0x85,0])[1];
  //var zz_L =this.send([0x86,0])[1];
  //var zz_M =this.send([0x87,0])[1];
  //var xx = [xx_M << 6 | xx_L >> 2];
  //var yy = [yy_M << 6 | yy_L >> 2];
  //var zz = [zz_M << 6 | zz_L >> 2];
  //return {
  //  res;
  //};
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


