
const mustache = require('mustache')

const Widget = require('./abstracts/Widget')

class RawWidget extends Widget {

    constructor(...args) {
        super("raw")
        this.props(...args)
    }

    /**
     * render widget, should return a Promise which resolves as a sub-part of PDFMake definition
     */
    render() {

        return { ...this.properties }
    }
}

module.exports = RawWidget