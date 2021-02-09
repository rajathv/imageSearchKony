define(['./Inherits', './NativeController'], function(Inherits, NativeController) {
    var konyLoggerModule = require('com/konymp/LottieAnimator/konyLogger');
    var konymp = konymp || {};
    var konympJumio = konympJumio || {};
    konymp.logger = (new konyLoggerModule("LottieAnimator Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;

    var NativeControllerAndroid = function(implementationContext) {
        this.componentInstance = implementationContext.componentInstance;
        NativeController(this);
        this.importClasses();
    };

    Inherits(NativeControllerAndroid, NativeController);

    /**
     * @function importClasses
     * @private
     * @description: this function will import all the classes from the franeworks and store in the nativeClasses variable
     */
    NativeControllerAndroid.prototype.importClasses = function() {
      try {
        konymp.logger.trace("----------Entering importClasses Function---------", konymp.logger.FUNCTION_ENTRY);
      this.KonyMain = java.import("com.konylabs.android.KonyMain");
      this.konyContext = this.KonyMain.getActivityContext();
      this.lottieView = java.import("com.konymp.lottieanimation.LottieAnimatorWidget"); 
      konymp.logger.trace("----------Exiting importClasses Function---------", konymp.logger.FUNCTION_EXIT);  
      } catch (exception) {
			konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
			throw exception;
      }        
     };
    /**
     * @function createLottiView
     * @private
     * @description: creats Lottie View  instance
     */
  
    NativeControllerAndroid.prototype.createLottiView = function() {
      try {
      konymp.logger.trace("----------Entering createLottiView Function---------", konymp.logger.FUNCTION_ENTRY);
        kony.print("createLottiView ->  " + this.componentInstance.source);
        var randomId =  Math.random();
        var animationEndCallback = java.newClass("LottieAnimationCallbacks" + randomId, "java.lang.Object",  ["com.konymp.lottieanimation.LottieAnimatorListener"], {
         onAnimationEnd : function(){
           kony.print("onAnimationEnd SOurce -> " + this.componentInstance.source);
           var typeofOnAnimationEnd = typeof(this.componentInstance.onAnimationEnd);
           if (typeofOnAnimationEnd === "function") {
               this.componentInstance.onAnimationEnd(this.componentInstance);
          }                     
         }.bind(this)
       }); 
        
                                                    
		var eventObject = this.componentInstance.view.lottieViewContainer.lottieWidget.getContainerView();
        this.LottieWidgetObj = new this.lottieView(this.konyContext);
		var animationCallbackObject = new animationEndCallback();
		this.LottieWidgetObj.show(eventObject);
		this.setDefaultProperties();
        this.LottieWidgetObj.setAnimationListeners(animationCallbackObject);
		konymp.logger.trace("----------Exiting createLottiView Function---------", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
			konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
			throw exception;
      }  
    };
  
	NativeControllerAndroid.prototype.setDefaultProperties = function() {
     try {
       konymp.logger.trace("----------Entering setDefaultProperties Function---------", konymp.logger.FUNCTION_ENTRY);
       if(this.componentInstance.speed !== null || this.componentInstance.speed !== undefined){
         this.LottieWidgetObj.setAnimationSpeed(parseInt(this.componentInstance.speed)); 
       }
      
      if(this.componentInstance.loop !== null || this.componentInstance.loop !== undefined){
         this.LottieWidgetObj.setRepeatCount(parseInt(this.componentInstance.loop));
      }

      if(this.componentInstance.repeatMode !== null || this.componentInstance.repeatMode !== undefined){
         this.LottieWidgetObj.setRepeatMode(this.componentInstance.repeatMode);
      } 

      if(this.componentInstance.scaleMode !== null || this.componentInstance.scaleMode !== undefined){
         this.LottieWidgetObj.setScaleMode(this.componentInstance.scaleMode);
      }
      
      if(this.componentInstance.autoPlay !== null || this.componentInstance.autoPlay !== undefined){
        this.LottieWidgetObj.setAutoPlay(Boolean(this.componentInstance.autoPlay));
      }     
      
      if(this.componentInstance.source !== null || this.componentInstance.source !== undefined){
		this.animationSrcfile = this.componentInstance.source;
        this.LottieWidgetObj.setAnimationSource(this.animationSrcfile);
      }
       konymp.logger.trace("----------Exiting setDefaultProperties Function---------", konymp.logger.FUNCTION_EXIT);
     } catch (exception) {
			konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
			throw exception;
      } 
    }
    
    NativeControllerAndroid.prototype.onCleanup = function() {
      try {
        konymp.logger.trace("----------Entering onCleanup Function---------", konymp.logger.FUNCTION_ENTRY);
        var eventObject = this.componentInstance.view.lottieViewContainer.lottieWidget.getContainerView();
        this.LottieWidgetObj.cleanup(eventObject);
        konymp.logger.trace("----------Exiting onCleanup Function---------", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
			konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
			throw exception;
      }
    };
  
    NativeControllerAndroid.prototype.play = function() {
      var currThis = this;
      function mainthread() {
			currThis.LottieWidgetObj.playAnimation();
      }
	try {
		kony.runOnMainThread(mainthread, []);
      } catch (exception) {
			konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
			throw exception;
      }
    };
  
    NativeControllerAndroid.prototype.pause = function() {
      var currThis = this;
      function mainthread() {
        if(currThis.LottieWidgetObj.isAnimating())
			currThis.LottieWidgetObj.pauseAnimation();
      }      
      try {
			kony.runOnMainThread(mainthread, []);
      } catch (exception) {
			konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
			throw exception;
      }
    };
    NativeControllerAndroid.prototype.resume = function() {
      var currThis = this;
      function mainthread() {
        if(!currThis.LottieWidgetObj.isAnimating())
			currThis.LottieWidgetObj.resumeAnimation();
      }      
      try {
			kony.runOnMainThread(mainthread, []);
      } catch (exception) {
			konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
			throw exception;
      }
     };
    NativeControllerAndroid.prototype.stop = function() {
      var currThis = this;
      function mainthread() {
			currThis.LottieWidgetObj.cancelAnimation();
      }      
      try {
			kony.runOnMainThread(mainthread, []);
      } catch (exception) {
			konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
			throw exception;
      }      
    };
   
	NativeControllerAndroid.prototype.isAnimating = function() {
      try {
       var status =  this.LottieWidgetObj.isAnimating();
       return status;       
      } catch (exception) {
			konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
			throw exception;
      }
     }; 
  
    NativeControllerAndroid.prototype.propertyUpdated = function(propName, propValue) {
      var currThis = this;
      function mainthread() {
			if(propName === "source"){
				currThis.LottieWidgetObj.setAnimationSource(propValue);
			} else	if(propName === "loop"){
				currThis.LottieWidgetObj.setRepeatCount(parseInt(propValue));
			} else if(propName === "speed"){
				currThis.LottieWidgetObj.setAnimationSpeed(parseInt(propValue)); 
			} else if(propName === "repeatMode"){
				currThis.LottieWidgetObj.setRepeatMode(propValue);
			} else if(propName === "autoPlay"){
				if(propValue === "true")
					currThis.LottieWidgetObj.setAutoPlay(true);
				else
					currThis.LottieWidgetObj.setAutoPlay(false);
			} else if(propName === "scaleMode"){
				currThis.LottieWidgetObj.setScaleMode(propValue);
			} 
		}
      
      try {
        konymp.logger.trace("----------Entering propertyUpdated Function---------", konymp.logger.FUNCTION_ENTRY);
		if(this.LottieWidgetObj === undefined  || this.LottieWidgetObj === null )
			return;
      
		kony.runOnMainThread(mainthread, []);
		konymp.logger.trace("----------Exiting propertyUpdated Function---------", konymp.logger.FUNCTION_EXIT);        
      } catch (exception) {
			konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
			throw exception;
      }
    };
    return NativeControllerAndroid;

});
