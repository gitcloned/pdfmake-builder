
const { promisify } = require('util')
const async = require('async')
const mustache = require('mustache')

const series = promisify(async.series)

/**
 * Build widgets and bind them with context provided at runtime using mustache
 * @param {Array} widgets Array of widgets to render
 */
const buildWithContext = (widgets) => {

    if (!widgets || !widgets.length) return Promise.resolve(() => null)

    return series(
        widgets.map(widget => {

            return (callback) => {

                widget
                    .render()
                    .then(widgetDefinition => {

                        callback(null, widgetDefinition)
                    })
                    .catch(callback)
            }
        })
    )
        .then(results => {

            return (context) => {

                try {

                    /**
                     * bind the output for anything with <%  %>
                     */
                    const output = JSON.parse(mustache.render('{{=<% %>=}} ' + JSON.stringify(results), context))
                    return output
                } catch (e) {

                    console.log(e)
                    return results
                }
            }
        })
}

module.exports = (report) => {

    return series(
        report.widgets.map(widget => {

            return (callback) => {

                widget
                    .render()
                    .then(widgetDefinition => {

                        callback(null, widgetDefinition)
                    })
                    .catch(callback)
            }
        }))
        .then(results => {

            return {
                ...report._definition,
                content: results // && results.length ? results[0] : []
            }
        })
        // build header
        .then(definition => {

            return buildWithContext(report.headerWidgets)
                .then(results => {

                    return {
                        ...definition,
                        header: (currentPage, pageCount, pageSize) => {
                            return results({ currentPage, pageCount, pageSize })
                        }
                    }
                })
        })
        // build footer
        .then(definition => {

            return buildWithContext(report.footerWidgets)
                .then(results => {

                    return {
                        ...definition,
                        footer: (currentPage, pageCount, pageSize) => {
                            return results({ currentPage, pageCount, pageSize })
                        }
                    }
                })
        })
        // build background
        .then(definition => {

            return buildWithContext(report.backgroundWidgets)
                .then(results => {

                    return {
                        ...definition,
                        background: (currentPage, pageCount, pageSize) => {
                            return results({ currentPage, pageCount, pageSize })
                        }
                    }
                })
        })
}