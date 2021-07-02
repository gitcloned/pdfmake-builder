

const { PDFReport, builder, FONTS, table } = require("../index")


new PDFReport()
    .content(
        builder.Column(
            builder.Text("Text 1"),
            builder.Column(
                builder.Text("Text 2"),
                builder.Text("Text 3")
            )
        ),
        builder.Column(
            builder.Text("Text 1"),
            builder.Column(
                builder.Text("Text 2"),
                builder.Text("Text 3")
            )
        )
    )
    .font(FONTS.Courier, setDefault = true)
    .stream()
    .then(stream => {

        stream.pipe(require('fs').createWriteStream('NestedColumns.pdf'))
        stream.end()
    })