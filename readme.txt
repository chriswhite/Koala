Koala
JavaScript Client-Side Includes

    Koala simulates server-side includes functionality exclusively using client-side JavaScript

    Koala supports the inclusion of common fragments, such as headers and footers, using either synchronous or asynchronous requests to retrieve the document fragments and insert HTML elements, comprised by the fragments, into the document object model of the parent document

    Koala supports the dynamic update of pages in response to both request-scoped and session-scoped events

    Koala may be used to produce websites for offline viewing, hosted on the local filesystem, and presentational websites with simulated dynamic functionality

    Koala is designed for server-side novices, who wish to produce a website without configuring a web server, and is also ideal for wireframing and prototyping of websites

    Koala is released under the GNU General Public License

Tutorial
Working Example

In this example we will create a simple HTML5 website that utilises Koala client-side includes, in order to generalise some of the HTML into shared modules, and also with dynamic features simulated using Koala request-scoped and session-scoped events.

Note that Koala works equally well with HTML4, or indeed any XML-based markup language supported by the web browser, but we will use HTML5 to produce a modern example.

Koala is released in a 'minified' form, which means that all excess whitespace has been removed, in order to minimise the file size of the Koala JavaScript library and thereby minimise the number of bytes which must be transferred from the server to the web browser when the browser loads a document that utilises the Koala library and consequently retrieves the Koala library over the Internet.

Download the minified Koala version 1.0 (beta) library named koala-1.0-beta-min.js from the Koala 1.0 project hosted on github.

Create a new directory on your local filesystem, that will comprise all the files defined within this working example, and copy the Koala library file that you just downloaded into the new directory.

Home Page

Within that directory create a file named home.html with the following contents:

<!DOCTYPE html>
<html>
	<head>
		<title>Home - Example.com</title>
		<link rel="stylesheet" type="text/css" href="default.css"/>
		<script type="text/javascript" src="koala-1.0-beta-min.js"></script>
	</head>
	<body>
		<div id="header-nav-include" class="error"></div>
		<section>
			<article>
				<hgroup>
					<h1>Welcome</h1>
					<h2>This is my home page</h2>
				</hgroup>
				<p>Some content for the home page</p>
			</article>
			<div id="emotion-article-include" class="error"></div>
		</section>
		<div id="footer-include" class="error"></div>
		<script type="text/javascript">
			koala.syncInclude("header-nav-include", "header-nav.html.inc");
			koala.syncInclude("emotion-article-include", "emotion-article.html.inc");
			koala.syncInclude("footer-include", "footer.html.inc");
			koala.requestContext("home-main-menu-option", "active");
		</script>
	</body>
</html>

This HTML5 document comprises a link element, within the head of the document, that references the default CSS stylesheet that will be defined in a subsequent section of this tutorial.

The HTML5 document also comprises a script element, within the head of the document, which references the minified Koala version 1.0 (beta) library.

There is a div element, defined as the first element of the body of the document, with an id attribute equal to header-nav-include and a class attribute equal to the error style class:

<div id="header-nav-include" class="error"></div>

This element is used as a placeholder that will be substituted for the contents of another file, colloquially referred to as an HTML fragment file, that will be included by Koala into the HTML5 document.

In the event of any errors, while retrieving or processing the HTML fragment, Koala will write an error message inside the div element hence that element is styled with an error style class.

Koala does not impose any proprietary convention on the naming of the header-nav-include element or the error style class. You can define whatever naming convention you wish for these placeholder elements and their styling rules.

You may also use any element other than a div element to constitute the placeholder, such as a span or td element, bearing in mind that the element will be completely replaced by the contents of the included HTML fragment, and that all its child elements will be replaced by an error message in the event of an exception while retrieving or processing the included fragment.

The HTML fragment, that will replace the placeholder, is specified to Koala using the first line of JavaScript code comprised by the script element at the bottom of the page:

koala.syncInclude("header-nav-include", "header-nav.html.inc");

This call will retrieve the file named header-nav.html.inc using a synchronous AJAX request, that will block any further execution of subsequent JavaScript code until the request is complete and the response is retrieved, and will replace the specified element, with an id attribute equal to header-nav-include, with the contents of the retrieved HTML fragment that will be defined in the next section of this tutorial.

