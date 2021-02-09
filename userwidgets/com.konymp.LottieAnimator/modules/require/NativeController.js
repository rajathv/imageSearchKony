define([],function (){
  var konyLoggerModule = require('com/konymp/LottieAnimator/konyLogger');
  var konymp = konymp || {};
  konymp.logger = (new konyLoggerModule("LottieAnimator Component")) || function() {};
  konymp.logger.setLogLevel("DEBUG");
  konymp.logger.enableServerLogging = true;
  
  var NativeController=function(platformControllerContext){
    this.componentInstance = platformControllerContext.componentInstance;
  };
  
  NativeController.prototype.createLottiView = function() {
        alert("Native Controller");
    };
  
  NativeController.prototype.play = function() {
        alert("play");
    };
   NativeController.prototype.pause = function() {
        alert("pause");
  };
   NativeController.prototype.resume = function() {
        alert("resume");
  };
  NativeController.prototype.stop = function() {
        alert("cancel");
   };  
  
  NativeController.prototype.isAnimating = function() {
        alert("isAnimating");
     };
   NativeController.prototype.onCleanup = function() {
        alert("Native Controller onCleanup");
    };
  NativeController.prototype.propertyUpdated = function(propName,propValue) {
        alert("propertyUpdated");
     };
 NativeController.prototype.onLayoutSubviews = function() {
        alert("Native Controller onLayoutSubviews");
    };
  return NativeController;
});
