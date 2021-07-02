
const DataTableColumn = require("./lib/widgets/table/DataTableColumn")
const { TableLayout } = require("./lib/widgets/table/Layouts")

module.exports.PDFReport = require("./lib/PDFReport")

/**
 * helper and builder classes
 */
module.exports.builder = require("./lib/builder")
module.exports.table = {

    /**
     * Binders which binds data to body
     */
    BINDERS: require("./lib/widgets/table/binders"),

    /**
     * Standard layouts for table 
     */
    LAYOUTS: require("./lib/widgets/table/Layouts").TABLE_LAYOUTS,

    /**
     * Layout Helpers
     */
    LAYOUT_HELPERS: require("./lib/widgets/table/layouts/helpers"),

    /**
     * Build a new TableLayout
     * 
     * https://pdfmake.github.io/docs/0.1/document-definition-object/tables/#own-table-layouts
     * 
     * @param {Object} definition Layout definition
     * @returns 
     */
    NewLayout: (definition = {}) => {

        return new TableLayout(definition)
    }
}
module.exports.dataTable = {

    /**
     * Column types supported by Data Table widget
     */
    DATA_COLUMN_TYPE: require("./lib/widgets/table/DataColumnType").DATA_COLUMN_TYPE,

    /**
     * Creates a new DataTableColumn
     * @param  {...any} args Specify params as field, label, colSpan, alignment, style, type (DATA_COLUMN_TYPE), width
     * @returns DataTableColumn
     */
    Column: (...args) => {
        return new DataTableColumn(...args)
    }
}

/**
 * Fonts
 */
module.exports.FONTS = require("./lib/Fonts").FONTS

/**
 * MODULE DEFAULTS
 */
module.exports.DEFAULTS = require("./lib/defaults")

/**
 * Base classes to inherit from
 */
module.exports.Widget = require("./lib/widgets/abstracts/Widget")
module.exports.BasicTableBinder = require("./lib/widgets/table/binder/BasicTableBinder")
module.exports.DataTableBinder = require("./lib/widgets/table/binder/DataTableBinder")