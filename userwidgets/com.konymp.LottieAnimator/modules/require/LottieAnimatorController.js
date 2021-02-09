define("com/konymp/LottieAnimator/userLottieAnimatorController", ['./ControllerImplementation'], function(ControllerImplementation) {
    var konyLoggerModule = require('com/konymp/LottieAnimator/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("LottieAnimator Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            konymp.logger.trace("----------Entering constructor Function---------", konymp.logger.FUNCTION_ENTRY);
            this._urlRegex = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
            this._source = "";
            this._loop = "";
            this._speed = "";
            this._repeatMode = "";
            this._autoPlay = "";
            this._scaleMode = "";
            this.handler = new ControllerImplementation(this, baseConfig.id);
            konymp.logger.trace("----------Exiting constructor ---------", konymp.logger.FUNCTION_EXIT);
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
            konymp.logger.trace("----------Entering initGettersSetters Function---------", konymp.logger.FUNCTION_ENTRY);
            defineSetter(this, "source", function(val) {
                try {
                    this._source = val;
                    this.handler.propertyUpdated("source", val)
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineGetter(this, "source", function() {
                try {
                    return this._source;
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineSetter(this, "loop", function(val) {
                try {
                    this._loop = val;
                    this.handler.propertyUpdated("loop", val)
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineGetter(this, "loop", function() {
                try {
                    return this._loop;
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineSetter(this, "speed", function(val) {
                try {
                    this._speed = val;
                    this.handler.propertyUpdated("speed", val)
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineGetter(this, "speed", function() {
                try {
                    return this._speed;
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineSetter(this, "repeatMode", function(val) {
                try {
                    this._repeatMode = val;
					this.handler.propertyUpdated("repeatMode", val)
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineGetter(this, "repeatMode", function() {
                try {
                    return this._repeatMode;
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineSetter(this, "autoPlay", function(val) {
                try {
                    this._autoPlay = val;
                    this.handler.propertyUpdated("autoPlay", val)
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineGetter(this, "autoPlay", function() {
                try {
                    return this._autoPlay;
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineSetter(this, "scaleMode", function(val) {
                try {
                    this._scaleMode = val;
                    this.handler.propertyUpdated("scaleMode", val)
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineGetter(this, "scaleMode", function() {
                try {
                    return this._scaleMode;
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
          defineSetter(this, "onAnimationEnd", function(val) {
                try {
                    //kony.print("kanike set OnAnimend",val);
                    this._onAnimationEnd = val;
                    this.handler.propertyUpdated("onAnimationEnd", val)
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineGetter(this, "onAnimationEnd", function() {
                try {
                    return this._onAnimationEnd;
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });          
            konymp.logger.trace("----------Exiting initsetgetter ---------", konymp.logger.FUNCTION_EXIT);
        },
        createLottiView: function(eventObj) {
            //alert("hi");
            try {
                konymp.logger.trace("----------Entering fetchAndDisplay Function---------", konymp.logger.FUNCTION_ENTRY);
                if (eventObj !== undefined && eventObj !== null) {
                    this.handler.createLottiView(eventObj);
                }
                konymp.logger.trace("----------Exiting fetchAndDisplay Function ---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
        },
        onLayoutSubviewsFunc: function(eventObj) {
            try {
                konymp.logger.trace("----------Entering onLayputSubviewsFunc Function---------", konymp.logger.FUNCTION_ENTRY);
                if (eventObj !== undefined && eventObj !== null) {
                    this.handler.onLayoutSubviews(eventObj);
                }
                konymp.logger.trace("----------Exiting onLayputSubviewsFunc Function ---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
        },
        onCleanUpFunc: function(eventObj) {
            try {
                konymp.logger.trace("----------Entering onCleanUpFunc Function---------", konymp.logger.FUNCTION_ENTRY);
                if (eventObj !== undefined && eventObj !== null) {
                    this.handler.onCleanup(eventObj);
                }
                konymp.logger.trace("----------Exiting onCleanUpFunc Function ---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
        },
        play: function() {
            this.handler.play();
        },
        pause: function() {
            this.handler.pause();
        },
        stop: function() {
            this.handler.stop();
        },
        resume: function() {
            this.handler.resume();
        },
        isAnimating: function() {
            var status =  this.handler.isAnimating();
            return status;
        },
      	onClickFunc:function() {
           if(typeof(this.onClick) == "function")
            this.onClick(this);
        },
    };
});