(function () {

    window.ui = window.ui || {};

    var Page = function () {
        this.initialize();
    }
    var p = Page.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
    }
    
    window.ui.Page = Page;
})();
