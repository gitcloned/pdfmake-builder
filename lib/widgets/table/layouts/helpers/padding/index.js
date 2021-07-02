
/**
 * Helper methods for different formatting options of table layout
 */
module.exports = {

    /**
     * Apply constant padding to all cells
     * @param {Number} padding paddint to apply
     * @returns return function to apply constant padding to all cells
     */
    All: (padding) => {
        return {
            "paddingLeft": function (i) {
                return padding
            },
            "paddingRight": function (i, node) {
                return padding
            }
        }
    }
}