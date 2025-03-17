// Create web server
// Load express library
var express = require('express');
// Create express app
var app = express();
// Load body-parser library
var bodyParser = require('body-parser');
// Load fs library
var fs = require('fs');
// Load comments.json file
var comments = require('./comments.json');

// Use body-parser to parse JSON
app.use(bodyParser.json());

// Create a route that sends the comments back to the client
app.get('/comments', function (req, res) {
  res.send(comments);
});

// Create a route that adds a comment to the comments array
app.post('/comments', function (req, res) {
  // Get the new comment from the body of the request
  var newComment = req.body;
  // Add the new comment to the comments array
  comments.push(newComment);
  // Write the updated comments array to the comments.json file
  fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), function(err) {
    if (err) {
      res.status(500).send('Failed to write comment to file');
    } else {
      // Send the updated comments array back to the client
      res.send(comments);
    }
  });
});

// Start the server
app.listen(3000, function () {
  console.log('Server is listening on port 3000');
});