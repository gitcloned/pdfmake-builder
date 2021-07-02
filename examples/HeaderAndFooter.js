

const { PDFReport, builder, FONTS, table } = require("../index")


new PDFReport()
    .content(
        builder.Text("Page 1 - Hello {{name}}").bold().pageBreakAfter().data(Promise.resolve({ name: "World" })),
        builder.Text("Page 2").bold().pageBreakAfter(),
        builder.Text("Page 3").bold(),
    )
    .header(
        builder.Text("This is page <% currentPage %> of <% pageCount %>")
    )
    .footer(
        builder.Text("This is page <% currentPage %> of <% pageCount %>")
    )
    .font(FONTS.Courier, setDefault = true)
    .stream()
    .then(stream => {

        stream.pipe(require('fs').createWriteStream('HeaderAndFooter.pdf'))
        stream.end()
    })