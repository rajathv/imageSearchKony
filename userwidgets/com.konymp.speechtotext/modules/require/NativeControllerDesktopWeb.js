define(['./Inherits', './NativeController'], function(Inherits, NativeController) {
    var konyLoggerModule = require('com/konymp/speechtotext/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("Speech To Text  Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;

    var NativeControllerDesktop = function(componentInstance) {
        this.componentInstance = componentInstance;
        NativeController(this);
    };

    Inherits(NativeControllerDesktop, NativeController);

    /**
     * @function speechToText
     * @private
     * @description: This is first step for recognition
     */
    NativeControllerDesktop.prototype.speechToText = function() {
        try {
            konymp.logger.trace("----------Entering speechToText Function---------", konymp.logger.FUNCTION_ENTRY);
      		this.speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          	if(this.speechRecognition === undefined || this.speechRecognition === null){
              throw {
                "message" : "Speech to text is not supported by this browser"
              };
            }
  			this.recognition = new this.speechRecognition();
          	// If false, the recording will stop after a few seconds of silence.
			// When true, the silence period is longer (about 15 seconds),
			// allowing us to keep recording even when the user pauses.
			this.recognition.continuous = true;
          	this.recognition.onresult = this.onResults.bind(this);
          	this.recognition.onstart = this.onReadyForSpeech.bind(this);
          	this.recognition.onspeechend = this.onEndOfSpeech.bind(this);
          	this.recognition.onspeechstart = this.onBeginningOfSpeech.bind(this);
          	this.recognition.onnomatch = this.onError.bind(this,"no match found");
          	this.recognition.onend = this.onEndOfSpeech.bind(this);
          	this.recognition.onerror = this.onError.bind(this);
          	this.recognition.interimResults = true;
          	this.recognition.lang = this.componentInstance.setWebLanguage;
          	this.recognition.start();
            konymp.logger.trace("----------Exiting speechToText Function---------", konymp.logger.FUNCTION_EXIT);
        } catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
        }
    };
    /**
     * @function stopRecognition
     * @private
     * @description: This function will stop the recognition and gives the final result of the speech
     */
    NativeControllerDesktop.prototype.stopRecognition = function() {
        try {
            konymp.logger.trace("----------Entering stopRecognition Function---------", konymp.logger.FUNCTION_ENTRY);
          	this.recognition.stop();
            konymp.logger.trace("----------Exiting stopRecognition Function---------", konymp.logger.FUNCTION_EXIT);
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
        NativeControllerDesktop.prototype.onSpeechResult = function() {
            try {
                konymp.logger.trace("----------Entering onSpeechResult Function---------", konymp.logger.FUNCTION_ENTRY);
              	if(this.eventObj !== undefined && this.eventObj !== null){
                  var numberOfSentences = this.eventObj.results.length;
                  var resultSpeech = "";
                  for(var i=0;i<numberOfSentences;i++){
                    var sentence = this.eventObj.results[i][0].transcript;
                    resultSpeech+=sentence;
                  }
                  this.componentInstance.invokeCallback(resultSpeech);
                }
                konymp.logger.trace("----------Exiting onSpeechResults Function---------", konymp.logger.FUNCTION_EXIT);
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
        NativeControllerDesktop.prototype.onReadyForSpeech = function() {
            try {
                konymp.logger.trace("----------entering onReadyForSpeech Function---------", konymp.logger.FUNCTION_ENTRY);
                this.componentInstance.view.flxMicrophone.isVisible = false;
                this.componentInstance.view.flxAnim.isVisible = true;
              	this.componentInstance.view.forceLayout();
                konymp.logger.trace("----------exiting onReadyForSpeech Function---------", konymp.logger.FUNCTION_EXIT);
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
        NativeControllerDesktop.prototype.onBeginningOfSpeech = function() {
            try {
                konymp.logger.trace("----------entering onBeginngofSpeech Function---------", konymp.logger.FUNCTION_ENTRY);
                this.componentInstance.view.imgGif.isVisible = true;
              	this.componentInstance.view.forceLayout();
                konymp.logger.trace("----------exiting onBeginingForSpeech Function---------", konymp.logger.FUNCTION_EXIT);
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
        NativeControllerDesktop.prototype.onResults = function(event) {
            try {
                konymp.logger.trace("----------entering onResults Function---------", konymp.logger.FUNCTION_ENTRY);
				this.eventObj = event;
              	var text = event.results[event.resultIndex][0].transcript;
                this.partialResults(text);
              	konymp.logger.trace("----------exiting onResults Function---------", konymp.logger.FUNCTION_EXIT);
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
        NativeControllerDesktop.prototype.onError = function(error) {
            try {
                konymp.logger.trace("----------entering onError Function---------", konymp.logger.FUNCTION_ENTRY);
                throw error;
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
        NativeControllerDesktop.prototype.onEndOfSpeech = function() {
            try {
                konymp.logger.trace("----------entering onEndOfSpeech Function---------", konymp.logger.FUNCTION_ENTRY);
              	this.onSpeechResult();
                konymp.logger.trace("----------exiting onEndOfSpeech Function---------", konymp.logger.FUNCTION_EXIT);
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
        NativeControllerDesktop.prototype.partialResults = function(text) {
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
        NativeControllerDesktop.prototype.requestPermission = function(){
          // This function is used for android to avoid crash in this platform declared. 
        };

    return NativeControllerDesktop;
});
