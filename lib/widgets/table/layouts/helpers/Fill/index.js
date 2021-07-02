/**
 * Helper methods for different formatting options of table layout
 */
module.exports = {

    /**
     * Render all cells with specified color
     * @param {String} color color name or hex value
     * @param {String} headerColor color to apply for header, default: white
     * @returns function to render horizontal lines with specified color
     */
    All: (color, headerColor = "#fff") => {

        if (typeof color == "string") {

            return {
                "fillColor":
                    (i, node) => {
                        if (i < node.table.headerRows)
                            return headerColor || color
                        else
                            return color
                    }
            }
        } else {

            return () => { return null }
        }
    },

    /**
     * Apply alternating color to table
     * @param {String} oddRowColor color to apply for odd rows
     * @param {String} evenRowColor color to apply for even rows
     * @param {String} headerColor color to apply for header, default: white
     * @returns 
     */
    Alternating: (oddRowColor, evenRowColor, headerColor = "#fff") => {

        if (typeof oddRowColor == "string" && typeof evenRowColor == "string") {

            return {
                "fillColor":
                    (i, node) => {
                        if (i < node.table.headerRows)
                            return headerColor
                        else if (i % 2 == 1) {
                            return oddRowColor
                        } else {
                            return evenRowColor
                        }
                    }
            }
        } else {

            return () => { return null }
        }
    }
}