Koala also provides functionality for asynchronous AJAX requests, which will not block while waiting for the included HTML fragments, however in this example we will utilise synchronous requests in order to simplify this particular application. Asynchronous requests will be explained in a later section of the Koala project documentation.

Note that the file name specified as the second argument to the syncInclude function may be an absolute or relative URL, equivalent to the href attribute of an a anchor element. However it is advisable to specify a relative URL, so that your website can be viewed offline without a connection to the Internet, for example the following imaginary relative URL:

koala.syncInclude("header-nav-include", "../fragments/header-nav.fragment.html");

Koala does not impose any convention on the naming of the header-nav.html.inc file. You can define whatever naming convention you wish for the file names of HTML fragments used in your website.

There are two more calls to the syncInclude function which are associated with two more placeholders in the HTML5 document:

<div id="emotion-article-include" class="error"></div>
...
<div id="footer-include" class="error"></div>
...
koala.syncInclude("emotion-article-include", "emotion-article.html.inc");
koala.syncInclude("footer-include", "footer.html.inc");

These placeholders and associated function calls operate in the same way as the header-nav-include placeholder explained above.

The emotion-article-include placeholder and associated function call are used to include an HTML fragment that comprises an HTML5 article element within which the user can answer the question "How are you feeling today ?" and their answer is registered as a session-scoped event in order to exemplify the simulated session context provided by Koala.

The footer-include placeholder and associated function call are used to include an HTML fragment that comprises an HTML5 footer element used to display copyright information at the bottom of each page in this example website.

The last line of JavaScript code comprised by the script element at the bottom of the page invokes a function that registers a request-scoped event with Koala:

koala.requestContext("home-main-menu-option", "active");

This function call will add the active style class to the existing style classes defined for the element with an id attribute equal to home-main-menu-option in order to highlight the selected main menu option.

The more advanced reader will at this point realise that there is no element defined in the HTML5 document with an id attribute equal to home-main-menu-option.

That element is actually defined within the HTML fragment associated with the header-nav-include placeholder defined in the next section.

Header-Nav Include

Create a file named header-nav.html.inc in your working directory, alongside the home.html file created at the beginning of this tutorial, with the following contents:

<header>
	<h1>Example.com</h1>
</header>
<nav>
	<ul>
		<li id="home-main-menu-option">
			<a href="home.html">Home</a>
		</li>
		<li id="about-us-main-menu-option">
			<a href="about-us.html">About Us</a>
		</li>
		<li id="features-main-menu-option">
			<a href="features.html">Features</a>
		</li>
		<li id="contact-us-main-menu-option">
			<a href="contact-us.html">Contact Us</a>
		</li>
	</ul>
</nav>

This fragment of HTML5 comprises a fairly ordinary header and nav element with four menu options all of which are uniquely identified using the id attribute of the li list-item elements which constitute the menu options.

The reader will note that the first such list-item element has an id attribute equal to home-main-menu-option that is referenced by the call to the koala.requestContext function in the home page discussed earlier.

Koala will include the header-nav.html.inc fragment into the home page resulting with the following document as interpreted by the browser:

<!DOCTYPE html>
<html>
	<head>
		<title>Home - Example.com</title>
		<link rel="stylesheet" type="text/css" href="default.css"/>
		<script type="text/javascript" src="koala-1.0-beta-min.js"></script>
	</head>
	<body>
		<header>
			<h1>Example.com</h1>
		</header>
		<nav>
			<ul>
				<li id="home-main-menu-option">
					<a href="home.html">Home</a>
				</li>
				<li id="about-us-main-menu-option">
					<a href="about-us.html">About Us</a>
				</li>
				<li id="features-main-menu-option">
					<a href="features.html">Features</a>
				</li>
				<li id="contact-us-main-menu-option">
					<a href="contact-us.html">Contact Us</a>
				</li>
			</ul>
		</nav>
		<section>
			<article>
				<hgroup>
					<h1>Welcome</h1>
					<h2>This is my home page</h2>
				</hgroup>
				<p>Some content for the home page</p>
			</article>
			<div id="emotion-article-include" class="error"></div>
		</section>
		<div id="footer-include" class="error"></div>
		<script type="text/javascript">
			koala.syncInclude("header-nav-include", "header-nav.html.inc");
			koala.syncInclude("emotion-article-include", "emotion-article.html.inc");
			koala.syncInclude("footer-include", "footer.html.inc");
			koala.requestContext("home-main-menu-option", "active");
		</script>
	</body>
