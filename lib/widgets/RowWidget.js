const LayoutWidget = require("./abstracts/LayoutWidget");

const Widget = require("./abstracts/Widget")

const { promisify } = require('util')
const async = require('async')

const series = promisify(async.series)

class RowWidget extends LayoutWidget {

    constructor() {

        super("row")

        let args = Array.from(arguments);

        args.forEach(arg => {

            /**
             * content should be of type widget only
             */
            if (arg instanceof Widget)
                this.widgets.push(arg)
        })
    }

    render () {

        return series(
            this.widgets.map(widget => {
    
                return (callback) => {
    
                    widget
                        .render()
                        .then(widgetDefinition => {
    
                            callback(null, widgetDefinition)
                        })
                        .catch(callback)
                }
            }))
    }
}

module.exports = RowWidget