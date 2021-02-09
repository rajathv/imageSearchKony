define([], function() {
    var sharedContext = null;
    var url2DelegateObjMap = {};
    var resourceDownloader1 = function(){
        
    };
    var resourceDownloader = function() {
        if(sharedContext == undefined){
            sharedContext = new resourceDownloader1();
        }
        return sharedContext;
    };
    resourceDownloader1.prototype.downloadResource = function(srcURL,delegateObj,downloadLoc,fileName){
        if(srcURL == undefined || delegateObj == undefined)
            return
        if(srcURL && !(srcURL in url2DelegateObjMap)){
            url2DelegateObjMap[srcURL] = [];
        }
        if(delegateObj && !(delegateObj in url2DelegateObjMap[srcURL]))
        {
            var delegateListObjects = url2DelegateObjMap[srcURL]
            if(url2DelegateObjMap[srcURL].length==0)
                downloadResourceUsingHTTP(srcURL,downloadLoc,fileName)
            delegateListObjects.push(delegateObj);
        }
       // downloadResourceUsingHTTP(srcURL)
    };
    sendNotificationToDelegates = function(srcURL,fileNameHashValue){
        for(eachObj in url2DelegateObjMap[srcURL])
        {
            url2DelegateObjMap[srcURL][eachObj].resourceDidDownloaded(srcURL,fileNameHashValue);
        }
        url2DelegateObjMap[srcURL] = [];
    };
    downloadResourceUsingHTTP = function (srcURL,downloadLoc,fileName){
        var httpclient = new kony.net.HttpRequest();
        httpclient.currURL =srcURL;//If any changes in JS COre in future this might get fail
      	var someURL = srcURL;
        var hashValue = fileName;
        httpclient.fileNameHashValue = hashValue;
      	var fileHas = hashValue;
        httpclient.open(constants.HTTP_METHOD_GET, srcURL, true);
        httpclient.setRequestHeader("Content-Type", "application/json");

        function downloadCallback(){
            try
             {
                 if(httpclient.readyState == 4)
                 {
                     var rb = httpclient.response;
                     var stringData = JSON.stringify(rb);;
                     stringData = stringData.replace(/\\"/g, "\"");
                     if(stringData.startsWith("\"{"))
                         stringData = stringData.slice(1,stringData.length-1)
                     var tempPath = downloadLoc;
                     var myfile = new kony.io.File(tempPath+"/"+hashValue+".json");
                     myfile.createFile()
                     myfile.write(stringData)
                     sendNotificationToDelegates(someURL,hashValue)
                 }
             }
            catch(err)
             {
                 alert("exception is :: " + err.getMessage());
             }
        }
        httpclient.onReadyStateChange = downloadCallback;
        httpclient.send();
    };
    return resourceDownloader;
});
