define([], function() {
    var konyLoggerModule = require('com/konymp/LottieAnimator/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("LottieAnimator Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
    var ControllerImplementation = function(componentInstance, componentName) {
        konymp.logger.trace("----------Entering ControllerImplementation Function---------", konymp.logger.FUNCTION_ENTRY);
        this.componentInstance = componentInstance;
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
                    } else if (deviceName.toLowerCase() === 'thinclient') {
                        platformName = 'DesktopWeb';
                    }
                    var nativeControllerPath = 'com/konymp/' + 'LottieAnimator' + '/NativeController' + platformName;
                    var nativeController = require(nativeControllerPath);
                    this.nativeControllerInstance = new nativeController(this);
                }
                konymp.logger.trace("----------Exiting getNativeController Function---------", konymp.logger.FUNCTION_EXIT);
                return this.nativeControllerInstance;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if (exception.type === "CUSTOM") {
                    throw exception;
                }
            }
        };
        this.createLottiView = function(eventObj) {
            try {
                konymp.logger.trace("----------Entering createWebview Function---------", konymp.logger.FUNCTION_ENTRY);
                this.getNativeController().createLottiView(eventObj);
                konymp.logger.trace("----------Exiting createWebview Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if (exception.type === "CUSTOM") {
                    throw exception;
                }
            }
        };
        this.onLayoutSubviews = function(eventObj) {
            try {
                konymp.logger.trace("----------Entering onLayoutSubviews Function---------", konymp.logger.FUNCTION_ENTRY);
                this.getNativeController().onLayoutSubviews(eventObj);
                konymp.logger.trace("----------Exiting onLayoutSubviews Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if (exception.type === "CUSTOM") {
                    throw exception;
                }
            }
        };
        this.onCleanup = function(eventObj) {
            try {
                konymp.logger.trace("----------Entering onCleanup Function---------", konymp.logger.FUNCTION_ENTRY);
                this.getNativeController().onCleanup(eventObj);
                konymp.logger.trace("----------Exiting onCleanup Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if (exception.type === "CUSTOM") {
                    throw exception;
                }
            }
        };
        this.propertyUpdated = function(propName, propValue) {
            this.getNativeController().propertyUpdated(propName, propValue);
        };
        this.play = function() {
            this.getNativeController().play();
        };
        this.pause = function() {
            this.getNativeController().pause();
        };
        this.resume = function() {
            this.getNativeController().resume();
        };
        this.stop = function() {
            this.getNativeController().stop();
        };
		this.isAnimating = function() {
         var status = this.getNativeController().isAnimating();
         return status;
       };      
        konymp.logger.trace("----------Exiting ControllerImplementation Function---------", konymp.logger.FUNCTION_EXIT);
    };
    return ControllerImplementation;
});
