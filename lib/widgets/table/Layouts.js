module.exports.TABLE_LAYOUTS = {

    "noBorders": "noBorders",

    "headerLineOnly": "headerLineOnly",

    "lightHorizontalLines": "lightHorizontalLines"
}


class TableLayout {

    constructor(definition = {}) {
        this.definition = definition
    }

    /**
     * Specify the part of definition to update
     * 
     * https://pdfmake.github.io/docs/0.1/document-definition-object/tables/#own-table-layouts
     * 
     * @param {Object} part definition part, can specify multiple as multiple argument to this function 
     */
    with() {

        let args = Array.from(arguments);

        args.forEach(part => {

            if (part && Object.keys(part).length) {

                for (let key in part) {
                    if (part.hasOwnProperty(key)
                        && typeof part[key] == "function"
                        && ["hLineWidth", "vLineWidth", "hLineColor", "vLineColor", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "fillColor"].indexOf(key) > -1) {

                        this.definition = Object.assign(this.definition, { [key]: part[key] })
                    }
                }
            }
        })

        return this
    }

    /**
     * Builds the tableLayout definition
     */
    build() {
        return this.definition
    }
}

module.exports.TableLayout = TableLayout