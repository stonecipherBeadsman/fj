var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, 'food.json'); //'colatedFoodJournal_04-12-2015.txt');

function sortData(sortMe) {
    console.log(sortMe.length);
    for (var k = 0; k < sortMe.length; k++) {
        for (var l = 0; l < sortMe.length; l++) {
            if (l !== k && sortMe[k].index < sortMe[l].index) {
                var temp = sortMe[l];
                sortMe[l] = sortMe[k];
                sortMe[k] = temp;
            }
        }
    }
    return sortMe;
}

fs.readFile(filePath, {
    encoding: 'utf-8'
}, function(err, data) {
    if (!err) {
        data = JSON.parse(data);
        console.log(data[1]);
        sortData(data);
        console.log('received data: ' + data);
        /* response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();*/
    } else {
        console.log(err);
    }

});