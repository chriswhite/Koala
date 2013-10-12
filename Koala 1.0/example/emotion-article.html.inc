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