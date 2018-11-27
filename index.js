let choo = require('choo')
let css = require('sheetify')

css('tachyons')

let app = choo()

app.use(require('./store').default)
app.route('/', require('./view'))
app.mount('body')
