const DataWidget = require("./abstracts/DataWidget");
const BasicTableBinder = require("./table/binder/BasicTableBinder");

const MustacheTableBinder = require("./table/binder/MustacheTableBinder");
const TABLE_BINDERS = require("./table/binders")
const TABLE_LAYOUTS = require("./table/Layouts").TABLE_LAYOUTS

const TableLayout = require("./table/Layouts").TableLayout

class TableWidget extends DataWidget {

    constructor(body) {

        super("table")

        this.tableProperties = {}

        this.body = []
        if (Array.isArray(body))
            body.forEach(row => this.addRow(row))

        this._binder = null
    }

    /**
     * Specify any property for the table widget in key-value format
     * @param {Object} props Key value pairs 
     */
    tableProps(props) {

        if (props instanceof Object)
            this.tableProperties = Object.assign(this.tableProperties, props)

        return this
    }

    /**
     * Specify number of header rows of table
     * @param {number} headerRows Specify number of rows which are header
     */
    headerRows(headerRows = 1) {
        this.tableProps({ headerRows })
        return this
    }

    /**
     * Return true if table has header rows
     */
    hasHeader() {

        if (this.tableProperties.headerRows && this.tableProperties.headerRows > 0)
            return true
        return false
    }

    /**
     * Specify width for table columns
     * @param {Array} specify array of table column widths
     */
    widths(widths) {
        if (Array.isArray(widths) && widths.length)
            this.tableProps({ widths })
        return this
    }

    /**
     * Specify height for table rows
     * https://pdfmake.github.io/docs/0.1/document-definition-object/tables/
     * http://pdfmake.org/playground.html
     * @param {Object} specify table row heights, can be array, number or a function
     */
    heights(heights) {
        if ((Array.isArray(heights) && heights.length)
            || (typeof heights == "number" && number > 0)
            || typeof heights == "function")
            this.tableProps({ heights })
        return this
    }

    /**
     * Specify the table layout, can specify existing layout name or custom definition
     * 
     *  - Can see custom definition structure here, https://pdfmake.github.io/docs/0.1/document-definition-object/tables/#table-layouts
     *  - or can use table.NewLayout() and table.LAYOUT_HELPERS to build a new layout with existing helpers
     * 
     * @param {Any} layout Specify name of a table layout, or a table layout definition
     */
    layout(layout) {

        if (typeof layout == "string") {
            if (TABLE_LAYOUTS[layoutName]) {
                this.props({ layout: layoutName })
            }
        } else if (layout instanceof TableLayout) {
            /** new custom layout definition */
            this.props({ layout: layout.build() })
        } else if (typeof layout == "object") {
            /** new custom layout definition */
            this.props({ layout })
        }

        return this
    }

    /**
     * Add row to table
     * @param {Array} row should be array of cells
     */
    addRow(row) {
        if (Array.isArray(row))
            this.body.push(row)

        return this
    }

    /**
     * Specify binder to use for binding table body with data
     * @param {BasicTableBinder} binder Instance of Basic Table Binder
     */
    binder(binder) {

        if (typeof binder == "string" && TABLE_BINDERS[binder]) {
            switch (binder) {
                case TABLE_BINDERS.None: this._binder = new BasicTableBinder(); break;
                case TABLE_BINDERS.Mustache: this._binder = new MustacheTableBinder(); break;
            }
        }
        /** custom implementation of table binder */
        else if (binder instanceof BasicTableBinder) {
            this._binder = binder
        }

        return this
    }

    render() {

        /** default table binder is mustache table binder */
        if (!this._binder) this._binder = new MustacheTableBinder();

        const binder = this._binder

        return this.data()
            .then(data => {

                return binder.bind(this, this.body, data)
                    .then(body => {

                        return { "table": { body, ...this.tableProperties }, ...this.properties }
                    })
            })
    }
}

module.exports = TableWidget