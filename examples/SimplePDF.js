const path = require('path')
const { PDFReport, builder } = require("../index")

new PDFReport()
    .page({

    })
    .styles({

    })
    .content(
        builder.Row(
            builder
                .Text("Hello {{client}}").props({ "bold": true }).data(Promise.resolve({ "client": "Morgan Stanley" })),
                builder.Column(
                    builder.Row(
                        builder.Text("Column 1").props({ bold: true }),
                        builder.Text("This is column 1")
                    ),
                    builder.Row(
                        builder.Text("Column 2").props({ bold: true }),
                        builder.Text("This is column 2")
                    )
                )
        )
    )
    .definition()
    .then(resp => {

        console.log(resp)

        // Define font files
        var fonts = {
            Roboto: {
                normal: '../fonts/Roboto-Regular.ttf',
                bold: '../fonts/Roboto-Medium.ttf',
                italics: '../fonts/Roboto-Italic.ttf',
                bolditalics: '../fonts/Roboto-MediumItalic.ttf'
            }
        };

        var PdfPrinter = require('pdfmake');
        var printer = new PdfPrinter(fonts);
        var fs = require('fs');

        var docDefinition = resp;

        var options = {
            // ...
        }

        var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
        pdfDoc.pipe(fs.createWriteStream('SimplePDF.pdf'));
        pdfDoc.end();

        console.log(__filename)
    })
    .catch(err => {
        console.log("Error occurred")
        console.log(err)
    })