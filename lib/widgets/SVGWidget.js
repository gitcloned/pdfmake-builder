
const mustache = require('mustache')

const DataWidget = require("./abstracts/DataWidget")

/** @class */
class SVGWidget extends DataWidget {

    /**
     * @constructor
     * @augments DataWidget
     * ImageWidget
     * https://pdfmake.github.io/docs/0.1/document-definition-object/svgs/
     * @param {String} svg SVG content
     */
    constructor(svg) {
        super("SVG")

        this.svg = svg
    }

    /**
     * render widget, should return a Promise which resolves as a sub-part of PDFMake definition
     */
    render() {

        return this.data()
            .then(data => {
                return { "svg": this.svg, ...this.properties }
            })
    }
}

module.exports = SVGWidget