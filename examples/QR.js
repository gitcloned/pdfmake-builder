const path = require('path')
const { PDFReport, builder, FONTS } = require("../index")

new PDFReport()
    .content(
        builder.QR("Secret text in this QR code")
    )
    .stream()
    .then(stream => {

        stream.pipe(require('fs').createWriteStream('QR.pdf'))
        stream.end()
    })