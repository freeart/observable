CSS Style
<code>
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
</code>

HTML code
<code>
<div data-fn="show" data-type="bind">Open dialog
	<ul class="dialog" data-fn="alertSS" data-selector=">li" data-type="delegate">
		<li data-ss="data1">button1</li>
		<li data-ss="data2">button2</li>
	</ul>
</div>
</code>

JS Exapmple
<code>
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
</code>

Several delegates:

HTML code
<code>
<div data-fn="show" data-type="bind">Open dialog
	<ul class="dialog" data-pref="one,two" data-fn_one="alertSS1" data-selector_one=">li" data-type_one="delegate" data-fn_two="alertSS2" data-selector_two=">li"  data-type_two="delegate">
		<li data-ss="data1">button1</li>
		<li data-ss="data2">button2</li>
	</ul>
</div>
</code>

JS Exapmple
<code>
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
</code>