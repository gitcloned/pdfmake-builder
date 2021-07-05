const PDF = require("./PDF");
const FS = require('fs')

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

    /**
     * Writes to the specified file path
     * @param {URL} filePath A valid file path url
     */
    writeToAFile (filePath) {

        const stream = this.stream()
        
        stream.pipe(FS.createWriteStream(filePath))
        stream.end()
    }

    /**
     * Writes to the specified file path
     * @param {import("http").ServerResponse} response HTTP server response object
     * @param {String} defaultFileName Specify the filename to download with
     */
    writeToHTTPResponse (response, defaultFileName = "file") {

        const stream = this.stream()

        response.setHeader("Content-Disposition", `inline; filename="${defaultFileName}"`)
        
        stream.pipe(response)
        stream.end()
    }
}

module.exports = ServerSidePDF