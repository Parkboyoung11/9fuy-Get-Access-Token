/* 
* Author    : 9fury
* Facebook  : fb.com/sonvuhong9fury
*/

$("#creat").on('click', function(){
	if($("#accessToken").val() == "" &&  $("#creat").text() == "Creat" ) {
        $("#creat").text("Loading...");
        getAccessToken();
	}
})

function getAccessToken() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.executeScript(tab.id, {file: "js/getToken.js"}, function(response) {
            chrome.runtime.onMessage.addListener(function (msg) {
                if (msg.accessToken !== undefined && msg.accessToken !== '') {
                    var accessToken = msg.accessToken;
                    $("#accessToken").val(accessToken);
                    $("#creat").text("Copy");
                    $("#creat").on('click', function(){
                        if( $("#accessToken").val() !== "") {
                            $("#accessToken").select();
                            document.execCommand("Copy");                           
                            $.bootstrapGrowl("<strong>Copied!</strong>", {
                                ele: 'body',
                                type: 'success',
                                width: 'auto',
                                delay: 2000,
                                allow_dismiss: false
                            });
                        }
                    });
                }else {
                    alert('Failed to get Access Token. Make sure you authorized the HTC sense app');
                }
            });
        });
    });
}
