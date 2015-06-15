module.exports = function(Ffosbr) {


FFosbr.prototype.settings = function() {
  var sdcard = navigator.getDeviceStorage('sdcard');

  console.log(sdcard);

  };

};