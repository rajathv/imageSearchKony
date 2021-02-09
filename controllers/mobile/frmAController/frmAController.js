define({ 
  createComponent: function()
  {
    /* Creating the component's object */
    var LottieAnimator = new com.konymp.LottieAnimator(
      {
        "clipBounds": true,
        "height": "70%",
        "id": "LottieAnimator",
        "isVisible": true,
        "left": "0dp",
        "top": "0dp",
        "bottom":"10%",
        "width": "100%",
        "zIndex": 1
      }, {}, {});

    /* Setting the component's properties */
    LottieAnimator.source = "mylottie.json";
    LottieAnimator.loop = 1;
    LottieAnimator.speed = 1.2;
    LottieAnimator.autoPlay = true;
    LottieAnimator.scaleMode = "Maintain Aspect Ratio";
    LottieAnimator.repeatMode = "Restart";

    /* Adding the component to a Form */ 
    this.view.add(LottieAnimator);
  }
});
/*
onClickNavFrmB : function(){
  console.log("NAvigating to form B");
  var ntf = new kony.mvc.Navigation("frmB");
  ntf.navigate();
},





  onInitFrmA : function(){
  console.log("Inititalizing form A");
},

    onPreshowFrmA : function(){
  console.log("Preshow  form A triggered");
},
      onPostshowFrmA : function(){
  console.log("Preshow  form A triggered");
},
       onHideFrmA : function(){
  console.log("on hide  form A triggered");
},
         onDestroyFrmA : function(){
  console.log("Destroying form A from Formb");
},



  /*
  preshow : function(){
    //Sample code for creating an MLCamera widget. 
    //Sample code to create an image classifier object using TestingModel model.`
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

      alert(maxProp);
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

    var mlCamBasic = {

      "height": "70%",
      "id": "mlCamera",
      "isVisible": true,
      "left": "5dp",
      "top": "55dp",
      "width": "100%",
      "zIndex": 1
    };
    var mlCamLayout = {};

    var mlCamPsp = {};

    var mlCamera = new kony.ui.MLCamera(mlCamBasic, mlCamLayout, mlCamPsp);
    self.view.add(mlCamera);

    self.view.mlCamera.setImageClassifier(imageClassifier);
    self.view.mlCamera.startDetection();


  }
  */