</html>

Note that your browser may not yield the full source code of the document when viewed using the 'View Page Source' function provided by the browser. You may need to install Firebug, or another debugging tool or plug-in for your browser, in order to see the document resulting from any include operations.

Style Sheet

Create a file named default.css in your working directory with the following contents:

body { background: white; font-size: 10px; }

h1, h2, h3, a, p { color: black; }
h1 { font-size: 1.7em; }
h2 { font-size: 1.6em; }
h3 { font-size: 1.5em; }
a, p { font-size: 1.4em; }

nav ul { list-style: none; display: inline-block; margin: 0 auto; padding: 0; }
nav li { float: left; display: inline; padding-right: 10px; }

.error { color: red; }

nav li.active a { text-decoration: none; }

#feeling li.active a { text-decoration: none; }

The above constitutes a fairly ordinary CSS style sheet that specifies some relative font sizes and specifies that the main navigation menu should be displayed horizontally. There is also a selector for the error style class that represents any error message from Koala with a red font colour.

The style sheet also specifies that the active main menu option, and the active 'feeling' option, explained in the next section of this tutorial, should appear without any underline in order to indicate to the user that the currently active option has indeed been activated.

Koala does not require any particular style sheet definitions in order to function correctly and you may use whatever styling you wish for your website.

Emotion Article Include

Create a file named emotion-article.html.inc in your working directory with the following contents:

<article>
	<h3>How are you feeling today ?</h3>
	<ul id="feeling">
		<li id="happy-emotion">
			<a href="#" onclick="koala.sessionEvent('emotion', 'happy', true);">Happy happy</a>
		</li>
		<li id="joy-emotion">
			<a href="#" onclick="koala.sessionEvent('emotion', 'joy', true);">Joy joy</a>
		</li>
	</ul>
	<a href="#" onclick="koala.sessionClear('emotion', true);">Clear my selection</a>
</article>
<script type="text/javascript">
	koala.sessionContext("emotion", "happy", "happy-emotion", "active");
	koala.sessionContext("emotion", "joy", "joy-emotion", "active");
</script>

This fragment of HTML5 comprises an article element that contains a short list of answers to the question "How are you feeling today ?" which when clicked execute calls to the koala.sessionEvent function in order to select an available answer.

Below the list is a hyperlink that when clicked executes a call to the koala.sessionClear function in order to clear the selection of any answer.

Finally the fragment comprises a block of JavaScript, executing calls to the koala.sessionContext function in order to probe the state of the simulated session context and, following a session event related to the 'emotion' feature, changes the style class of the element in the document that is related to the selected answer.

The more advanced reader will wonder if this block of JavaScript will actually be executed because the HTML fragment is only inserted into the document object model, using a call to the koala.syncInclude function, after the body of the parent document has been rendered by the browser.

The reader will note that this apparently anachronistic block of JavaScript will be automatically executed by Koala, using the built-in JavaScript eval function, just after the preceding elements comprised by the emotion-article.html.inc fragment have been inserted into the document object model.

Koala Session Scope

Koala utilises browser cookies in order to simulate a session context therefore, in the event that the user has cookies turned off in their browser, and in lieu of widespread browser support for HTML5 local storage, that will be utilised by the next version of Koala, currently the Koala session context will function correctly so long as the user does not have cookies turned off in their browser.

The reader will note that various browsers may impose different rules concerning cookies created by websites which are being viewed offline from the local filesystem.

For example, Google Chrome provides a command-line option which activates such local cookies, whereas Firefox and most other browsers will by default allow local cookies to be created and shared between pages which reside in the same directory.

Following these caveats, let us review the documentation and signature of the koala.sessionEvent function:

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
function sessionEvent(feature, state, refresh)

The feature specified to this function does not have to be represented in the document. The unique feature name is simply an abstract name given to the feature or concept; in this case the 'emotion' feature, so that Koala can create a unique namespace for any events related to that feature.

