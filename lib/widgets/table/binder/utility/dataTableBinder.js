const moment = require("moment")
const numeral = require("numeral")

const { DataTableColumnFormatting } = require("../../../../defaults")

const { DATA_COLUMN_TYPE } = require("../../DataColumnType")

/**
 * reads the value for column from record
 * @param {DataTableColumn} column data table column
 * @param {Object} record JSON record in data array
 */
const readColumnValue = module.exports.readColumnValue = (column, record) => {
    return record ? record[column.field] : null
}

/**
 * Detects the data type as per the value
 * @param {*} columnValue value of a column
 */
const detectColumnDataType = module.exports.detectColumnDataType = (columnValue) => {

    const valueType = typeof columnValue

    if (valueType == "string")
        return DATA_COLUMN_TYPE.Text
    else if (valueType == "number")
        return DATA_COLUMN_TYPE.Number
    else if (valueType == "boolean")
        return DATA_COLUMN_TYPE.Boolean
    else
        return DATA_COLUMN_TYPE.Any
}

/**
 * format value
 * @param {*} columnValue value of column
 * @param {DataTableColumn} column data table column
 * @param {Object} record data record
 */
const formatColumnValue = module.exports.formatColumnValue = (columnValue, column, record) => {

    /** if value is not present */
    if (columnValue == null || typeof columnValue == "undefined")
        return "-"

    let value = null

    /** format as per the type of column */
    switch (column.type) {
        case DATA_COLUMN_TYPE.Any:
            return columnValue

        case DATA_COLUMN_TYPE.Variable:
            column.type = detectColumnDataType(columnValue)
            return formatColumnValue(columnValue, column, record)

        case DATA_COLUMN_TYPE.Decimal:
            value = parseFloat(columnValue)
            if (!isNaN(value)) {
                return numeral(value).format(column.format || DataTableColumnFormatting.Decimal)
            } else {
                return "#ERROR"
            }

        case DATA_COLUMN_TYPE.Currency:
            value = parseFloat(columnValue)
            if (!isNaN(value)) {
                return numeral(value).format(column.format || DataTableColumnFormatting.Currency)
            } else {
                return "#ERROR"
            }

        case DATA_COLUMN_TYPE.Number:
            value = parseFloat(columnValue)
            if (!isNaN(value)) {
                return numeral(value).format(column.format || DataTableColumnFormatting.Number)
            } else {
                return "#ERROR"
            }

        case DATA_COLUMN_TYPE.Percentage:
            value = parseFloat(columnValue)
            if (!isNaN(value)) {
                return numeral(value).format(column.format || DataTableColumnFormatting.Percentage)
            } else {
                return "#ERROR"
            }

        case DATA_COLUMN_TYPE.Date:
            value = new Date(columnValue)
            if (value != "Invalid Date") {
                return moment.utc(value).format(column.format || DataTableColumnFormatting.Date)
            } else {
                return "#ERROR"
            }

        case DATA_COLUMN_TYPE.Boolean:
            value = null
            if (columnValue == true
                || (typeof columnValue == "string" && columnValue.toLocaleLowerCase().trim() == "yes")
                || (typeof columnValue == "number" && columnValue == 1)) {
                value = true
            }
            else if (columnValue == false
                || (typeof columnValue == "string" && columnValue.toLocaleLowerCase().trim() == "no")
                || (typeof columnValue == "number" && columnValue == 0)) {
                value = false
            }
            if (value == true) {
                return "Yes"
            } else if (value == false) {
                return "No"
            } else {
                return "#ERROR"
            }

        case DATA_COLUMN_TYPE.Text:
            return columnValue.toString()

        case DATA_COLUMN_TYPE.Any:
        default:
            return columnValue
    }
}

/**
 * read cell value alignment based on data type
 * @param {*} columnValue value of column
 * @param {DataTableColumn} column data table column
 * @param {Object} record data record
 */
const readCellAlignment = module.exports.readCellAlignment = (columnValue, column, record) => {

    if (column.alignment) return column.alignment

    switch (column.type) {

        case DATA_COLUMN_TYPE.Number:
        case DATA_COLUMN_TYPE.Decimal:
        case DATA_COLUMN_TYPE.Currency:
        case DATA_COLUMN_TYPE.Percentage:
        case DATA_COLUMN_TYPE.Date:
            return "right";

        default:
            return "left";
    }
}