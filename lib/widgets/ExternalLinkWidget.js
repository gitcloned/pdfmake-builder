
const mustache = require('mustache')

const TextWidget = require('./TextWidget')

class ExternalLinkWidget extends TextWidget {

    /**
     * External Link Widget
     * @param {String} text Text to show
     * @param {URL} link External url
     */
    constructor(text, link) {
        super(text)
        this.link = link
    }

    /**
     * render widget, should return a Promise which resolves as a sub-part of PDFMake definition
     */
    render() {

        return super.render()
            .then(content => {
                return this.data()
                    .then(data => {
                        return { ...content, ...{ "link": mustache.render(this.link, data) } }
                    })
            })
    }
}

module.exports = ExternalLinkWidget