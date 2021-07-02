
/** 
 * @class
 * @classdesc Base class for every Widget 
 * */
class Widget {

    constructor(name) { this.name = name; this.properties = {}; }

    /**
     * render widget, should return a Promise which resolves as a sub-part of PDFMake definition
     * @abstract
     */
    render() {
        return Promise.reject(`Error occurred while rendering PDF. ${this.name} widget does not have render method implemented`)
    }

    /**
     * Specify any property for th widget in key-value format
     * @param {Object} props Key value pairs 
     */
    props(props) {

        if (props instanceof Object)
            this.properties = Object.assign(this.properties, props)

        return this
    }

    /**
     * Apply page break before this widget
     * @returns self
     */
    pageBreakBefore() {

        this.props({ pageBreak: 'before' })
        return this
    }

    /**
     * Apply page break after this widget
     * @returns self
     */
    pageBreakAfter() {

        this.props({ pageBreak: 'after' })
        return this
    }
}

module.exports = Widget