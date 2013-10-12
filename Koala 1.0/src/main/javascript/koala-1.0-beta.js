/*
 * Zavazoo Koala 1.0 - Server-side includes functionality exclusively
 * using client-side JavaScript
 * Copyright (C) 2012-2013 Chris White <chriswhitelondon@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function Koala() {

    /* Public methods */

    /**
     * Overwrites the DOM element identified by the specified unique identifier
     * with the HTML elements resulting from a request, made synchronously;
     * blocking until the request is processed and the response retrieved, for
     * the resource associated with the specified URL. Also executes any
     * JavaScript comprised by the response.
     * 
     * @param id
     *                the unique identifier of the element.
     * @param url
     *                the URL.
     */
    this.syncInclude = function(id, url) {

	generalInclude(id, url, false);

    };

    /**
     * Overwrites the DOM element identified by the specified unique identifier
     * with the HTML elements resulting from a request, made asynchronously;
     * without blocking while the request is processed, for the resource
     * associated with the specified URL. Also executes any JavaScript comprised
     * by the response.
     * 
     * @param id
     *                the unique identifier of the element.
     * @param url
     *                the URL.
     */
    this.asyncInclude = function(id, url) {

	generalInclude(id, url, true);

    };

    /**
     * Adds the specified style class to any extant style classes, defined using
     * the 'class' attriubute, of the DOM element identified by the specified
     * unique identifier.
     * 
     * @param id
     *                the unique identifier of the element.
     * @param style
     *                the style class applied to the element.
     */
    this.requestContext = function(id, style) {

	var element = document.getElementById(id);

	element.className = element.className + " " + style;

    };

    /**
     * Informs Koala that a session event occurred that is related to the
     * website feature associated with the specified unique feature name and the
     * specified state information describing the event. The currently displayed
     * web page will be fully refreshed, in order to display the state change
     * resulting from the session event, if the specified switch is true.
     * 
     * @param feature
     *                the unique feature name.
     * @param state
     *                the state information describing the event.
     * @param refresh
     *                true to refresh the page, false otherwise.
     */
    this.sessionEvent = function(feature, state, refresh) {

	setCookie(feature, state, 1);

	if (refresh) {

	    location.reload(true);

	}

    };

    /**
     * Informs Koala that any previous session event related to a website
     * feature, associated with the specified unique feature name, should be
     * permanently cleared and therefore abandoned. The currently displayed web
     * page will be fully refreshed, in order to display the state change
     * resulting from the abandonment of any previous session event, if the
     * specified switch is true.
     * 
     * @param feature
     *                the unique feature name.
     * @param refresh
     *                true to refresh the page, false otherwise.
     */
    this.sessionClear = function(feature, refresh) {

	deleteCookie(feature);

	if (refresh) {

	    location.reload(true);

	}

    };

    /**
     * Responds to a Koala session event, which may have previously occurred,
     * that is related to the website feature associated with the specified
     * unique feature name and the specified state information describing the
     * event. If the specified event did previously occur then the specified
     * style class will be added to any extant style classes, defined using the
     * 'class' attriubute, of the DOM element identified by the specified unique
     * identifier.
     * 
     * @param feature
     *                the unique feature name.
     * @param state
     *                the state information describing the event.
     * @param id
     *                the unique identifier of the element.
     * @param style
     *                the style class applied to the element.
     */
    this.sessionContext = function(feature, state, id, style) {

	var cookie = getCookie(feature);

	if (cookie !== null) {

	    if (cookie == state) {

		var element = document.getElementById(id);

		element.className = element.className + " " + style;

	    }

	}

    };

    /* Private methods */

    /**
     * Overwrites the DOM element identified by the specified unique identifier
     * with the HTML elements resulting from a request, made either
     * asynchronously; without blocking while the request is processed, or
     * synchronously; blocking until the request is processed and the response
     * retrieved, according to the specified switch, for the resource associated
     * with the specified URL. Also executes any JavaScript comprised by the
     * response.
     * 
     * @param id
     *                the unique identifier of the element.
     * @param url
     *                the URL.
     * @param async
     *                true to make the request asynchronously, false to make the
     *                request synchronously.
     */
    function generalInclude(id, url, async) {

	try {

	    var request;

	    if (window.XMLHttpRequest) {

		request = new XMLHttpRequest();

	    } else if (window.ActiveXObject) {

		request = new ActiveXObject("Microsoft.XMLHTTP");

	    } else {

		return "unable to include some of the page: unsupported browser";

	    }

	    if (async) {

		request.onreadystatechange = function() {

		    var element = document.getElementById(id);

		    try {

			if (request.readyState == 4) {

			    var response = request.responseText;

			    // status may be zero for local filesystem urls
			    if (response !== null && (status == 200 || status === 0)) {

				processInclude(id, response);

			    } else {

				element.innerHTML = "unable to include some of the page";

			    }

			}

		    } catch (error) {

			element.innerHTML = "unable to include some of the page: " + error;

		    }

		};

	    }

	    request.open("GET", url, async);
	    request.send(null);

	    if (!async) {

		var response = request.responseText;

		processInclude(id, response);

	    }

	} catch (error) {

	    var element = document.getElementById(id);

	    element.innerHTML = "unable to include some of the page: " + error;

	}

    }

    /**
     * Overwrites the DOM element identified by the specified unique identifier
     * with the HTML elements comprised by the specified response to a request
     * for a fragment of HTML to be included in the current document. Also
     * executes any JavaScript comprised by the response.
     * 
     * @param id
     *                the unique identifier of the element.
     * @param response
     *                the response comprising HTML elements.
     */
    function processInclude(id, response) {

	var element = document.getElementById(id);

	try {

	    var parent = element.parentNode;

	    var dummy = document.createElement("div");

	    dummy.innerHTML = response;

	    var children = dummy.childNodes;

	    var length = children.length;

	    for ( var index = 0; index != length; index++) {

		var child = children.item(index);

		// assert that the node is an element
		if (child !== null && child.nodeType == 1) {

		    parent.insertBefore(child, element);

		    if (child.tagName == "SCRIPT" || child.tagName == "script") {

			eval(child.innerHTML);

		    }

		}

	    }

	    element.parentNode.removeChild(element);

	} catch (error) {

	    element.innerHTML = "unable to include some of the page: " + error;

	}

    }

    /**
     * Gets the value of the cookie with the specified name.
     * 
     * @param name
     *                the cookie name.
     * @returns the cookie value or null if there is no cookie with the
     *          specified name.
     */
    function getCookie(name) {
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
	    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
	    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
	    x = x.replace(/^\s+|\s+$/g, "");
	    if (x == name) {
		return unescape(y);
	    }
	}
    }

    /**
     * Creates or overwrites the specified value of the cookie, with the
     * specified name, that will expire after the specified number of days have
     * elapsed.
     * 
     * @param name
     *                the cookie name.
     * @param value
     *                the cookie value.
     * @param exdays
     *                the expiration period measured in days from the present
     *                moment.
     */
    function setCookie(name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = name + "=" + c_value;
    }

    /**
     * Deletes the cookie with the specified name.
     * 
     * @param name
     *                the cookie name.
     */
    function deleteCookie(name) {

	setCookie(name, "", -1);

    }

}

var koala = new Koala();