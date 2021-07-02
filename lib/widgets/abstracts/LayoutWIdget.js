const Widget = require("./Widget");

/** 
 * @class
 * @classdesc Base class for Widgets which are used to create layouts (row/column) 
 * */
class LayoutWidget extends Widget {

    /**
     * @constructor
     * @augments Widget
     */
    constructor(name) { super(name); this.widgets = [] }

    /**
     * Add a child widget to this layout
     * @param {Widget} widget widget instance
     */
    add(widget) {

        /**
         * content should be of type widget only
         */
        if (widget instanceof Widget)
            this.widgets.push(arg)
    }
}

module.exports = LayoutWidget