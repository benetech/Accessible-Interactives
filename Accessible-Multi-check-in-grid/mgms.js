$(document).ready(function() { 
	 var checkboxes = [];
	$('div[role="checkbox"]').each(function(index) {
		checkboxes[index] = new cb($(this).attr('id'));		
	});   
});

function keyCodes() {

  // Define values for keycodes 
  this.space = 32;

} 

// constructor
function cb(id) { 
  
    this.$id = $('#' + id);
	this.keys = new keyCodes(); 

	// bind event handlers 
    this.bindHandlers(); 
}

// Bind event handlers
cb.prototype.bindHandlers = function () {

	var thisObj = this;

    // bind a click handler 
    this.$id.click(function (e) {
        return thisObj.handleClick(e);
    });

    // bind a keydown handler 
    this.$id.keydown(function (e) {
        return thisObj.handleKeyDown(e);
    });

    // bind a keypress handler 
    this.$id.keypress(function (e) {
        return thisObj.handleKeyPress(e);
    });

}

cb.prototype.toggleState = function () {

	var currState = this.$id.attr('aria-checked');
	
	// If the checkbox is not checked, check it.
	if (currState == 'false') {
		this.$id.attr('aria-checked', 'true').find('img').attr('src', 'checkmark.jpg');
	}
	// Otherwise, uncheck it.
	else {
		this.$id.attr('aria-checked', 'false').find('img').attr('src', 'unchecked.jpg');
	}					
    return true;
}

cb.prototype.handleClick = function (e) {

    if (e.altkey || e.ctrlKey || e.shiftKey) {
        // do nothing; 
        return true;
    }
    // toggle the checked/unchecked state 
    this.toggleState();

    e.stopPropagation();
    return false;
}

cb.prototype.handleKeyDown = function (e) {

    if (e.altKey) {
        // do nothing 
        return true;
    }

    switch (e.keyCode) {
        case this.keys.space: {
            // toggle the checkbox state 
            this.toggleState();
            e.stopPropagation();
            return false;
        }
    }
    return true;
}

cb.prototype.handleKeyPress = function (e) {

    if (e.altKey) {
        // do nothing 
        return true;
    }

    switch (e.keyCode) {
        case this.keys.space: {
            // consume the event 
            e.stopPropagation();
            return false;
        }
    }
    return true;
}

