const pdfMake = require("pdfmake/build/pdfmake.js")
const pdfFonts = require('../build/vfs_fonts.js')

pdfMake.vfs = pdfFonts

const { 
    PDFReport,
    builder,
    table,
    dataTable,
    FONTS,
    DEFAULTS,
    Widget,
    BasicTableBinder,
    DataTableBinder
} = require("../index")

if (window) {

    window.PDFReport = PDFReport
    window.builder = builder
    window.table = table
    window.dataTable = dataTable
    window.FONTS = FONTS
    window.DEFAULTS = DEFAULTS
    window.Widget = Widget
    window.BasicTableBinder = BasicTableBinder
    window.DataTableBinder = DataTableBinder
}