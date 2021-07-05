
/**
 * @class
 * @classdesc Base class for final pdf instance
 */
class PDF {

    /**
     * Base class for PDF 
     * @param {JSON} pdfDefinition final pdfmake definition object
     * @param {PDFReport} pdfReport PDFReport instance 
     * @param {Object} options PDF Make options, can specify custom tableLayouts, fontLayoutCache, bufferPages - {@link https://pdfmake.github.io/docs/0.1/options/ | pdfmake doc}
     */
    constructor (pdfDefinition, { _fonts }, options) {
        this.pdfDefinition = pdfDefinition
        this._fonts = _fonts
        this.options = options
    }
}

module.exports = PDF