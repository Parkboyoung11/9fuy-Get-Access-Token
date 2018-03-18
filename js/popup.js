/* 
* Author    : 9fury
* Facebook  : fb.com/sonvuhong9fury
*/

$("#shorten").on('click', function(){
	if($("#originLink").val() !== "" &&  $("#shorten").text() == "Shorten" ) {
        $("#shorten").text("Loading...");
        var originLink = $("#originLink").val();
        shortenUrl(originLink);
	}
})

function shortenUrl(originLink) {
    gapi.client.setApiKey('AIzaSyBCflYhRoW4fftvoQB2pAMDQJt-WyxO2hA');
    gapi.client.load('urlshortener', 'v1', function() { 
        var request = gapi.client.urlshortener.url.insert({
            'resource': {
                'longUrl': originLink
            }
        });
        request.execute(function(response) {       
            if (response.id != null) { 
                $("#originLink").val(response.id);
                document.getElementById('titleInput').innerHTML = 'Shorten Link';
                $("#shorten").text("Copy");
                $("#shorten").on('click', function(){
                    if( $("#originLink").val() !== "") {
                        var shortenLink = $("#originLink").val();
                        $("#originLink").select();
                        document.execCommand("Copy");                           
                        $.bootstrapGrowl("<strong>Copied!</strong>", {
                            ele: 'body',
                            type: 'success',
                            width: 'auto',
                            delay: 2000,
                            allow_dismiss: false
                        });
                        // window.close();
                    }
                });
            }else {
                $("#originLink").val("");
                $("#shorten").text("Shorten");
                alert("Error: Invalid Url !");
            }
        });
    });
}