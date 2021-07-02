
module.exports = {

    /**
     * Simple Text Widget 
     * @param  {...any} args Specify text to render
     * @returns Text Widget
     */
    "Text": (...args) => {

        const Widget = require("./widgets/TextWidget")
        return new Widget(...args)
    },

    /**
     * Simple Image Widget 
     * https://pdfmake.github.io/docs/0.1/document-definition-object/images/
     * @param  {...any} args Specify url or image blob
     * @returns Text Widget
     */
    "Image": (...args) => {

        const Widget = require("./widgets/ImageWidget")
        return new Widget(...args)
    },

    /**
     * Simple SVG Widget 
     * https://pdfmake.github.io/docs/0.1/document-definition-object/svgs/
     * @param  {...any} args Specify svg content
     * @returns SVG Widget
     */
    "SVG": (...args) => {

        const Widget = require("./widgets/SVGWidget")
        return new Widget(...args)
    },

    /**
     * Simple QR Widget 
     * https://pdfmake.github.io/docs/0.1/document-definition-object/qr/
     * @param  {...any} args Specify text to embed in QR
     * @returns QR Widget
     */
    "QR": (...args) => {

        const Widget = require("./widgets/QRWidget")
        return new Widget(...args)
    },

    /**
     * Simple External Link Widget 
     * https://pdfmake.github.io/docs/0.1/document-definition-object/links/
     * @param  {...any} args Specify text and external link url (text, link)
     * @returns External Link Widget
     */
    "ExternalLink": (...args) => {

        const Widget = require("./widgets/ExternalLinkWidget")
        return new Widget(...args)
    },

    /**
     * Simple Page Link Widget 
     * https://pdfmake.github.io/docs/0.1/document-definition-object/links/
     * @param  {...any} args Specify text and page number to link (text, pageNumber)
     * @returns Page Link Widget
     */
    "PageLink": (...args) => {

        const Widget = require("./widgets/PageLinkWidget")
        return new Widget(...args)
    },

    /**
     * Simple Header Link Widget 
     * https://pdfmake.github.io/docs/0.1/document-definition-object/links/
     * @param  {...any} args Specify text and header id to link (text, headerId)
     * @returns Header Link Widget
     */
    "HeaderLink": (...args) => {

        const Widget = require("./widgets/HeaderLinkWidget")
        return new Widget(...args)
    },

    /**
     * Row Layout Widget
     * @param  {...any} args Specify children to render in row
     * @returns Row Widget
     */
    "Row": (...args) => {

        const Widget = require("./widgets/RowWidget")
        return new Widget(...args)
    },

    /**
     * Column Layout Widget
     * @param  {...any} args Specify children to render in column
     * @returns Column Widget
     */
    "Column": (...args) => {

        const Widget = require("./widgets/ColumnWidget")
        return new Widget(...args)
    },

    /**
     * Table Widget
     * @param  {...any} args Specify body of table
     * @returns Table Widget
     */
    "Table": (...args) => {

        const Widget = require("./widgets/TableWidget")
        return new Widget(...args)
    },

    /**
     * Data Table Widget
     * @param  {...any} args Specify columns of table, DataTableColumn class
     * @returns Data Table Widget
     */
    "DataTable": (...args) => {

        const Widget = require("./widgets/DataTableWidget")
        return new Widget(...args)
    },

    /**
     * Raw Widget
     * @param  {...any} args Specify content of the widget
     * @returns Raw Widget
     */
    "Raw": (...args) => {

        const Widget = require("./widgets/RawWidget")
        return new Widget(...args)
    },
}