The state specified to this function is a String that summarises the event which has occurred. The specified state does not have to be represented in the document and simply constitutes an abstract summary of the state of the feature following the event.

Koala does not impose any convention on the names of features or states although the reader is advised to limit such naming to alphabet letters and numbers and hyphens in order to avoid any issues with the processing of these names within Koala and the wider JavaScript and web browser execution environment.

Finally the refresh switch specified to this function will cause the currently displayed web page to be fully refreshed from the server, or indeed from the local filesystem when your website is viewed offline, following any processing of the specified session event.

Koala does not mandate this page refresh action, and instead exposes the refresh switch to callers of this function, because you may wish to refresh the page, or particular contents within the page, using a more bespoke strategy.

Returning to the emotion-article.html.inc fragment that comprises hyperlinks which when clicked will execute calls to the koala.sessionEvent function:

<li id="happy-emotion">
	<a href="#" onclick="koala.sessionEvent('emotion', 'happy', true);">Happy happy</a>
</li>
<li id="joy-emotion">
	<a href="#" onclick="koala.sessionEvent('emotion', 'joy', true);">Joy joy</a>
</li>

Isolating the first call to the koala.sessionEvent function:

koala.sessionEvent('emotion', 'happy', true);

When the hyperlink is clicked the function call is executed and Koala registers an event related to the 'emotion' feature with a state of 'happy' and then refreshes the currently displayed web page.

Isolating the second call to the koala.sessionEvent function:

koala.sessionEvent('emotion', 'joy', true);

When the hyperlink is clicked the function call is executed and Koala registers an event related to the 'emotion' feature with a state of 'joy', overwriting the previous state of 'happy', and then refreshes the currently displayed web page.

Let us next review the documentation and signature of the koala.sessionClear function:

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
function sessionClear(feature, refresh)

The feature specified to this function is equivalent to the unique feature name specified to the previously discussed koala.sessionEvent function.

The refresh switch will optionally refresh the currently displayed web page just like the aforementioned refresh switch specified to the koala.sessionEvent function.

Koala will not raise any exceptions in the event that the specified feature does not have any previously registered events and will simply ignore calls to this function if the feature is not recognised.

Any previously registered events related to the specified feature will be permanently abandoned thereby resetting the state of the specified feature.

Finally let us review the documentation and signature of the koala.sessionContext function:

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
function sessionContext(feature, state, id, style)

The feature specified to this function is equivalent to the unique feature name specified to the previously discussed koala.sessionEvent function.

The state specified to this function is equivalent to the state information specified to the aforementioned koala.sessionEvent function.

Koala will not raise any exceptions in the event that the specified feature does not have any previously registered events, or in the event that the specified state is not currently associated with that feature, and will simply ignore calls to this function if the specified state and/or feature is not recognised.

If the specified feature does indeed have a previously registered event summarised by the specified state information then Koala will add the style class, specified using the style parameter, to the existing style classes defined for the element with an id attribute equal to the specified id parameter.

Returning to the emotion-article.html.inc fragment that comprises a block of JavaScript that will execute calls to the koala.sessionContext function:

<script type="text/javascript">
	koala.sessionContext("emotion", "happy", "happy-emotion", "active");
	koala.sessionContext("emotion", "joy", "joy-emotion", "active");
</script>

Isolating the first call to the koala.sessionContext function:

koala.sessionContext("emotion", "happy", "happy-emotion", "active");

This function call will add the active style class to the existing style classes defined for the element with an id attribute equal to happy-emotion in order to highlight the "Happy happy" answer to the question "How are you feeling ?" in the event that the user has previously clicked the 'Happy happy' hyperlink that registers that event with Koala by executing a previous call to the koala.sessionEvent function.

Isolating the second call to the koala.sessionContext function:

koala.sessionContext("emotion", "joy", "joy-emotion", "active");

This function call will add the active style class to the existing style classes defined for the element with an id attribute equal to joy-emotion in order to highlight the "Joy joy" answer to the question "How are you feeling ?" in the event that the user has previously clicked the 'Joy joy' hyperlink.

You can add multiple style classes to elements, using a call to the koala.sessionContext function, by specifying a space-separated list of style classes for example:

koala.sessionContext("emotion", "joy", "joy-emotion", "active highlighted");

