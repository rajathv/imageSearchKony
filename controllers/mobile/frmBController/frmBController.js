define({ 

 //Type your controller code here 

  
  onClickNavFrmA : function(){
  console.log("NAvigating to form A");
  var ntf = new kony.mvc.Navigation("frmA");
  ntf.navigate();
},
  
  
  destroyFrmA : function(){
    console.log("Destorying form A");
    kony.application.destroyForm("frmA");
  },
  
  
  onInitFrmB : function(){
  console.log("Inititalizing form B");
},
  
    onPreshowFrmB : function(){
  console.log("Preshow  form B triggered");
},
      onPostshowFrmB : function(){
  console.log("Preshow  form B triggered");
},
       onHideFrmB : function(){
  console.log("on hide  form B triggered");
},
  
 });