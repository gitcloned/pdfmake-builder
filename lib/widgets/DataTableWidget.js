const DataTableBinder = require("./table/binder/DataTableBinder");
const DataTableColumn = require("./table/DataTableColumn");
const TableWidget = require("./TableWidget");

class DataTableWidget extends TableWidget {

    constructor() {

        /** pass empty body to parent table widget */
        super([])


        /** list of columns (DataTableColumn) */
        this._columns = []
        /** if to render header */
        this._hasHeader = true
        /** any header style to apply */
        this._headerStyle = null


        /**
         * parse arguments for DataTableColumn
         */
        let args = Array.from(arguments);

        args.forEach(arg => {

            /**
             * content should be of type widget only
             */
            if (arg instanceof DataTableColumn)
                this.addColumn(arg)
        })
    }

    get columns() {
        return this._columns
    }

    /**
     * Add a column to table
     * @param {DataTableColumn} column DataTableWidget Column class
     * @returns this
     */
    addColumn(column) {
        if (column instanceof DataTableColumn)
            this._columns.push(column)

        return this
    }

    /**
     * Gets or sets if header is to be rendered or not (default : true)
     * @param {Boolean} hasHeader Specify 'true' to render header
     */
     drawHeader(hasHeader) {

        if (typeof hasHeader == "boolean") {
            if (hasHeader) this.headerRows(1)
            else this.headerRows(0)
        }

        return this
    }

    /**
     * Gets or sets the header style name
     * @param {Boolean} headerStyle Specify the header style name if any
     */
    headerStyle(headerStyle) {

        if (typeof headerStyle == "string") {
            this._headerStyle = headerStyle
            return this
        }

        return this._hasHeader
    }

    render() {

        if (!this._binder || !this._binder instanceof DataTableBinder) {
            /** use data table binder */
            this.binder(new DataTableBinder())
        }

        return super.render()
    }
}

module.exports = DataTableWidget