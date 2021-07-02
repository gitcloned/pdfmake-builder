const { TABLE_LAYOUTS, TableLayout } = require("../widgets/table/Layouts")

module.exports = {

    // default font
    Font: require("../Fonts").FONTS.Times,

    /**
     * DataTable widget DataTableColumn Default formattings
     */
    DataTableColumnFormatting: {

        ...require("./formatting/dataTable")
    },

    /**
     * Add a new font
     * @param {String} fontName font name
     * @param {Object} fontMappings Font mappings, for diff font file paths (normal, bold, italics, bolditalics)
     */
    addFont: (fontName, fontMappings) => {

        const { FONTS, FontMapping } = require("../Fonts")

        /**
         * if a valid font object, atleast should define normal
         */
        if (typeof fontName == "string" && typeof fontMappings == "object" && fontMappings.normal) {

            FONTS[fontName] = fontName
            FontMapping[fontName] = fontMappings
        }
    },

    /**
     * Add custom table layouts
     * 
     * https://pdfmake.github.io/docs/0.1/document-definition-object/tables/#own-table-layouts
     * 
     * @param {String} layoutName name of the layout
     * @param {TableLayout} layoutDefinition table layout definition
     */
    addTableLayout: (layoutName, layoutDefinition) => {

        if (layoutDefinition instanceof TableLayout
            && typeof layoutName == "string")
            TABLE_LAYOUTS[layoutName] = layoutDefinition.build()
    }
}