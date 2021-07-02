const path = require('path')
const { PDFReport, builder, FONTS } = require("../index")

new PDFReport()
    .content(
        builder.Text("Hello PDF"),
        builder.Column(
            builder.Row(
                builder.Text("Header 1").props({ bold: true }),
                builder.Text("This is large content")
            ),
            builder.Row(
                builder.Text("Header 2").props({ bold: true }),
                builder.Text("This is large content")
            )
        )
    )
    .font(FONTS.Courier, setDefault = true)
    .stream()
    .then(stream => {

        stream.pipe(require('fs').createWriteStream('AnotherSimplePDF.pdf'))
        stream.end()
    })