const path = require('path')
const { PDFReport, builder, FONTS } = require("../index")

new PDFReport()
    .content(
        builder.Column(
            builder.Row(
                builder.Text("External Link Example").bold(),
                builder.ExternalLink("Click here", "https://pdfmake.github.io/docs/0.1/document-definition-object/links/")
            ),
            builder.Row(
                builder.Text("Page Link Example").bold(),
                builder.PageLink("Go to page 2", 2)
            ),
            builder.Row(
                builder.Text("Header Link Example").bold(),
                builder.HeaderLink("Go to #headerSection", "headerSection")
            )
        ).pageBreakAfter(),
        builder.Text("This is page 2").pageBreakAfter(),
        builder.Text("Header Section").bold().props({ "id": "headerSection" })
    )
    .stream()
    .then(stream => {

        stream.pipe(require('fs').createWriteStream('Links.pdf'))
        stream.end()
    })