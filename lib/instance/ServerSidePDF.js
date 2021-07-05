const PDF = require("./PDF");

/**
 * @class
 * @classdesc PDF class for server side
 */
class ServerSidePDF extends PDF {

    constructor(pdfDefinition, { _fonts }, options) {
        super(pdfDefinition, { _fonts }, options)
    }

    /**
     * Creates the pdf stream<br/>
     */
    stream() {

        const PdfPrinter = require('pdfmake');

        const printer = new PdfPrinter(this._fonts);

        return printer.createPdfKitDocument(this.pdfDefinition, this.options)
    }
}

module.exports = ServerSidePDF