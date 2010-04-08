/**
	Written by Peter Wilkinson of http://dynamic-tools.net
	Feel free to use or modify this script for any purpose.  I'd appreciate you leaving
	this header in though.
*/
function addEvent(elem, eventType, handler)
{
	if (!elem.eventHandlers) elem.eventHandlers = [];
	if (!elem.eventHandlers[eventType])
	{
		elem.eventHandlers[eventType] = [];
		if (elem['on' + eventType]) elem.eventHandlers[eventType].push(elem['on' + eventType]);
		elem['on' + eventType] = handleEvent;
	}
	elem.eventHandlers[eventType].push(handler);
}

function removeEvent(elem, eventType, handler)
{
	var handlers = elem.eventHandlers[eventType];
	for (var i in handlers) if (handlers[i] == handler) delete handlers[i];
}

function handleEvent(e)
{
	var returnValue = true;
	if (!e) e = fixEvent(event);
	var handlers = this.eventHandlers[e.type]
	for (var i in handlers)
	{
		this.$$handleEvent = handlers[i];
		returnValue = !((returnValue && this.$$handleEvent(e)) === false);
	}
	return returnValue;
}

function fixEvent(event)
{
	// add W3C standard event methods
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};

fixEvent.preventDefault = function() {
	this.returnValue = false;
};

fixEvent.stopPropagation = function() {
	this.cancelBubble = true;
};