function hideNotification() {
    window.setTimeout(function() {
        document.getElementById("notification").style.display= "none";
        document.getElementById("notification").style.opacity = "0";
	    document.getElementById("notification").style.height = "0px";
    }, 3000);
}
