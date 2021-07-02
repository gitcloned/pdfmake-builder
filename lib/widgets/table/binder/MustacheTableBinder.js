const mustache = require('mustache')

const BasicTableBinder = require("./BasicTableBinder");

class MustacheTableBinder extends BasicTableBinder {

    constructor () {
        super("mustache-table-binder")
    }

    bind (table, body, data) {

        return new Promise((resolve, reject) => {

            try {

                let template = JSON.stringify(body)
                let newBody = JSON.parse(mustache.render(template, data))

                resolve(newBody)
            } catch (err) {

                reject(`Error occurred while binding data to table using mustache expressions. ${err}`)
            }
        })
    }
}

module.exports = MustacheTableBinder