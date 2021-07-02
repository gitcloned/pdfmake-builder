const { DATA_COLUMN_TYPE } = require("./DataColumnType")

class DataTableColumn {

    /**
     * 
     * @param {Object} params Specify params as field, label, colSpan, alignment, style, type (DATA_COLUMN_TYPE), width
     */
    constructor(params) {

        this.field = params.field
        this.label = params.label || params.field

        if (typeof params.width == "string" && params.width.trim())
            this.width = params.width
        if (typeof params.colSpan == "number" && params.colSpan > 0)
            this.colSpan = params.colSpan
        if (typeof params.alignment == "string" && ['center', 'left', 'right'].indexOf(params.alignment) > -1)
            this.alignment = params.alignment
        if (typeof params.style == "string" && params.style.trim())
            this.style = params.style
        if (typeof params.format == "string" && params.format.trim())
            this.style = params.format.trim()

        if (params.type && DATA_COLUMN_TYPE[params.type]) {
            this.type = params.type
        } else {
            this.type = DATA_COLUMN_TYPE.Variable
        }

        this.properties = {}
    }

    /**
     * Specify any property for the table column in key-value format
     * @param {Object} props Table column properties
     */
    props(props) {

        if (props instanceof Object)
            this.properties = Object.assign(this.properties, props)

        return this
    }
}

module.exports = DataTableColumn
