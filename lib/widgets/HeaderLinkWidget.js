
const mustache = require('mustache')

const TextWidget = require('./TextWidget')

class HeaderLinkWidget extends TextWidget {

    /**
     * Header Link Widget
     * @param {String} text Text to show
     * @param {String} headerId Header id to link
     */
    constructor(text, headerId) {
        super(text)
        this.headerId = headerId
    }

    /**
     * render widget, should return a Promise which resolves as a sub-part of PDFMake definition
     */
    render() {

        return super.render()
            .then(content => {
                return { ...content, ...{ "linkToDestination": this.headerId } }
            })
    }
}

module.exports = HeaderLinkWidget