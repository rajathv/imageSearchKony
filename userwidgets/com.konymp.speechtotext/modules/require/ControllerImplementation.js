define([], function() {
    var konyLoggerModule = require('com/konymp/speechtotext/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("Speech To Text  Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;

    /**
     * @function ControllerImplementation.js
     * @private
     * @description: This is Factory module
     */
    var ControllerImplementation = function(componentInstance, componentName) {
        konymp.logger.trace("----------Entering ControllerImplementation.js Function---------", konymp.logger.FUNCTION_ENTRY);
        this.componentInstance = componentInstance;
        /**
         * @function getNativeController
         * @private
         * @description: This function will differentiate the platform specific module
         */
        this.getNativeController = function() {
            try {
                konymp.logger.trace("----------Entering getNativeController Function---------", konymp.logger.FUNCTION_ENTRY);
                if (this.nativeControllerInstance === undefined) {
                    var deviceName = kony.os.deviceInfo().name;
                    var platformName = null;
                    if (deviceName.toLowerCase() === 'iphone' || deviceName.toLowerCase() === 'ipad') {
                        platformName = 'IOS.js';
                    } else if (deviceName.toLowerCase() === 'android') {
                        platformName = 'Android.js';
                    }
                  	else if(deviceName.toLowerCase() === 'thinclient'){
                      	platformName = 'DesktopWeb';	
                    }
                    var nativeControllerPath = 'com/konymp/' + componentName + '/NativeController' + platformName;
                    var nativeController = require(nativeControllerPath);
                    this.nativeControllerInstance = new nativeController(this.componentInstance);
                }
                konymp.logger.trace("----------Exiting getNativeController Function---------", konymp.logger.FUNCTION_EXIT);
                return this.nativeControllerInstance;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        /**
         * @function speechToText
         * @private
         * @description: This function will invoke speech to text functionality in specific platform
         */
        this.speechToText = function() {
            try {
                konymp.logger.trace("----------Entering speechToText Function---------", konymp.logger.FUNCTION_ENTRY);
                this.getNativeController().speechToText();
                konymp.logger.trace("----------Exiting speechToText Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        /**
         * @function stopRecognition
         * @private
         * @description: This function will stop the recognition of the specific platform
         */
        this.stopRecognition = function() {
            try {
                konymp.logger.trace("----------Entering stopRecognition Function---------", konymp.logger.FUNCTION_ENTRY);
                this.getNativeController().stopRecognition();
                konymp.logger.trace("----------Exiting stopRecognition Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
      	this.requestPermission = function(){
          try {
                konymp.logger.trace("----------Entering requestPermission Function---------", konymp.logger.FUNCTION_ENTRY);
                this.getNativeController().requestPermission();
                konymp.logger.trace("----------Exiting requestPermission Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        konymp.logger.trace("----------Exiting ControllerImplementation.js Function---------", konymp.logger.FUNCTION_EXIT);
    };
  
    return ControllerImplementation;
});