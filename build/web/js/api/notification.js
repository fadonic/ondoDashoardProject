window.alert = function(Message, type) {
	
	if(type == undefined || type == "" || type == "info")
		return $.growl({ title: "Info", message: Message });
	else if(type == "success")
		return $.growl.notice({ title: "Success", message: Message });
	else if(type == "warning")
		return $.growl.warning({ title: "Warning", message: Message });
	else if(type == "error")
		return $.growl.error({ title: "Error", message: Message });
};