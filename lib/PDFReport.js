
const Widget = require("./widgets/abstracts/Widget")
const { FONTS, FontMapping } = require("./Fonts");
const defaults = require('./defaults');
const ClientSidePDF = require("./instance/ClientSidePDF");
const ServerSidePDF = require("./instance/ServerSidePDF");

/** @class */
class PDFReport {

    constructor() {

        this.widgets = []

        this.headerWidgets = []

        this.footerWidgets = []

        this.backgroundWidgets = []

        this._definition = {}

        this._fonts = {}
    }

    /**
     * Map the fonts for the PDF
     * https://pdfmake.github.io/docs/0.1/fonts/
     * @param {String} name Specify font using FONT enum
     * @param {Object} pathMapping Specify path to font files, if custom
     * @param {Boolean} setDefault Set this font as default (default: true)
     */
    font(name, pathMapping = {}, setDefault = true) {

        if (typeof pathMapping == "boolean") {
            setDefault = pathMapping
            pathMapping = undefined
        }

        if (typeof name == "string") {
            /** custom font */
            if (typeof pathMapping == "object") {
                const font = {}; font[name] = pathMapping;
                this._fonts = Object.assign(this._fonts, font)

                if (setDefault)
                    this.defaultStyle({ "font": name })
            }
            /** existing font */
            else if (FONTS[name]) {
                const font = {}; font[name] = FontMapping[name];
                this._fonts = Object.assign(this._fonts, font)

                if (setDefault)
                    this.defaultStyle({ "font": name })
            }
        }

        return this
    }

    /**
     * Provide page related properties
     * https://pdfmake.github.io/docs/0.1/document-definition-object/page/
     * @param {Object} params page related parameters 
     */
    page(params = {}) {

        if (typeof params == "object") {
            for (var key in params) {
                if (params.hasOwnProperty(key) && key) {
                    this._definition[key[0].toUpperCase() + key.substring(1)] = params[key]
                }
            }
        }

        return this
    }

    /**
     * Provide styles, or default style
     * https://pdfmake.github.io/docs/0.1/document-definition-object/styling/
     * @param {*} definition 
     * @param {*} defaultStyle 
     */
    styles(definition = {}, defaultStyle = {}) {

        if (typeof definition == "object") {
            this._definition.styles = Object.assign(this._definition.styles || {}, definition)
        }

        return this
    }

    /**
     * Provide styles, or default style
     * https://pdfmake.github.io/docs/0.1/document-definition-object/styling/
     * @param {*} definition 
     * @param {*} defaultStyle 
     */
    defaultStyle(defaultStyle = {}) {

        if (typeof defaultStyle == "object") {
            this._definition.defaultStyle = Object.assign(this._definition.defaultStyle || {}, defaultStyle)
        }

        return this
    }

    /**
     * Specify watermark to PDF
     * @param {String} text Text to display as watermark
     * @param {Object} style style to apply
     * @returns PDFReport
     */
    watermark(text, style = {}) {

        if (typeof text == "string" && typeof style == "object") {
            this._definition.watermark = { text, ...style }
        }

        return this
    }

    /**
     * Specify content of the PDF<br/>
     * <br/>
     * Use builder. to add widgets
     */
    content() {

        let args = Array.from(arguments);

        args.forEach(arg => {

            /**
             * content should be of type widget only
             */
            if (arg instanceof Widget)
                this.widgets.push(arg)
        })

        return this
    }

    /**
     * Provide header of the PDF.<br/>
     * Use erb style formatting to bind to PDFMake context, which provides:<br/>
     *  - pageSize<br/>
     *  - currentPage<br/>
     *  - pageCount<br/>
     * <br/>
     * ex: This is page <% currentPage %> of <% pageCount %><br/>
     * <br/>
     * references: <br/>
     *  - {@link https://github.com/janl/mustache.js/#setting-in-templates | erb style guide}<br/>
     *  - {@link https://pdfmake.github.io/docs/0.1/document-definition-object/headers-footers/ | pdfmake doc }
     */
    header() {

        let args = Array.from(arguments);

        args.forEach(arg => {

            /**
             * content should be of type widget only
             */
            if (arg instanceof Widget)
                this.headerWidgets.push(arg)
        })

        return this
    }

    /**
     * Provide footer of the PDF.<br/>
     * Use erb style formatting to bind to PDFMake context, which provides:<br/>
     *  - pageSize<br/>
     *  - currentPage<br/>
     *  - pageCount<br/>
     * <br/>
     * ex: This is page <% currentPage %> of <% pageCount %><br/>
     * <br/>
     * references: <br/>
     *  - {@link https://github.com/janl/mustache.js/#setting-in-templates | erb style guide}<br/>
     *  - {@link https://pdfmake.github.io/docs/0.1/document-definition-object/headers-footers/ | pdfmake doc }
     */
    footer() {

        let args = Array.from(arguments);

        args.forEach(arg => {

            /**
             * content should be of type widget only
             */
            if (arg instanceof Widget)
                this.footerWidgets.push(arg)
        })

        return this
    }

    /**
     * Provide background of the PDF.<br/>
     * Use erb style formatting to bind to PDFMake context, which provides:<br/>
     *  - pageSize<br/>
     *  - currentPage<br/>
     *  - pageCount<br/>
     * <br/>
     * ex: This is page <% currentPage %> of <% pageCount %><br/>
     * <br/>
     * references: <br/>
     *  - {@link https://github.com/janl/mustache.js/#setting-in-templates | erb style guide}<br/>
     *  - {@link https://pdfmake.github.io/docs/0.1/document-definition-object/background-layer/ | pdfmake doc }
     */
    background() {

        let args = Array.from(arguments);

        args.forEach(arg => {

            /**
             * content should be of type widget only
             */
            if (arg instanceof Widget)
                this.backgroundWidgets.push(arg)
        })

        return this
    }

    /**
     * Builds the PDFMake definition and returns the final JSON object
     * @returns {Promise} 
     */
    definition() {

        /** if no font specified, add font by default */
        if (!Object.keys(this._fonts).length) this.font(defaults.Font, true)

        return require("./build")(this)
    }

    /**
     * create PDF<br />
     * , detects if being used from client side or server side, by checking if windows is accessible<br/>
     * and return the instance accordingly
     *
     * @param {Object} options PDF Make options, can specify custom tableLayouts, fontLayoutCache, bufferPages - {@link https://pdfmake.github.io/docs/0.1/options/ | pdfmake doc}
     * @returns {PDF}
     */
    createPDF(options = {}) {
        console.log('creating PDF ')

        return this.definition()
            .then(definition => {

                console.log(definition)

                /**
                 * check if window object is available to detect client side
                 */
                if (typeof window != "undefined") {

                    console.log('creating client side PDF ')

                    return new ClientSidePDF(definition, this, options)
                } else {

                    console.log('creating server side PDF ')

                    return new ServerSidePDF(definition, this, options)
                }
            })
    }

    /**
     * Creates the pdf stream<br/>
     *  - {@link https://pdfmake.github.io/docs/0.1/options/ | pdfmake doc}
     * @param {Object} options PDF Make options, can specify custom tableLayouts, fontLayoutCache, bufferPages 
     */
    stream(options = {}) {

        const PdfPrinter = require('pdfmake');

        const printer = new PdfPrinter(this._fonts);

        return this.definition()
            .then(definition => {

                console.log(definition)
                return printer.createPdfKitDocument(definition, options)
            })
    }
}

module.exports = PDFReport