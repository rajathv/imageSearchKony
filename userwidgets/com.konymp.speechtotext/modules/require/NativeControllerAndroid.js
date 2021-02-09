define(['./Inherits', './NativeController'], function(Inherits, NativeController) {
    var konyLoggerModule = require('com/konymp/speechtotext/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("Speech To Text  Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;

    var NativeControllerAndroid = function(componentInstance) {
        this.componentInstance = componentInstance;
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
            this.KonyMain = java.import('com.konylabs.android.KonyMain');
            this.Locale = java.import("java.util.Locale");
            this.recognizerIntent = java.import("android.speech.RecognizerIntent");
            this.speechRecognizer = java.import("android.speech.SpeechRecognizer");
            this.Intent = java.import("android.content.Intent");
            this.contextCompat = java.import("androidx.core.content.ContextCompat");
            this.manifest = java.import("android.Manifest");
            this.packageManager = java.import("android.content.pm.PackageManager");
            this.activityCompact = java.import("androidx.core.app.ActivityCompat");
          	this.permission = java.import("konymp.com.request.RequestPermission");
            this.mLocale = this.Locale.getDefault();
            this.mContext = this.KonyMain.getActivityContext();
            this.recognitionListener = java.newClass('recognitionListener', 'java.lang.Object', ['android.speech.RecognitionListener'], {
                onReadyForSpeech: this.onReadyForSpeechAndroid.bind(this),
                onBeginningOfSpeech: this.onBeginningOfSpeechAndroid.bind(this),
                onRmsChanged: this.onRmsChangedAndroid.bind(this),
                onPartialResults: this.onPartialResultsAndroid.bind(this),
                onResults: this.onResultsAndroid.bind(this),
                onError: this.onErrorAndroid.bind(this),
                onBufferReceived: this.onBufferReceivedAndroid.bind(this),
                onEndOfSpeech: this.onEndOfSpeechAndroid.bind(this),
                onEvent: this.onEventAndroid.bind(this)
            });
          	this.requestPermission();
            konymp.logger.trace("----------Exiting importClasses Function---------", konymp.logger.FUNCTION_EXIT);
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
     * @description: This is first step for recognition
     */
    NativeControllerAndroid.prototype.speechToText = function() {
        try {
            konymp.logger.trace("----------Entering speechToText Function---------", konymp.logger.FUNCTION_ENTRY);
            if (this.request()) {
                kony.application.showLoadingScreen();
                this.mSpeechRecognizer = null;
                kony.runOnMainThread(this.startListening.bind(this), []);
            } else {
                this.componentInstance.resetUI();
            }
            konymp.logger.trace("----------Exiting speechToText Function---------", konymp.logger.FUNCTION_EXIT);
        } catch (exception) {
            kony.application.dismissLoadingScreen();
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
          	if(exception.type === "CUSTOM"){
            	throw exception;
            }
        }
    };
    /**
     * @function startListening
     * @private
     * @description: This function will start listening
     */
    NativeControllerAndroid.prototype.startListening = function() {
        try {
            konymp.logger.trace("----------Entering startListening Function---------", konymp.logger.FUNCTION_ENTRY);
            this.mSpeechRecognizer = this.speechRecognizer.createSpeechRecognizer(this.mContext);
            this.mSpeechRecognizer.setRecognitionListener(new this.recognitionListener());
            this.intent = new this.Intent(this.recognizerIntent.ACTION_RECOGNIZE_SPEECH);
            this.intent.putExtra(this.recognizerIntent.EXTRA_MAX_RESULTS, 1);
            this.intent.putExtra(this.recognizerIntent.EXTRA_PARTIAL_RESULTS, true);
            this.intent.putExtra(this.recognizerIntent.EXTRA_LANGUAGE, this.componentInstance.setAndroidLanguage);
            this.intent.putExtra(this.recognizerIntent.EXTRA_LANGUAGE_MODEL, this.recognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            this.intent.putExtra(this.recognizerIntent.EXTRA_CALLING_PACKAGE, this.mContext.getBasePackageName());
            this.mSpeechRecognizer.startListening(this.intent);
            konymp.logger.trace("----------Exiting startListening Function---------", konymp.logger.FUNCTION_EXIT);
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
     * @description: This function will stop the recognition and gives the final result of the speech
     */
    NativeControllerAndroid.prototype.stopRecognition = function() {
        try {
            konymp.logger.trace("----------Entering stopRecognition Function---------", konymp.logger.FUNCTION_ENTRY);
            kony.runOnMainThread(function() {
                this.mSpeechRecognizer.stopListening();
            }.bind(this), "");
            this.stopAndroidRecognition();
            konymp.logger.trace("----------Exiting stopRecognition Function---------", konymp.logger.FUNCTION_EXIT);
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            if(exception.type === "CUSTOM"){
            	throw exception;
            }
        }
    };
    /**
     * @function requestPermission
     * @private
     * @description: This function will check for permissions
     */
    NativeControllerAndroid.prototype.request = function() {
        try {
            if (this.contextCompat.checkSelfPermission(this.mContext, this.manifest.permission.RECORD_AUDIO) !== this.packageManager.PERMISSION_GRANTED) {
                return false;
            }
            return true;
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            if(exception.type === "CUSTOM"){
            	throw exception;
            }
        }
    };
  	/**
         * @function onAndroidSpeechResult
         * @private
         * @description: This function is to set text golbal veriable after end of speech
         */
        NativeControllerAndroid.prototype.onAndroidSpeechResult = function(speechText) {
            try {
                konymp.logger.trace("----------Entering onAndroidSpeechResult Function---------", konymp.logger.FUNCTION_ENTRY);
                this._text = speechText;
                this.stopRecognition();
                konymp.logger.trace("----------Exiting onAndroidSpeechResults Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        /**
         * @function onReadyForSpeechAndroid
         * @private
         * @description: This is called from listener callback
         */
        NativeControllerAndroid.prototype.onReadyForSpeechAndroid = function(bundle) {
            try {
                konymp.logger.trace("----------entering onReadyForSpeechAndroid Function---------", konymp.logger.FUNCTION_ENTRY);
                kony.application.dismissLoadingScreen();
                this.componentInstance.view.flxMicrophone.isVisible = false;
                this.componentInstance.view.flxAnim.isVisible = true;
                if (this.componentInstance.onReadyForSpeech !== undefined && this.componentInstance.onReadyForSpeech !== null) {
                    this.componentInstance.onReadyForSpeech(bundle);
                }
                konymp.logger.trace("----------exiting onReadyForSpeechAndroid Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        /**
         * @function onBeginningOfSpeechAndroid
         * @private
         * @description: This is called from listener callback
         */
        NativeControllerAndroid.prototype.onBeginningOfSpeechAndroid = function() {
            try {
                konymp.logger.trace("----------entering onBeginngofSpeechandroid Function---------", konymp.logger.FUNCTION_ENTRY);
                this.componentInstance.view.imgGif.isVisible = true;
                if (this.componentInstance.onBeginningOfSpeech !== undefined && this.componentInstance.onBeginningOfSpeech !== null) {
                    this.componentInstance.onBeginningOfSpeech();
                }
                konymp.logger.trace("----------exiting onBeginingForSpeechAndroid Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        /**
         * @function onRmsChangedAndroid
         * @private
         * @description: This is called from listener callback
         */
        NativeControllerAndroid.prototype.onRmsChangedAndroid = function(v) {
            try {
                konymp.logger.trace("----------entering onRmsChangedndroid Function---------", konymp.logger.FUNCTION_ENTRY);
                if (this.componentInstance.onRmsChanged !== undefined && this.componentInstance.onRmsChanged !== null) {
                    this.componentInstance.onRmsChanged(v);
                }
                konymp.logger.trace("----------exiting onRmsChangedAndroid Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        /**
         * @function onPartialResultsAndroid
         * @private
         * @description: This is called from listener callback
         */
        NativeControllerAndroid.prototype.onPartialResultsAndroid = function(bundle) {
            try {
                konymp.logger.trace("----------entering onPartialResultsAndroid Function---------", konymp.logger.FUNCTION_ENTRY);
                this.partialResults(bundle.getStringArrayList(this.speechRecognizer.RESULTS_RECOGNITION).get(0));
                konymp.logger.trace("----------exiting onPartialResultsAndroid Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        /**
         * @function onResultsAndroid
         * @private
         * @description: This is called from listener callback
         */
        NativeControllerAndroid.prototype.onResultsAndroid = function(bundle) {
            try {
                konymp.logger.trace("----------entering onResultsAndroid Function---------", konymp.logger.FUNCTION_ENTRY);
                this.onAndroidSpeechResult(bundle.getStringArrayList(this.speechRecognizer.RESULTS_RECOGNITION).get(0));
                konymp.logger.trace("----------exiting onResultsAndroid Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        /**
         * @function onErrorAndroid
         * @private
         * @description: This is called from listener callback
         */
        NativeControllerAndroid.prototype.onErrorAndroid = function(code) {
            try {
                konymp.logger.trace("----------entering onErrorAndroid Function---------", konymp.logger.FUNCTION_ENTRY);
                if (this.componentInstance.onError !== undefined && this.componentInstance.onError !== null) {
                    this.componentInstance.onError(code);
                }
                konymp.logger.trace("----------exiting onErrorAndroid Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        /**
         * @function onBufferReceivedAndroid
         * @private
         * @description: This is called from listener callback
         */
        NativeControllerAndroid.prototype.onBufferReceivedAndroid = function(bytes) {
            try {
                konymp.logger.trace("----------entering onBufferReceivedAndroid Function---------", konymp.logger.FUNCTION_ENTRY);
                if (this.componentInstance.onBufferReceived !== undefined && this.componentInstance.onBufferReceived !== null) {
                    this.componentInstance.onBufferReceived(bytes);
                }
                konymp.logger.trace("----------exiting onBufferReceivedAndroid Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        /**
         * @function onEndOfSpeechAndroid
         * @private
         * @description: This is called from listener callback
         */
        NativeControllerAndroid.prototype.onEndOfSpeechAndroid = function() {
            try {
                konymp.logger.trace("----------entering onEndOfSpeechAndroid Function---------", konymp.logger.FUNCTION_ENTRY);
                this.componentInstance.view.imgGif.isVisible = false;
                if (this.componentInstance.onEndOfSpeech !== undefined && this.componentInstance.onEndOfSpeech !== null) {
                    this.componentInstance.onEndOfSpeech();
                }
                konymp.logger.trace("----------exiting onEndOfSpeechAndroid Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        /**
         * @function onEventAndroid
         * @private
         * @description: This is called from listener callback
         */
        NativeControllerAndroid.prototype.onEventAndroid = function(i, bundle) {
            try {
                konymp.logger.trace("----------entering onEventAndroid Function---------", konymp.logger.FUNCTION_ENTRY);
                if (this.componentInstance.onEvent !== undefined && this.componentInstance.onEvent !== null) {
                    this.componentInstance.onEvent(i, bundle);
                }
                konymp.logger.trace("----------exiting onEventAndroid Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
        /**
         * @function stopAndroidRecognition
         * @private
         * @description: This function will stop android recognition
         */
        NativeControllerAndroid.prototype.stopAndroidRecognition = function() {
            try {
                konymp.logger.trace("----------Entering stopAndroidRecognition Function---------", konymp.logger.FUNCTION_ENTRY);
                if (this._text !== "") {
                    this.componentInstance.invokeCallback(this._text);
                }
                this._text = "";
                konymp.logger.trace("----------Exiting stopAndroidRecognition Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
  		/**
         * @function partialResults
         * @private
         * @description: This function is to trigger partial results event
         */
        NativeControllerAndroid.prototype.partialResults = function(text) {
            try {
                konymp.logger.trace("----------Entering partialResults Function---------", konymp.logger.FUNCTION_ENTRY);
                if (this.componentInstance.partialSpeechResults !== undefined && this.componentInstance.partialSpeechResults !== null) {
                    this.componentInstance.partialSpeechResults(text);
                }
                konymp.logger.trace("----------Exiting partialResults Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
        };
  		NativeControllerAndroid.prototype.requestPermission = function(){
      		try {
                konymp.logger.trace("----------Entering requestPermission Function---------", konymp.logger.FUNCTION_ENTRY);
                if (this.contextCompat.checkSelfPermission(this.mContext, this.manifest.permission.RECORD_AUDIO) !== this.packageManager.PERMISSION_GRANTED) {
                	var obj = new this.permission();
      				obj.requestPermissions(this.mContext,"android.permission.RECORD_AUDIO");
            	}
                konymp.logger.trace("----------Exiting requestPermission Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
            		throw exception;
            	}
            }
    	};

    return NativeControllerAndroid;
});
