
const Widget = require("./Widget")

/** 
 * @class
 * @classdesc Base class for Widgets which can bind with data 
 * */
class DataWidget extends Widget {
    
    /**
     * @constructor
     * @augments Widget
     */
    constructor(name) {
        
        super(name)

        this._data = Promise.resolve(null)
    }

    /**
     * render widget, should return a Promise which resolves as a sub-part of PDFMake definition
     */
    render () {
        return Promise.reject(`Error occurred while rendering PDF. ${this.name} widget does not have render method implemented`)
    }

    /**
     * Provide data for the widget
     * @param {Promise} promise Instance of promise which should return data
     */
    data (promise) {

        if (!Array.from(arguments).length) return this._data

        if (promise instanceof Promise)
            this._data =promise

        return this
    }
}

module.exports = DataWidget