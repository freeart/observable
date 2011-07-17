$.fn.observable = $.observable = function (scope) {
	if (this != $) {
		$root = this;
		var defType = 'delegate';
	} else {
		$root = $(document.body)
		var defType = 'bind';
	}
	var table = {};
	$root.find('[data-fn],[data-event]').each(function () {
		var el = $(this), data = el.data();
		data.event = data.event || 'click';
		data.type = data.type || defType;
		table[data.fn + ',' + data.event] = { fn: data.fn, event: data.event, selector: '[data-fn="' + data.fn + '"][data-event="' + data.event + '"]', type: data.type };
	});
	$.each(table, function () {
		var fn = scope[this.fn];
		if ($.isFunction(fn)) {
			if (this.type == 'bind') {
				$root.find(this.selector).unbind(this.event).bind(this.event, fn);
			} else if (this.type == 'delegate') {
				$root.undelegate(this.selector, this.event).delegate(this.selector, this.event, fn);
			}
		}
	});
}