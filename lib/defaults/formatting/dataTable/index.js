const { DATA_COLUMN_TYPE } = require("../../../widgets/table/DataColumnType");

module.exports = {

    [DATA_COLUMN_TYPE.Currency]: '($ 0.00 a)',

    [DATA_COLUMN_TYPE.Decimal]: '0,0.0',

    [DATA_COLUMN_TYPE.Number]: '0,0',
    
    [DATA_COLUMN_TYPE.Percentage]: '0.0 %',
    
    [DATA_COLUMN_TYPE.Date]: 'DD-MM-YYYY'
}