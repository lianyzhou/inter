

var express = require('express'),
	path = require("path");


var app = express();

app.set('port', process.env.PORT  || 3001);

app.use(express.bodyParser());
app.use(express.compress());
app.use(express.methodOverride());

app.use(app.router);

app.use('/resources',express.static(path.join(__dirname, 'resources')));

app.get('/booklist' , function(req,res) {
	res.json([
		{"name" : "AngularJS in action"},
		{"name" : "Backbone in action"},
		{"name" : "Ember in action"}
	]);
});

app.get('/books/:bookid' , function(req,res) {
	
	var bookid = req.params.bookid;
	
	var bookList = {
		"1": {"name" : "AngularJS in action"},
		"2": {"name" : "Backbone in action"},
		"3": {"name" : "Ember in action"} 
	};
	
	if(bookList[bookid]) {
	   res.json(bookList[bookid]);
	} else {
	   res.send(500 , 'book not found');
	}
	
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


