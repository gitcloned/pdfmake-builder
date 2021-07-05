
# PDFMake Builder

> Provides a declarative syntax to create PDFs with ease. 

```javascript
const { PDFReport, builder, FONTS, DEFAULTS, table, dataTable } = require("../index")

const path = require('path')

DEFAULTS.DataTableColumnFormatting.Date = 'MM/DD/YYYY'

new PDFReport()
    .content(
        builder.DataTable(
            dataTable.Column({
                "field": "Name",
                "label": "Name",
                "type": dataTable.DATA_COLUMN_TYPE.Text
            }),
            dataTable.Column({
                "field": "Age",
                "label": "Age",
                "type": dataTable.DATA_COLUMN_TYPE.Number
            }),
            dataTable.Column({
                "field": "BirthDate",
                "label": "Date of birth",
                "type": dataTable.DATA_COLUMN_TYPE.Date
            }),
            dataTable.Column({
                "field": "Salary",
                "label": "Salary",
                "type": dataTable.DATA_COLUMN_TYPE.Currency
            })
        ).data(
            Promise.resolve([
                { "Name": "Andrew", "Age": 24, "BirthDate": "01-01-1985", "Salary": 1222232.23 },
                { "Name": "Mathew", "Age": "33", "BirthDate": "01-01-1985", "Salary": "abc" },
                { "Name": "Clark", "Age": null, "BirthDate": "abc", "Salary": 121323121312 },
                { "Name": "Smith", "BirthDate": new Date().valueOf(), "Salary": "23232323" }
            ])
        )
            .widths(['auto', 'auto', 60, '*'])
            .layout(table.LAYOUTS.lightHorizontalLines)
            .drawHeader(true)
    )
    .stream()
    .then(stream => {

        stream.pipe(require('fs').createWriteStream('SimpleDataTable.pdf'))
        stream.end()
    })
```