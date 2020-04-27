var express = require('express')
var app = express()
var indexRouter = require('./routes/index');
app.set('port', (process.env.PORT || 3000))
app.use(express.static(__dirname + '/public'))

app.use('/', indexRouter);

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})
    //anhbeo//
