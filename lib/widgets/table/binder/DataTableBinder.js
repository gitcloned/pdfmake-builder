const BasicTableBinder = require("./BasicTableBinder");

const { readColumnValue, readCellAlignment, formatColumnValue } = require("./utility/dataTableBinder")

class DataTableBinder extends BasicTableBinder {

    constructor() { super() }

    /**
     * draws the table header
     * @param {DataTableWidget} table Data table widget
     * @param {Array} body array of table body
     * @param {Array} data Array of trade records
     */
    drawHeader(table, body, data) {

        body.push(table.columns.map(column => {

            return {
                "text": column.label,
                "style": table.headerStyle(),
                "colSpan": typeof column.colSpan == "number" ? column.colSpan : 1,
                "alignment": "center"
            }
        }))

        /** set headerRows count, calling base class method */
        table.headerRows(1)
    }

    bind(table, body, data) {

        const DataTableWidget = require("../../DataTableWidget")

        /** table should be DataTable widget */
        if (!(table instanceof DataTableWidget)) return Promise.reject("Cannot bind unless widget is DataTable")

        /** clear any body */
        body = []

        if (table.hasHeader()) {
            this.drawHeader(table, body, data)
        }

        body = body.concat(data.map(record => {
            return table.columns.map(column => {

                const columnValue = readColumnValue(column, record)
                const formattedColumnValue = formatColumnValue(columnValue, column, record)

                return {
                    "text": formattedColumnValue,
                    "style": column.style,
                    "colSpan": typeof column.colSpan == "number" ? column.colSpan : 1,
                    "alignment": readCellAlignment(columnValue, column, record),
                    ...column.properties
                }
            })
        }))

        return Promise.resolve(body)
    }
}

module.exports = DataTableBinder