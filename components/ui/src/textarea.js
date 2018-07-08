(function($) {    

    $.anwidget("an.TextArea", {
        options: {
        	'rows':'0',
        	'cols':'0',
			'visible': true,
			'position': 'absolute'
        },
		_props: ["left", "top", "width", "height", "rows","cols","line-height", "position", "transform-origin", "transform"],
		_attrs: ["id", "disabled", "class", "rows", "cols"],
		getCreateOptions: function() {
			return $.extend(this.options, { 'id': "textarea_" + _widgetID++ });
		},
		getCreateString: function() {
			return "<textarea>";
		},
		getProperties: function() {
			return this._props;
		},
		getAttributes: function() {
			return this._attrs;
		}
    });   
})(jQuery);