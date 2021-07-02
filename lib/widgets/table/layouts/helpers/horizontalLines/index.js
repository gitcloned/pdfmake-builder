/**
 * Helper methods for different formatting options of table layout
 */
module.exports = {

    /**
     * Render horizontal lines for all of the rows
     * @param {Number} width specify width to apply (default: 1)
     * @returns function to render horizontal lines
     */
    All: (width = 1) => {
        return {
            /**
             * Render horizontal lines below all rows
             * @param {Number} i row index
             * @param {Object} node Table node pdfmake object, provide properties like node.table, node.table.body, node.table.headerRows etc
             * @returns function to render horizontal lines
             */
            "hLineWidth":
                (i, node) => {
                    return width
                }
        }
    },

    /**
     * Render horizontal lines for none of the rows
     * @param {Number} width specify width to apply (default: 1)
     * @returns function to render horizontal lines
     */
    None: (width = 0) => {
        return {
            "hLineWidth":
                (i, node) => {
                    return 0
                }
        }
    },

    /**
     * Render horizontal lines for headers only
     * @param {Number} width specify width to apply (default: 1)
     * @returns function to render horizontal lines
     */
    HeaderOnly: (width = 1) => {
        return {
            "hLineWidth":
                (i, node) => {
                    return i == node.table.headerRows ? width : 0
                }
        }
    },

    /**
     * Render horizontal lines with specified color
     * @param {String} color color name or hex value
     * @returns function to render horizontal lines with specified color
     */
    Color: (color) => {

        return {
            "hLineColor":
                (i, node) => {
                    return color
                }
        }
    }
}