

var express = require('express'),
	path = require("path");


var app = express();

app.set('port', process.env.PORT  || 3001);

app.use(express.bodyParser());
app.use(express.compress());
app.use(express.methodOverride());

app.use(app.router);

app.use('/resources',express.static(path.join(__dirname, 'resources')));


app.get('/books' , function(req,res) {
//	res.json([
//	    {"name" : "AngularJS in action"},
//	    {"name" : "Backbone in action"},
//	    {"name" : "Ember in action"}
//	]);
	setTimeout(function() {
		res.send('500' , 'error occured');
	} , 10*1000);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