You can also execute multiple calls to the koala.sessionContext function for the same previously registered event in order to modify the style classes for multiple elements.

For example you may wish to modify the style of both the hyperlink and the unordered list that contains the hyperlink with this set of calls to the koala.sessionContext function:

koala.sessionContext("emotion", "joy", "joy-emotion", "active");
koala.sessionContext("emotion", "joy", "feeling", "highlighted");

Footer Include

Create a file named footer.html.inc in your working directory with the following contents:

<footer>
	<h2>&copy; Example.com 2012</h2>
</footer>

This fragment of HTML5 simply comprises a footer element that contains some example copyright information.

Home Page Finale

After the home page has been fully loaded, and all the JavaScript calls to Koala functions have executed, Koala should have included all three of the header-nav.html.inc and the emotion-article.html.inc and the footer.html.inc fragments into the home page resulting with the following document as interpreted by the browser:

<!DOCTYPE html>
<html>
	<head>
		<title>Home - Example.com</title>
		<link rel="stylesheet" type="text/css" href="default.css"/>
		<script type="text/javascript" src="koala-1.0-beta-min.js"></script>
	</head>
	<body>
		<header>
			<h1>Example.com</h1>
		</header>
		<nav>
			<ul>
				<li id="home-main-menu-option">
					<a href="home.html">Home</a>
				</li>
				<li id="about-us-main-menu-option">
					<a href="about-us.html">About Us</a>
				</li>
				<li id="features-main-menu-option">
					<a href="features.html">Features</a>
				</li>
				<li id="contact-us-main-menu-option">
					<a href="contact-us.html">Contact Us</a>
				</li>
			</ul>
		</nav>
		<section>
			<article>
				<hgroup>
					<h1>Welcome</h1>
					<h2>This is my home page</h2>
				</hgroup>
				<p>Some content for the home page</p>
			</article>
			<article>
				<h3>How are you feeling today ?</h3>
				<ul id="feeling">
					<li id="happy-emotion">
						<a href="#" onclick="koala.sessionEvent('emotion', 'happy', true);">Happy happy</a>
					</li>
					<li id="joy-emotion">
						<a href="#" onclick="koala.sessionEvent('emotion', 'joy', true);">Joy joy</a>
					</li>
				</ul>
				<a href="#" onclick="koala.sessionClear('emotion', true);">Clear my selection</a>
			</article>
			<script type="text/javascript">
				koala.sessionContext("emotion", "happy", "happy-emotion", "active");
				koala.sessionContext("emotion", "joy", "joy-emotion", "active");
			</script>
		</section>
		<footer>
			<h2>&copy; Example.com 2012</h2>
		</footer>
		<script type="text/javascript">
			koala.syncInclude("header-nav-include", "header-nav.html.inc");
			koala.syncInclude("emotion-article-include", "emotion-article.html.inc");
			koala.syncInclude("footer-include", "footer.html.inc");
			koala.requestContext("home-main-menu-option", "active");
		</script>
	</body>
</html>

As discussed earlier, you may need to install Firebug, or some other debugging tool, in order to view the above document after all the includes have been processed.

The web browser should now display the home page with all the included fragments similar to the following screen-shot resulting from our fully loaded home page when displayed in Mozilla Firefox 14 on Linux:

Your browser will probably display the fonts and spacing between elements differently, prior to fully specifying such characteristics using the CSS style sheet, but you should see that all the HTML fragments have been included in the page.

Koala Power

Now that we have created the common HTML fragments, and prototyped request-scoped and session-scoped events, we can rapidly develop the remaining pages which comprise the website.

About Us Page

Create a file named about-us.html in your working directory with the following contents:

<!DOCTYPE html>
<html>
	<head>
		<title>About Us - Example.com</title>
		<link rel="stylesheet" href="default.css" type="text/css"/>
		<script type="text/javascript" src="koala-1.0-beta-min.js"></script>
	</head>
	<body>
		<div id="header-nav-include" class="error"></div>
		<section>
			<article>
				<hgroup>
					<h1>About Us</h1>
					<h2>All about us and our website</h2>
				</hgroup>
				<p>Some content for the about us page</p>
			</article>
			<div id="emotion-article-include" class="error"></div>
		</section>
		<div id="footer-include" class="error"></div>
		<script type="text/javascript">
			koala.syncInclude("header-nav-include", "header-nav.html.inc");
			koala.syncInclude("emotion-article-include", "emotion-article.html.inc");
			koala.syncInclude("footer-include", "footer.html.inc");
			koala.requestContext("about-us-main-menu-option", "active");
		</script>
	</body>
