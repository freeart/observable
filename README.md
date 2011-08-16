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
&lt;div data-fn="show" data-event="click" data-type="bind"&gt;Open dialog
	&lt;ul class="dialog" data-fn="alertSS" data-selector="&gt;li" data-event="click" data-type="delegate"&gt;
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
		alert($(this).data('ss'));
	}
}
$.observable(model);
</pre>
Several delegates
=================

### HTML code ###
<pre>
&lt;div data-fn="show" data-event="click" data-type="bind"&gt;Open dialog
	&lt;ul class="dialog" data-pref="one,two" data-fn-one="alertSS1" data-selector-one="&gt;li" data-event-one="click" data-type-one="delegate" data-fn-two="alertSS2" data-selector-two="&gt;li" data-event-two="click" data-type-two="delegate"&gt;
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
		alert($(this).data('ss') + 'by one');
	}
	this.alertSS2 = function(e){
		alert($(this).data('ss') + 'by two');
	}
}
$.observable(model);
</pre>
Namespace and Scope
=================

### HTML code ###
<pre>
&lt;div data-fn="model.show" data-event="click" data-type="bind"&gt;Open dialog
	&lt;ul class="dialog" data-fn="alertSS" data-scope="model" data-selector="&gt;li" data-event="click" data-type="delegate"&gt;
		&lt;li&gt;button1&lt;/li&gt;
	&lt;/ul&gt;
&lt;/div&gt;
</pre>

### JS Exapmple ###
<pre>
var ns = {};
ns.model = {
	this.name = 'Model'

	this.show = function(e){
		var $el = $(this);
		var panel = $el.find('.dialog');
		panel.css({ top: $el.position().top, left: $el.position().left + $el.width() });
		panel.toggle();
	}
}
ns.alertSS = function(e){
	alert(this.name);
}
$.observable(ns);
</pre>