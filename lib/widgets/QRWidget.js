
const mustache = require('mustache')

const DataWidget = require("./abstracts/DataWidget")
const TextWidget = require('./TextWidget')

class QRWidget extends TextWidget {

    constructor(text) {
        super(text)
    }

    /**
     * render widget, should return a Promise which resolves as a sub-part of PDFMake definition
     */
    render() {

        return super.render()
                .then (content => {
                    /** embed text in qr */
                    content.qr = content.text
                    delete content.text

                    return content
                })
    }
}

module.exports = QRWidget