</html>

This HTML5 document is equivalent to the home page, employing Koala to include the same common HTML5 fragments and invoke the same functions to handle request-scoped and session-scoped events, with only key modifications of the titles and contents related to the about us page.

The only functional difference between the about us page and the home page is the activation of the main menu option for the about us page achieved using a slightly different call to the koala.requestContext function in the JavaScript block at the bottom of the page:

koala.requestContext("about-us-main-menu-option", "active");

Features Page

Create a file named features.html in your working directory with the following contents:

<!DOCTYPE html>
<html>
	<head>
		<title>Features - Example.com</title>
		<link rel="stylesheet" type="text/css" href="default.css"/>
		<script type="text/javascript" src="koala-1.0-beta-min.js"></script>
	</head>
	<body>
		<div id="header-nav-include" class="error"></div>
		<section>
			<article>
				<hgroup>
					<h1>Features</h1>
					<h2>The main features of this website</h2>
				</hgroup>
				<p>Some content for the features page</p>
			</article>
			<div id="emotion-article-include" class="error"></div>
		</section>
		<div id="footer-include" class="error"></div>
		<script type="text/javascript">
			koala.syncInclude("header-nav-include", "header-nav.html.inc");
			koala.syncInclude("emotion-article-include", "emotion-article.html.inc");
			koala.syncInclude("footer-include", "footer.html.inc");
			koala.requestContext("features-main-menu-option", "active");
		</script>
	</body>
</html>

Again, the only functional difference between this page and the home page is the activation of the main menu option for this features page achieved using a slightly different call to the koala.requestContext function:

koala.requestContext("features-main-menu-option", "active");

Contact Us Page

Finally create a file named contact-us.html in your working directory with the following contents:

<!DOCTYPE html>
<html>
	<head>
		<title>Contact Us - Example.com</title>
		<link rel="stylesheet" type="text/css" href="default.css"/>
		<script type="text/javascript" src="koala-1.0-beta-min.js"></script>
	</head>
	<body>
		<div id="header-nav-include" class="error"></div>
		<section>
			<article>
				<hgroup>
					<h1>Contact Us</h1>
					<h2>Get in touch with us</h2>
				</hgroup>
				<p>Some content for the contact us page</p>
			</article>
			<div id="emotion-article-include" class="error"></div>
		</section>
		<div id="footer-include" class="error"></div>
		<script type="text/javascript">
			koala.syncInclude("header-nav-include", "header-nav.html.inc");
			koala.syncInclude("emotion-article-include", "emotion-article.html.inc");
			koala.syncInclude("footer-include", "footer.html.inc");
			koala.requestContext("contact-us-main-menu-option", "active");
		</script>
	</body>
</html>

The more advanced reader will note that we have not defined an index page with the file name index.html in order to integrate with essential web standards implemented by both browsers and web servers.

Create a file named index.html in your working directory with the following contents:

<!DOCTYPE html>
<html>
	<head>
		<title>Example.com</title>
		<script type="text/javascript" src="koala-1.0-beta-min.js"></script>
	</head>
	<body>
		<script type="text/javascript">
			koala.sessionClear("emotion", false);
			window.open("home.html", "_self");
		</script>
	</body>
</html>

This HTML page constitutes a refresh page that forwards the user's browser to the home.html page.

In this case any previous events related to the 'emotion' feature are abandoned, in order to reset any previously selected emotion when the user re-enters the website, by executing a call to the koala.sessionClear function:

koala.sessionClear("emotion", false);

Note that this function call passes a value of false to the koala.sessionClear function, so that Koala does not refresh the page, because the page is instead refreshed by a subsequent call to the built-in JavaScript function window.open in order to forward the user's browser to the home page.

Conclusion

Finally open the index.html page in your web browser, using the File > Open File... main menu option provided by the browser, that should forward your browser to the home page of your new example website built using Koala.

© 2010-2013 Chris White. All rights reserved
