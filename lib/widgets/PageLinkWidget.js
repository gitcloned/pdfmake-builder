
const mustache = require('mustache')


const TextWidget = require('./TextWidget')

class PageLinkWidget extends TextWidget {

    /**
     * Page Link Widget
     * @param {String} text Text to show
     * @param {Number} pageNumber Page number to link
     */
    constructor(text, pageNumber) {
        super(text)
        this.pageNumber = pageNumber
    }

    /**
     * render widget, should return a Promise which resolves as a sub-part of PDFMake definition
     */
    render() {

        return super.render()
            .then(content => {
                return { ...content, ...{ "linkToPage": this.pageNumber } }
            })
    }
}

module.exports = PageLinkWidget