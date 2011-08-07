Simple
======

### CSS Style ###
<pre>
.dialog
{
	display: none;
	position: absolute;
	z-index: 100;
	background-color: #fff;	
}
.dialog li
{
	float: left;
	padding-left: 4px;
	color: #000;	
}
</pre>
### HTML code ###
<pre>
&lt;div data-fn="show" data-type="bind"&gt;Open dialog
	&lt;ul class="dialog" data-fn="alertSS" data-selector="&gt;li" data-type="delegate"&gt;
		&lt;li data-ss="data1"&gt;button1&lt;/li&gt;
		&lt;li data-ss="data2"&gt;button2&lt;/li&gt;
	&lt;/ul&gt;
&lt;/div&gt;
</pre>

### JS Exapmple ###
<pre>
var model = {
	this.show = function(e){
		var $el = $(this);
		var panel = $el.find('.dialog');
		panel.css({ top: $el.position().top, left: $el.position().left + $el.width() });
		panel.toggle();
	}
	this.alertSS = function(e){
		e.stopPropagation();
		alert($(this).data('ss'));
	}
}
$.observable(model);
</pre>
Several delegates
=================

### HTML code ###
<pre>
&lt;div data-fn="show" data-type="bind"&gt;Open dialog
	&lt;ul class="dialog" data-pref="one,two" data-fn_one="alertSS1" data-selector_one="&gt;li" data-type_one="delegate" data-fn_two="alertSS2" data-selector_two="&gt;li"  data-type_two="delegate"&gt;
		&lt;li data-ss="data1"&gt;button1&lt;/li&gt;
		&lt;li data-ss="data2"&gt;button2&lt;/li&gt;
	&lt;/ul&gt;
&lt;/div&gt;
</pre>

### JS Exapmple ###
<pre>
var model = {
	this.show = function(e){
		var $el = $(this);
		var panel = $el.find('.dialog');
		panel.css({ top: $el.position().top, left: $el.position().left + $el.width() });
		panel.toggle();
	}
	this.alertSS1 = function(e){
		e.stopPropagation();
		alert($(this).data('ss') + 'by one');
	}
	this.alertSS2 = function(e){
		e.stopPropagation();
		alert($(this).data('ss') + 'by two');
	}
}
$.observable(model);
</pre>