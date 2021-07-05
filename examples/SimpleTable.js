const path = require('path')
const { PDFReport, builder, FONTS, table } = require("../index")

new PDFReport()
    .content(
        builder.Column(
            builder.Row(
                builder.Text("Simple Table"),
                builder.Table([
                    ["Name", "Phone", "Age"],
                    ["Charlie", "912-2345-223", "35"]
                ])
            ),
            builder.Row(
                builder.Text("Mustache Table"),
                builder.Table([
                    ["Name", "Phone", "Age"],
                    ["{{name}}", "{{phone}}", "{{age}}"]
                ])
                    .data(Promise.resolve({
                        "name": "Charlie",
                        "phone": "912-2345-223",
                        "age": "35"
                    }))
                    .widths(["auto", "auto", 40])
                    .props({
                    })
            )
        )
    )
    .font(FONTS.Courier, setDefault = true)
    .createPDF()
    .then(pdf => {

        const stream = pdf.stream()

        stream.pipe(require('fs').createWriteStream('SimpleTable.pdf'))
        stream.end()
    })