class BasicTableBinder {

    constructor (name = "basic-table-binder") {
        this.name = name
    }

    /**
     * Bind body to data, and returns the new body back
     * @param {TableWidget} table instance of table widget
     * @param {Array} body Array of rows
     * @param {Object} data Data to bind to table
     * @returns Table Body
     */
    bind (table, body, data) {

        return Promise.resolve(body)
    }
}

module.exports = BasicTableBinder