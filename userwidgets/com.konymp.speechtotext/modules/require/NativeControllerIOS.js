define(['./Inherits', './NativeController'], function(Inherits, NativeController) {
    var konyLoggerModule = require('com/konymp/speechtotext/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("Speech To Text Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;

    var NativeControllerIOS = function(componentInstance) {
        this.componentInstance = componentInstance;
        NativeController(this);
		this.importClasses();

        var isObjectCreated = this.createAudioEngine();
        if (!isObjectCreated) {
            throw {
                "type": "CUSTOM",
                "Error": "Recognition",
                "message": "unable to create recognition object w5"
            };
        }
    };

    Inherits(NativeControllerIOS, NativeController);

    /**
     * @function importClasses
     * @private
     * @description: this function will import all the classes from the franeworks and store in the nativeClasses variable
     */
    NativeControllerIOS.prototype.importClasses = function() {
        try {
            konymp.logger.trace("----------Entering importClasses Function---------", konymp.logger.FUNCTION_ENTRY);
            this.audioSession = objc.import('AVAudioSession').sharedInstance();
            this.SFSpeechAudioBufferRecognitionRequest = objc.import('SFSpeechAudioBufferRecognitionRequest');
            this.audioEngineClass = objc.import('AVAudioEngine');
            this.SFSpeechRecognizer = objc.import('SFSpeechRecognizer');
            this.NSLocale = objc.import("NSLocale");
            var recognizerDelegate = objc.newClass('recognizerDelegate' + this.getRandomNumber(), 'NSObject', ['SFSpeechRecognizerDelegate'], {
                speechRecognizerAvailabilityDidChange: function(available) {
                    konymp.logger.info(available.toString(), konymp.logger.SUCCESS_CALLBACK);
                }
            });
			this.recognizerDelegateObj = recognizerDelegate.jsnew();
            konymp.logger.trace("----------Exiting importClasses Function---------", konymp.logger.FUNCTION_EXIT);
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            if (exception.type === "CUSTOM") {
                throw exception;
            }
        }
    };
    /**
     * @function createAudioEngine
     * @private
     * @description: this function creates audio engine variable
     */
    NativeControllerIOS.prototype.createAudioEngine = function() {
        try {
            konymp.logger.trace("----------entering createAudioEngine Function---------", konymp.logger.FUNCTION_ENTRY);
            this.audioEngine = this.audioEngineClass.alloc().jsinit();
            var set = this.SFSpeechRecognizer.supportedLocales().allObjects;
            this.locale = this.NSLocale.alloc().initWithLocaleIdentifier(this.componentInstance._iosLanguage);
            for (var i = 0; i < set.length; i++) {
                if (set[i].localeIdentifier === this.locale.localeIdentifier) {
                    this._isValidLanguage = true;
                    break;
                }
            }
            if (this._isValidLanguage) {
                this.recognizer = this.SFSpeechRecognizer.alloc().initWithLocale(this.locale);
                if (this.recognizer !== undefined && this.recognizer !== null) {
                    this.recognizer.delegate = this.recognizerDelegateObj;
                    this.SFSpeechRecognizer.requestAuthorization(function(authStatus) {
                        if (authStatus !== SFSpeechRecognizerAuthorizationStatusAuthorized) {
                            throw {
                                "type": "CUSTOM",
                                "Error": "Permission",
                                "message": "no microphone permission"
                            };
                        }
                    });
                    return true;
                }
                konymp.logger.trace("----------exiting createAudioEngine Function---------", konymp.logger.FUNCTION_EXIT);
                return false;
            } else {
                konymp.logger.trace("----------exiting createAudioEngine Function---------", konymp.logger.FUNCTION_EXIT);
                throw {
                    "type": "CUSTOM",
                    "Error": "language",
                    "message": "language is not supported by the device"
                };
            }
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            if (exception.type === "CUSTOM") {
                throw exception;
            }
        }
    };
	/**
     * @function getRandomNumber
     * @private
     * @description: This function will generate random number
     */
    NativeControllerIOS.prototype.getRandomNumber = function() {
        try {
            konymp.logger.trace("----------Entering getRandomNumber Function---------", konymp.logger.FUNCTION_ENTRY);
			var seed = Math.random();
            var x = (Math.sin(seed++) * 10000);
            var randomNumber = x - Math.floor(x);
			return randomNumber;
            konymp.logger.trace("----------Exiting getRandomNumber Function---------", konymp.logger.FUNCTION_EXIT);
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            if (exception.type === "CUSTOM") {
                throw exception;
            }
        }
    };
    /**
     * @function speechToText
     * @private
     * @description: This is first step for recognition
     */
    NativeControllerIOS.prototype.speechToText = function() {
        try {
            konymp.logger.trace("----------Entering iosSpeechToText Function---------", konymp.logger.FUNCTION_ENTRY);
            kony.runOnMainThread(function() {
                this.componentInstance.view.flxAnim.isVisible = true;
            }.bind(this), []);
            this.recognitionTask = null;
            this.recognitionRequest = null;
            this.iosStartListening();
            konymp.logger.trace("----------Exiting iosSpeechToText Function---------", konymp.logger.FUNCTION_EXIT);
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            if (exception.type === "CUSTOM") {
                throw exception;
            }
        }
    };
    /**
     * @function iosStartListening
     * @private
     * @description: This function start listening
     */
    NativeControllerIOS.prototype.iosStartListening = function() {
        try {
            konymp.logger.trace("----------Entering iosStartListening Function---------", konymp.logger.FUNCTION_ENTRY);
            if (!this.audioEngine.running) {
                this.audioSession.setCategoryWithOptionsError(AVAudioSessionCategoryPlayAndRecord, AVAudioSessionCategoryOptionDefaultToSpeaker, undefined);
                this.audioSession.setModeError(AVAudioSessionModeMeasurement, undefined);
                this.audioSession.setActiveWithOptionsError(true, AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation, undefined);
                this.inputNode = this.audioEngine.inputNode;
                this.recognitionRequest = this.SFSpeechAudioBufferRecognitionRequest.jsnew();
                this.recognitionRequest.shouldReportPartialResults = true;
                kony.runOnMainThread(function() {
                    this.componentInstance.view.imgGif.isVisible = true;
                }.bind(this), []);
                this.recognitionTask = this.recognizer.recognitionTaskWithRequestResultHandler(this.recognitionRequest, this.resultHandler.bind(this));
                this.inputNode.installTapOnBusBufferSizeFormatBlock(this.componentInstance._avAudioBus,
                                        this.componentInstance._bufferSize,
                                        this.inputNode.outputFormatForBus(this.componentInstance._avAudioBus),
                                        function(buf, when) {
                                            this.recognitionRequest.appendAudioPCMBuffer(buf);
                                        }.bind(this));
                this.audioEngine.prepare();
                var isStarted = this.audioEngine.startAndReturnError(undefined);
				if(!isStarted){
					throw {
						"type" : "DEV",
						"Error" : "AudioEngine",
						"message" : "unable to start Audio Engine"
					};
				}
            } else {
                konymp.logger.info('Audio Engine is already running!');
            }
            konymp.logger.trace("----------Exiting iosStartListening Function---------", konymp.logger.FUNCTION_EXIT);
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            if (exception.type === "CUSTOM") {
                throw exception;
            }
        }
    };
    /**
     * @function resultHandler
     * @private
     * @description: This function will handle results
     */
    NativeControllerIOS.prototype.resultHandler = function(result, error) {
        try {
            konymp.logger.trace("----------Entering resultHandler Function---------", konymp.logger.FUNCTION_ENTRY);
            if (result) {
                if (result.final) {
                    var text = result.bestTranscription.formattedString;
                    this.stopRecognition(text);
                }
                this.partialResults(result.bestTranscription.formattedString);
            }
            if (error) {
                this.inputNode.removeTapOnBus(0);
                this.stopRecognition("");
                throw error;
            }
            konymp.logger.trace("----------Exiting resultHandler Function---------", konymp.logger.FUNCTION_EXIT);
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            if (exception.type === "CUSTOM") {
                throw exception;
            }
        }
    };
    /**
     * @function stopRecognition
     * @private
     * @description: This function will stop the recognition and gives the final result of the speech
     */
    NativeControllerIOS.prototype.stopRecognition = function(text) {
        try {
            konymp.logger.trace("----------Entering stopRecognition Function---------", konymp.logger.FUNCTION_ENTRY);
            this.recognitionRequest.endAudio();
            this.audioEngine.stop();
            this.inputNode.removeTapOnBus(0);
            this.stopIosRecognition(text);
            konymp.logger.trace("----------Exiting stopRecognition Function---------", konymp.logger.FUNCTION_EXIT);
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            if (exception.type === "CUSTOM") {
                throw exception;
            }
        }
    };
    /**
     * @function stopIosRecognition
     * @private
     * @description: This function will stop ios recognition
     */
    NativeControllerIOS.prototype.stopIosRecognition = function(text) {
        try {
            konymp.logger.trace("----------Entering stopIosRecognition Function---------", konymp.logger.FUNCTION_ENTRY);
            if (text !== "" && text !== null) {
                this.componentInstance.invokeCallback(text);
            }
            text = null;
            konymp.logger.trace("----------Exiting stopIosRecognition Function---------", konymp.logger.FUNCTION_EXIT);
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            if (exception.type === "CUSTOM") {
                throw exception;
            }
        }
    };
    /**
     * @function partialResults
     * @private
     * @description: This function is to trigger partial results event
     */
    NativeControllerIOS.prototype.partialResults = function(text) {
        try {
            konymp.logger.trace("----------Entering partialResults Function---------", konymp.logger.FUNCTION_ENTRY);
            if (this.componentInstance.partialSpeechResults !== undefined && this.componentInstance.partialSpeechResults !== null) {
                this.componentInstance.partialSpeechResults(text);
            }
            konymp.logger.trace("----------Exiting partialResults Function---------", konymp.logger.FUNCTION_EXIT);
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            if (exception.type === "CUSTOM") {
                throw exception;
            }
        }
    };
  	NativeControllerIOS.prototype.requestPermission = function(){
      	// this method for future permission request
    };

    return NativeControllerIOS;
});
