const loadScript = path => {
let $script = document.createElement("script");

$script.type = "text/javascript";
$script.async = false;
$script.src = path;
document.body.appendChild($script);
};

const onDeviceReady = () => {
if (window.device.platform === "Android") {
  const { permissions } = cordova.plugins;

  permissions.requestPermissions([permissions.CAMERA, permissions.RECORD_AUDIO, permissions.MODIFY_AUDIO_SETTINGS]);
}

if (window.device.platform === "iOS") {
  const { iosrtc } = cordova.plugins;

  // Connect 'iosrtc' plugin, only for iOS devices
  iosrtc.registerGlobals();
  // Use speaker audio output
  iosrtc.selectAudioOutput("speaker");
  // Request audio and/or camera permission if not requested yet
  iosrtc.requestPermission(true, true, function(permissionApproved) {
    console.log("requestPermission status: ", permissionApproved ? "Approved" : "Rejected");
  });
  // Refresh video element
  window.addEventListener("orientationchange", () => iosrtc.refreshVideos());
  window.addEventListener("scroll", () => iosrtc.refreshVideos());
}

loadScript("main.js");
};

document.addEventListener("deviceready", onDeviceReady, false);

jQuery(document).ready(function($) {
  var urlParams = new URLSearchParams(window.location.search)
  var app_id = urlParams.get('app_id');
  var user_id = urlParams.get('user_id');
  var type = urlParams.get('type');
	$("#call-start").hide();
  console.log("ok");
  if(type == 'd')
  {
    var timeIntrvlD = setInterval(function(){ 
      $(".Doctor-bg-color").trigger( "click" );
    }, 500);
  }
  else if(type == 'u')
  {
    var timeIntrvlU = setInterval(function(){ 
      $(".Patient-bg-color").trigger( "click" );
    }, 500);
  }
  

  $( ".Doctor-bg-color" ).on( "click", function() {
    console.log("login as doctor");
    clearInterval(timeIntrvlD);
  });

  $( ".Patient-bg-color" ).on( "click", function() {
    console.log("login as patient");
    clearInterval(timeIntrvlU);
  });
      
})