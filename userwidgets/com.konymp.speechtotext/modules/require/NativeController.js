define([], function() {
    var konyLoggerModule = require('com/konymp/speechtotext/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("Speech To Text Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;

    var NativeController = function(nativeController) {
        this.componentInstance = nativeController.componentInstance;
    };
    
    /**
     * @function speechToText
     * @private
     * @description: this function is called in the component constructor
     */
    NativeController.prototype.speechToText = function(context) {
        try {
            konymp.logger.trace("----------Entering speechToText Function---------", konymp.logger.FUNCTION_ENTRY);
            throw {
                  	"type":"DEV",
                    "Error": "Method doesn.t implemented",
                    "message": "You have to implement the method speechToText!"
            };
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
     * @description: this function is called in the component constructor
     */
    NativeController.prototype.stopRecognition = function(context) {
        try {
            konymp.logger.trace("----------Entering stopRecognition Function---------", konymp.logger.FUNCTION_ENTRY);
            throw {
                  	"type":"DEV",
                    "Error": "Method doesn.t implemented",
                    "message": "You have to implement the method stopRecognition!"
            };
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            if(exception.type === "CUSTOM"){
            	throw exception;
            }
        }
    };
    return NativeController;
});