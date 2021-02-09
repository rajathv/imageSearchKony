define({ 

  //Type your controller code here 
  onTextSearch : function(){

    var self = this;
    var searchText = self.view.txtSearchBox.text;
    var url = "http://www.google.com/search?q="+searchText+"&tbm=isch";
    var urlConf = {
      URL: url,
      requestMethod: constants.BROWSER_REQUEST_METHOD_GET
    };

    self.view.browserSearch.requestURLConfig = urlConf;

  },
  speechtextCon : function(){
    this.view.componentID.speechCallBack = function(speechText)
    {
      alert("Speech converted to Text: "+speechText);
    }.bind(this);
  },


  onCaptureCamera : function(){


    var self = this;

    function successCallback(recognitionArray) {
      var size = recognitionArray.length;
      var regObj = {};
      for (i = 0; i < size; i++) {
        kony.print(recognitionArray[i].title + "--------->" + recognitionArray[i].confidence);
        regObj[recognitionArray[i].title]= parseFloat(recognitionArray[i].confidence);
        //var regData =recognitionArray[i].title + "--------->" + recognitionArray[i].confidence;
        //this.view.lblData.text = regData;

      }
      var data = regObj;
      var maxProp = null;
      var maxValue = -1;
      for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
          var value = data[prop];
          if (value > maxValue) {
            maxProp = prop;
            maxValue = value;
          }
        }
      }
      var url = "http://www.google.com/search?q="+maxProp+"&tbm=isch";
      var urlConf = {
        URL: url,
        requestMethod: constants.BROWSER_REQUEST_METHOD_GET
      };

      self.view.browserSearch.requestURLConfig = urlConf;
      //alert(maxProp);
      self.view.txtSearchBox.text= maxProp;
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

});