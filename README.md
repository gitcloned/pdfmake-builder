
```javascript
const builder = null

new PDFReport()
    .page({

    })
    .styles({

    })
    .defaultStyle({

    })
    .content(
        builder.row(
            builder.line({

            }),
            builder.column(
                builder.table(`
                    [

                    ]
                `)
                .builder(builder.thinkTableBuidler())
                    .data(
                        "table one",
                        Promise.resolve([{ "Name": "Andrew" }])
                    )
            )
        )
    )
    .build()
```