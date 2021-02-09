define(['./Inherits', './NativeController'], function(Inherits, NativeController) {
    var konyLoggerModule = require('com/konymp/LottieAnimator/konyLogger');
    var konymp = konymp || {};
    var konympJumio = konympJumio || {};
    konymp.logger = (new konyLoggerModule("LottieAnimator Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
    var NativeControllerIOS = function(implementationContext) {
        konympJumio.controllerContext = this;
        this.componentInstance = implementationContext.componentInstance;
        NativeController(this);
        this.importClasses();
        this.mainContainerView = null;
        var tempPath = kony.types.RawBytes.getTempPath() + constants.FILE_PATH_SEPARATOR + "LottieNetworkFiles";;
        var applicationDirPath = kony.io.FileSystem.getApplicationDirectoryPath()
        this.applicationDirPath = applicationDirPath;
        // alert(tempPath)
        new kony.io.File(tempPath).createDirectory();
        this.networkFileDownloadLoc = tempPath;
        this.currState = "";
    };
    Inherits(NativeControllerIOS, NativeController);
    /**
     * @function importClasses
     * @private
     * @description: this function will import all the classes from the frameworks
     */
    NativeControllerIOS.prototype.importClasses = function() {
        this.CompatibleAnimation = objc.import("Lottie.CompatibleAnimation");
        this.CompatibleAnimationView = objc.import("Lottie.CompatibleAnimationView");
        this.NSBundle = objc.import("NSBundle")
        var resourceDownloaderPath = 'com/konymp/' + 'LottieAnimator' + "/ResourceDownloaderiOS.js";
        this.ResourceDownloader = require(resourceDownloaderPath)
    };
    generateHashCode = function(stringTag) {
        var hash = 0,
            i, chr;
        for (i = 0; i < stringTag.length; i++) {
            chr = stringTag.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
    NativeControllerIOS.prototype.createLottiView = function(eventObj) {
        // alert("Native iOS Controller");
        this.mainContainerView = eventObj;
        this.loadSrcFile()
            //Access Properies defined in constructor
            //alert("source : " + this.componentInstance.source + "autoPlay ->" + this.componentInstance.autoPlay);
    };
    NativeControllerIOS.prototype.loadSrcFile = function() {
        var currThis = this;
        if (currThis.componentInstance._source == undefined) return;
        kony.runOnMainThread(mainthread, []);

        function mainthread() {
            if (currThis.currAnimatorView != undefined && currThis.currAnimatorView) {
                currThis.currAnimatorView.removeFromSuperview()
                currThis.currAnimatorView = null;
            }
            if (currThis.mainContainerView == undefined) return;
            if (currThis.componentInstance._source.indexOf("https://") == 0) {
                var resourceDownloaderJSObj = new currThis.ResourceDownloader();
                var hashCodeFileName = generateHashCode(currThis.componentInstance._source)
                new kony.io.File(currThis.networkFileDownloadLoc+"/"+hashCodeFileName).createDirectory();
                resourceDownloaderJSObj.downloadResource(currThis.componentInstance._source, currThis, currThis.networkFileDownloadLoc+"/"+hashCodeFileName, hashCodeFileName)
                return;
            } else {
                var applicationDirPathFile = currThis.applicationDirPath + constants.FILE_PATH_SEPARATOR + currThis.componentInstance._source
                if (new kony.io.File(applicationDirPathFile).exists()) {
                    currThis.loadLottieFileFromLocation(currThis.componentInstance._source, currThis.applicationDirPath)
                } else {
                    currThis.loadLottieFileFromLocation(currThis.componentInstance._source, null)
                }
            }
        }
    };
    NativeControllerIOS.prototype.loadLottieFileFromLocation = function(fileName, filePath) {
        var currThis = this;
        if (fileName == undefined) return;
        kony.runOnMainThread(mainthread, []);

        function mainthread() {
            if (currThis.currAnimatorView != undefined && currThis.currAnimatorView) {
                currThis.currAnimatorView.removeFromSuperview()
                currThis.currAnimatorView = null;
            }
            if (currThis.mainContainerView == undefined) return;
            var compAnimObj = null;
            //kony.print("Lottie hash ", fileName.toString())
            //kony.print("Lottie FilePath ", filePath.toString())
            if (filePath == undefined || filePath == null) compAnimObj = currThis.CompatibleAnimation.named(getFileNameWithOutExtension(fileName))
            else compAnimObj = currThis.CompatibleAnimation.alloc().initWithNameBundle(getFileNameWithOutExtension(fileName.toString()), currThis.NSBundle.bundleWithPath(filePath))
            currThis.currAnimatorView = currThis.CompatibleAnimationView.alloc().initWithCompatibleAnimation(compAnimObj)
            currThis.currAnimatorView.clipsToBounds = true
            currThis.currAnimatorView.loopAnimationCount = currThis.componentInstance.loop;
            currThis.currAnimatorView.translatesAutoresizingMaskIntoConstraints = true
            currThis.currAnimatorView.contentMode = getScaleMode(currThis.componentInstance.scaleMode);
            currThis.currAnimatorView.animationSpeed = currThis.componentInstance.speed;
            currThis.mainContainerView.addSubview(currThis.currAnimatorView)
            if (currThis.componentInstance.autoPlay) {
                currThis.currState = "Play";
                currThis.currAnimatorView.playWithCompletion(function(done) {
                    var typeofOnAnimationEnd = typeof(currThis.componentInstance.onAnimationEnd)
                    if (done && typeofOnAnimationEnd == "function") {
                        currThis.currState = "Stop";
                        currThis.componentInstance.onAnimationEnd(currThis.componentInstance);
                    }
                })
            }
        }
    };
    getFileNameWithOutExtension = function(fileName) {
        return fileName.split('.')[0];
    };
    getScaleMode = function(scaleModeValue) {
        if (scaleModeValue === "Maintain Aspect Ratio") return 1;
        return 0;
    };
    //   	loadSrcOnView : function(){
    //       		var currThis = this;
    //             if(currThis.componentInstance._source == undefined)
    //                 return;
    //             kony.runOnMainThread(mainthread, []);
    //             function mainthread () {
    //                   if(currThis.currAnimatorView != undefined && currThis.currAnimatorView)
    //                   {
    //                       currThis.currAnimatorView.removeFromSuperview()
    //                       currThis.currAnimatorView = null;
    //                   }
    //                   if(currThis.mainContainerView == undefined)
    //                       return;
    //                   if(currThis.componentInstance._source.indexOf("https://")==0)
    //                   {
    //                       var resourceDownloaderPath =  'com/konymp/' + 'LottieAnimator' +  "/resourceDownloader.js";
    //                       var resourceDownloaderFunc = require(resourceDownloaderPath)
    //                       var resourceDownloaderJSObj = new resourceDownloaderFunc();
    //                       resourceDownloaderJSObj.downloadResource(currThis.componentInstance._source,currThis)
    //                       return;
    //                   }
    //                   var compAnimObj = currThis.CompatibleAnimation.named(currThis._src)
    //                       currThis.currAnimatorView = currThis.CompatibleAnimationView.alloc().initWithCompatibleAnimation(compAnimObj)
    //                       currThis.currAnimatorView.clipsToBounds = true
    //                       currThis.currAnimatorView.loopAnimationCount = currThis._loop;
    //                       currThis.currAnimatorView.translatesAutoresizingMaskIntoConstraints = true
    //                       currThis.currAnimatorView.contentMode = currThis._imageScaleMode;
    //                       currThis.currAnimatorView.animationSpeed = currThis._speed;
    //                   currThis.mainContainerView.addSubview(currThis.currAnimatorView)
    //                   if(currThis._autoPlay)
    //                       currThis.currAnimatorView.play()
    //            }
    //     };
    NativeControllerIOS.prototype.resourceDidDownloaded = function resourceDidDownloaded(srcURL, fileNameHashValue) {
        //kony.print("Lottie hash ", fileNameHashValue)
      	kony.print("Lottie::Path ",this.networkFileDownloadLoc);
        this.loadLottieFileFromLocation(fileNameHashValue, this.networkFileDownloadLoc+"/"+fileNameHashValue)
    };
    NativeControllerIOS.prototype.play = function() {
        var currThis = this;
        kony.runOnMainThread(mainthread, []);

        function mainthread() {
            currThis.currState = "Play";
            currThis.currAnimatorView.playWithCompletion(function(done) {
                var typeofOnAnimationEnd = typeof(currThis.componentInstance.onAnimationEnd)
                if (done && typeofOnAnimationEnd == "function") {
                    currThis.currState = "Stop";
                    currThis.componentInstance.onAnimationEnd(currThis.componentInstance);
                }
            })
        }
        // alert("play");
    };
    NativeControllerIOS.prototype.pause = function() {
        var currThis = this;
        kony.runOnMainThread(mainthread, []);

        function mainthread() {
            if (currThis.currState == "Play") {
            currThis.currState = "Pause";
            currThis.currAnimatorView.pause()
            }
        }
    };
    NativeControllerIOS.prototype.resume = function() {
        var currThis = this;
        kony.runOnMainThread(mainthread, []);

        function mainthread() {
            if (currThis.currState == "Pause") {
                currThis.currState = "Play";
                currThis.currAnimatorView.playWithCompletion(function(done) {
                    var typeofOnAnimationEnd = typeof(currThis.componentInstance.onAnimationEnd)
                    if (done && typeofOnAnimationEnd == "function") {
                        currThis.currState = "Stop";
                        currThis.componentInstance.onAnimationEnd(currThis.componentInstance);
                    }
                })
            }
        }
    };
    NativeControllerIOS.prototype.stop = function() {
        var currThis = this;
        kony.runOnMainThread(mainthread, []);

        function mainthread() {
            currThis.currState = "Stop";
            currThis.currAnimatorView.stop()
        }
    };
    NativeControllerIOS.prototype.isAnimating = function() {
        // alert("isAnimating method is not suppoertes in iOS");
    };
    NativeControllerIOS.prototype.propertyUpdated = function(propName, propValue) {
        if (propName == undefined) return;
        var currThis = this;
        kony.runOnMainThread(mainthread, []);

        function mainthread() {
           if (propName === "source") {
                currThis.loadSrcFile();
            } 
            if (currThis.currAnimatorView == undefined || currThis.currAnimatorView == null) return;
            else if (propName === "loop") {
                currThis.currAnimatorView.loopAnimationCount = propValue;
            } else if (propName === "speed") {
                currThis.currAnimatorView.animationSpeed = propValue;
            } else if (propName === "scaleMode") {
                currThis.currAnimatorView.contentMode = getScaleMode(propValue);
            }
        }
    };
    NativeControllerIOS.prototype.onLayoutSubviews = function(nativeContainerView) {
        if (this.currAnimatorView) this.currAnimatorView.frame = nativeContainerView.bounds;
    };
    NativeControllerIOS.prototype.onCleanup = function(eventObj) {
        //kony.print("Kanike OncleanUp");
        var tempFileLoc = new kony.io.File(this.networkFileDownloadLoc);
        tempFileLoc.remove(true);
    };
    return NativeControllerIOS;
});
