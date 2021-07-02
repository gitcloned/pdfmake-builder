/**
 * Helper methods for different formatting options of table layout
 */
module.exports = {

    /**
     * Render vertical lines for all of the rows
     * @param {Number} width specify width to apply (default: 1)
     * @returns function to render horizontal lines
     */
    All: (width = 1) => {
        return {
            /**
             * Render vertical lines below all rows
             * @param {Number} i row index
             * @param {Object} node Table node pdfmake object, provide properties like node.table, node.table.body, node.table.headerRows etc
             * @returns function to render horizontal lines
             */
            "vLineWidth":
                (i, node) => {
                    return width
                }
        }
    },

    /**
     * Render vertical lines for none of the rows
     * @param {Number} width specify width to apply (default: 1)
     * @returns function to render vertical lines
     */
    None: (width = 0) => {
        return {
            "vLineWidth":
                (i, node) => {
                    return 0
                }
        }
    },

    /**
     * Render vertical lines with specified color
     * @param {String} color color name or hex value
     * @returns function to render vertical lines with specified color
     */
    Color: (color) => {

        return {
            "vLineColor":
                (i, node) => {
                    return color
                }
        }
    }
}