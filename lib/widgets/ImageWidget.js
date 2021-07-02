
const mustache = require('mustache')

const DataWidget = require("./abstracts/DataWidget")

class ImageWidget extends DataWidget {

    /**
     * ImageWidget
     * @param {String} urlOrBlob Image url or blob
     */
    constructor(urlOrBlob) {
        super("Image")

        this.urlOrBlob = urlOrBlob
    }

    /**
     * render widget, should return a Promise which resolves as a sub-part of PDFMake definition
     */
    render() {

        return this.data()
            .then(data => {
                return { "image": this.urlOrBlob, ...this.properties }
            })
    }
}

module.exports = ImageWidget