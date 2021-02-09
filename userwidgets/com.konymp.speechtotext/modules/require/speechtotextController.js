/**
 * Created by Team Kony.
 * Copyright (c) 2017 Kony Inc. All rights reserved.
 */
define(['./ControllerImplementation'],function(ControllerImplementation) {
    var konyLoggerModule = require('com/konymp/speechtotext/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("Speech To Text Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");

    return {
        /**
         * @function constructor
         * @private
         * @params {Object} baseConfig, layoutConfig, pspConfig
         */
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            konymp.logger.trace("----------Entering constructor---------", konymp.logger.FUNCTION_ENTRY);
            this._centerYSet = "";
            this._centerXSet = "";
          	this.konyDeviceInfo = kony.os.deviceInfo();
            this._screenHeight = this.konyDeviceInfo.screenHeight;
            this._screenWidth = this.konyDeviceInfo.screenWidth;
            this.view.doLayout = this.setFrameValues;
            this._packageName = "";
            this._frameWidth = "0";
            this._isAudioCreated = false;
          	this._isValidLanguage = false;
            this.recognizer = null;
            this._bufferSize = 1024;
            this._avAudioBus = 0;
            this._androidLanguage = "en-US";
            this._iosLanguage = "en-US";
            this._packageValidation = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_](\.[a-z0-9_]+)+[0-9a-z_*]$/;
          	this.controllerImpl=new ControllerImplementation(this,baseConfig.id);
            this.controllerImpl.requestPermission();
            konymp.logger.trace("----------Exiting constructor ---------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function initGetterSetters
         * @private
         * @description: Logic for getters/setters of custom properties
         */
        initGettersSetters: function() {
            konymp.logger.trace("----------Entering initGettersSetters Function---------", konymp.logger.FUNCTION_ENTRY);
            defineGetter(this, "packageName", function() {
                return this._packageName;
            });
            defineSetter(this, "packageName", function(val) {
                try {
                    if (this._packageValidation.test(val) && this._packageName !== null) {
                        this._packageName = val;
                    } else {
                        throw {
                          	"type":"CUSTOM",
                            "Error": "invalidpackagename",
                            "message": "the package name should be xxx.xxx.xxx"
                        };
                    }
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                  	if(exception.type === "CUSTOM"){
                    	throw exception;
                    }
                }
            });
            defineGetter(this, "setAndroidLanguage", function() {
                return this._androidLanguage;
            });
            defineSetter(this, "setAndroidLanguage", function(val) {
                this._androidLanguage = val;
            });
            defineGetter(this, "setIphoneLanguage", function() {
                return this._iosLanguage;
            });
            defineSetter(this, "setIphoneLanguage", function(val) {
                this._iosLanguage = val;
            });
            defineGetter(this, "setWebLanguage", function() {
                return this._webLanguage;
            });
            defineSetter(this, "setWebLanguage", function(val) {
                this._webLanguage = val;
            });
            konymp.logger.trace("----------Exiting initGettersSetters Function---------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function setFrameValues
         * @private
         * @description: stores the frame values
         */
        setFrameValues: function() {
            konymp.logger.trace("----------Entering setFrameValues Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (this.view.width !== "100%" && this._frameWidth.toString() === "0") {
                    this._frameLeft = parseFloat(this.view.frame.x);
                    this._frameWidth = parseFloat(this.view.frame.width);
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
            konymp.logger.trace("----------Exiting setFrameValues Function---------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function speech
         * @private
         * @description: The first call where device detection is done 
         */
        speech: function() {
            konymp.logger.trace("----------Entering speech Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (this._centerXSet === "") {
                    this._centerXSet = ((this._frameLeft + (this._frameWidth / 2)) / this._screenWidth) * 100;
                }
                this._text = "";
                this.view.width = "100%";
                this.view.centerX = "50%";
                this.view.flxMicrophone.isVisible = false;
                this.view.forceLayout();
              	this.controllerImpl.speechToText();
                konymp.logger.trace("----------Exiting speech Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }

        },
        /**
         * @function stop
         * @private
         * @description: This function stops recognition engines of individual platforms
         */
        stop: function() {
            try {
                konymp.logger.trace("----------Entering stop Function---------", konymp.logger.FUNCTION_ENTRY);
              	this.controllerImpl.stopRecognition();
              	this.resetUI();
                konymp.logger.trace("----------Exiting stop Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        },
        /**
         * @function resetUI
         * @private
         * @description: This function resetUI will reset the UI back initial state
         */
        resetUI: function() {
            try {
                konymp.logger.trace("----------Entering resetUI Function---------", konymp.logger.FUNCTION_ENTRY);
                this.view.imgGif.isVisible = false;
                this.view.flxMicrophone.isVisible = true;
                this.view.flxAnim.isVisible = false;
                this.view.flxMicrophone.isVisible = true;                
                this.view.centerX = this._centerXSet + "%";
                this.view.width = ((this._frameWidth / this._screenWidth) * 100) + "%";
                this.view.forceLayout();
                konymp.logger.trace("----------Exiting resetUI Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
                    throw exception;
                }
            }
        },
        /**
         * @function invokeCallback
         * @private
         * @description: This function will invoke speechCallback event
         */
        invokeCallback: function(text) {
            try {
                konymp.logger.trace("----------Entering invokeCallback Function---------", konymp.logger.FUNCTION_ENTRY);
                if (this.speechCallback !== undefined && this.speechCallback !== null && typeof this.speechCallback === 'function') {
                    this.speechCallback(text);
                }
                konymp.logger.trace("----------Exiting invokeCallback Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        },
        /**
         * @function onSpeechClick
         * @private
         * @description: This function is used to invoke speech function
         */
        onSpeechClick: function() {
            try {
                konymp.logger.trace("----------Entering onSpeechClick Function---------", konymp.logger.FUNCTION_ENTRY);
                if (this.onMicClick !== undefined && this.onMicClick !== null && typeof this.onMicClick === 'function') {
                    this.onMicClick();
                }
                this.speech();
                konymp.logger.trace("----------Exiting onSpeechClick Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        },
        /**
         * @function onSpeechCancel
         * @private
         * @description: This function is used to call stop function
         */
        onSpeechCancel: function() {
            try {
                konymp.logger.trace("----------Entering onSpeechCancel Function---------", konymp.logger.FUNCTION_ENTRY);
                if (this.onCancelClick !== undefined && this.onCancelClick !== null && typeof this.onSpeechCancel === 'function') {
                    this.onCancelClick();
                }
                this.stop();
                konymp.logger.trace("----------Exiting onSpeechCancel Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        }
    };
});