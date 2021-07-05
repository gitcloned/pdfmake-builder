const PDF = require("./PDF");

/**
 * @class
 * @classdesc PDF class or client side
 */
class ClientSidePDF extends PDF {

    constructor(pdfDefinition, { _fonts }, options) {

        super(pdfDefinition, { _fonts }, options)

        /** @member {Object} pdfMake client side PDF object - {@link https://pdfmake.github.io/docs/0.1/getting-started/client-side/methods/ | pdfmake doc} */
        this.pdfMakeObject = pdfMake.createPdf(pdfDefinition)
    }

    /**
     * Prints the PDF file
     */
    print() {
        this.pdfMakeObject.print(this.options)
    }

    /**
     * Opens the PDF file in same window
     */
    open() {

        this.pdfMakeObject.print(this.options)
    }

    /**
     * Prints the PDF in a new window
     * @param {Window} win HTML window object (optional)
     */
    printInNewWindow(win) {

        if (!win) {
            win = window.open('', '_blank');
        }

        this.pdfMakeObject.print(this.options, win)
    }

    /**
     * Opens the PDF in a new window
     * @param {Window} win HTML window object (optional)
     */
    openInNewWindow(win) {

        if (!win) {
            win = window.open('', '_blank');
        }

        this.pdfMakeObject.open(this.options, win)
    }

    /**
     * Downloads the PDF file
     * @param {String} defaultFileName Specify the filename to download with
     */
    download(defaultFileName = "file") {

        this.pdfMakeObject.download(defaultFileName)
    }

    /**
     * Opens the PDF in specified iframe
     * @param {IFRAME} iframe HTML iFrame element
     */
    renderInIframe(iframe) {

        if (!iframe) {
            throw 'Cannot render the PDF in iframe, no iFrame element specified'
        }

        this.pdfMakeObject.getDataUrl((dataUrl) => {
            iframe.src = dataUrl;
        });
    }

    /**
     * Renders the PDF in specified container, always empty HTML and then render
     * @param {HTML Element} container HTML container element
     * @param {String} className Specify any css class name to apply to iframe in which PDF will be rendered
     */
    renderInContainer(container, className) {

        if (!container) {
            throw 'Cannot render the PDF in container, no iFrame element specified'
        }

        container.innerHTML = ""
        
        const iframe = document.createElement('iframe')
        iframe.className = className
        container.appendChild(iframe)

        this.renderInIframe(iframe)
    }
}

module.exports = ClientSidePDF