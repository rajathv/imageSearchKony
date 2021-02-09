define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

            var self = this;
    function successCallback(recognitionArray) {
      var size = recognitionArray.length;
    var regObj = {};
      for (i = 0; i < size; i++) {
        kony.print(recognitionArray[i].title + "--------->" + recognitionArray[i].confidence);
     regObj[recognitionArray[i].title]= recognitionArray[i].confidence;
        //var regData =recognitionArray[i].title + "--------->" + recognitionArray[i].confidence;
        //this.view.lblData.text = regData;
     
      }
      alert(regObj);
    }

    function failureCallback(errorCode) {
     
      alert(errorCode);
    }

    var config = {
      "modelPath": "mobilenet",
      "modelPathSource": kony.ml.LABEL_SOURCE_TYPE_BUNDLED,
      "onSuccess": successCallback,
      "onFailure": failureCallback,
      "modelInputSize": {
        "width": 224,
        "height": 224
      },
      "labelPath": "labels",
      "labelPathSource": kony.ml.LABEL_SOURCE_TYPE_BUNDLED,
      "device": kony.ml.MODEL_DEVICE_CPU,
      "modelType": kony.ml.MODEL_TYPE_QUANTIZED
    };

    var imageClassifier = new kony.ml.ImageClassifier(config);	
    
    var rawBytes = self.view.camera.rawBytes;
   
    //var rawBytes = self.view.cameraClick.rawBytes;
   
    imageClassifier.recognizeImage(rawBytes);
  }
          
          
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});