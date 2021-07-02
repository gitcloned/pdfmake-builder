
const mustache = require('mustache')

const DataWidget = require("./abstracts/DataWidget")

class TextWidget extends DataWidget {

    constructor(text) {
        super("Text")

        this.text = text
    }

    /**
     * render widget, should return a Promise which resolves as a sub-part of PDFMake definition
     */
    render() {

        return this.data()
            .then(data => {
                return { "text": mustache.render(this.text, data), ...this.properties }
            })
    }

    /**
     * Set text as bold
     * @param {Boolean} bold Set font as bold, specify 'false' to turn off the bold
     */
    bold (bold = true) {
        if (typeof bold == "boolean") {
            this.props( { bold })
        }
        return this
    }

    /**
     * Set text as italics
     * @param {Boolean} italics Set font as italics, specify 'false' to turn off the italics
     */
     italics (italics = true) {
        if (typeof italics == "boolean") {
            this.props( { italics })
        }
        return this
    }
}

module.exports = TextWidget