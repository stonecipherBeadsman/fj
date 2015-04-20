;(function() {
    'use strict';
    var fs = require('fs');
    var path = require('path');
    var filePath = path.join(__dirname, 'food.json');
    var food;
    var frequencyData = {
        source: null,
        setData: function(x) {
            this.source = x;
        },
        getData: function() {
            return this.source;
        },
        createObject: function(isXString) {
            if (this.source === null) {
                console.log('object not created the source is null');
                return;
            } else {
                var retObject = {
                    'data': []
                };
                if (isXString) {
                    for (var i = 0; i < this.source.length; i++) {
                        retObject.data[i] = {
                            'x': this.source[i][0],
                            'y': this.source[i][1]
                        };
                    }
                } else {
                    for (var j = 0; j < this.source.length; j++) {
                        retObject.data[j] = {
                            'x': parseInt(this.source[j][0]),
                            'y': this.source[j][1]
                        };
                    }
                }

                console.log('object created: ', retObject);
                return retObject;
            }
        }
    };
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    var processedFood = '';
    var processedFoodJSON = [];
    var am;
    var pm;
    var military;

    function createIndexProperty(food) {
        //console.log(food);
        for (var i = 0; i < food.length; i++) { //food.length
            var x = food[i].dateTime.split(' ');
            food[i].day = parseInt(x[1]);
            food[i].year = parseInt(x[2]);
            x.splice(3, 1);
            for (var j = 0; j < months.length; j++) {
                if (months[j] === x[0]) {
                    x[0] = ++j;
                    food[i].month = x[0];
                }
            }
            am = x[3].match(/[AM]/g); //if > 1 == am else == pm
            military = x[3].split(':').join('');
            military = military.split('').splice(0, 4).join('');
            military = parseInt(military);
            if (am.length === 1 && military < 1200) {
                military += 1200;
            }
            food[i].milTime = military;
            var a, b, c, d, e;
            a = food[i].year.toString();
            b = food[i].month.toString();
            if (b.length < 2) {
                b = '0' + b;
            }
            c = food[i].day.toString();
            if (c.length < 2) {
                c = '0' + c;
            }
            d = food[i].milTime.toString();
            if (d.length < 4) {
                d = '0' + d;
            }
            e = a + b + c + d;
            e = parseInt(e);
            food[i].index = e;
        }
        return food;
    }

    function sortFood(sortMe) {
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

    function readInFile() {
        var sortedFood;
        var error;
        var fs = require('fs');
        var path = require('path');
        var filePath = path.join(__dirname, 'food.json');
        fs.readFile(filePath, {
            encoding: 'utf-8'
        }, function(err, data) {
            if (!err) {
                //console.log('data before parse \n', data);
                var food = createIndexProperty(JSON.parse(data));
                //console.log('data \n', food);
                var sortedFood = sortFood(food);
                makeFile(sortedFood);
                frequencyData.setData(mapReduce(sortedFood));

            } else {
                error = err;
                console.log(err);
            }

        });
        return sortedFood !== undefined ? sortedFood : error;
    }

    function makeFile(food) {
        var fs = require('fs');
        var path = require('path');
        var filePath = path.join(__dirname, 'food.json');
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = '_' + mm + '-' + dd + '-' + yyyy;

        processedFood += 'FOOD JOURNAL FOR JOSIAH WETZEL, COLATED ON ' + today + '\n';
        for (var n = 0; n < food.length; n++) {
            processedFood += food[n].index + ', ' + food[n].dateTime.replace(/[,]/g, '') + ', ' + food[n].type.replace(/[,]/g, ' /') + '\n';
        }

        fs.writeFile(__dirname + "/colatedFoodJournal" + today + ".csv", processedFood, function(err) {
            if (err) {
                return console.log(err);
            }

            console.log("The txt file was saved!");
        });

        fs.writeFile(__dirname + "/colatedFoodJournal" + today + ".json", JSON.stringify(food), function(err) {
            if (err) {
                return console.log(err);
            }

            console.log("The json file was saved!");

        });
    }

    function mapReduce(arrayOfObjects) {
        var ret = arrayOfObjects.map(function(node) {
                //return node.milTime;//to remove numbers and spaces .match(/([a-z]+)/g) //to keep spaces -> .join(' ');
                //console.log('tostring: ', typeof(node.milTime.toString()), node.milTime.toString());
                if (node.milTime.toString().length > 3) {
                    //console.log('>3', node.milTime.toString().split(''), node.milTime.toString().split('').splice(0, 2).join(''));
                    return node.milTime.toString().split('').splice(0, 2).join('');
                } else {
                    // console.log('<3', node.milTime.toString().split(''), node.milTime.toString().split('').splice(0, 1).join(''));
                    return node.milTime.toString().split('').splice(0, 1).join('');
                }
            })
            .reduce(function(last, now) {
                return last.concat(now);
            }, []).
        reduce(function(last, now) {
            var index = last[0].indexOf(now);

            if (index === -1) {
                last[0].push(now);
                last[1].push(1);
            } else {
                last[1][index] += 1;
            }

            return last;
        }, [
            [],
            []
        ])
            .reduce(function(last, now, index, context) {
                var zip = [];
                last.forEach(function(word, i) {
                    zip.push([word, context[1][i]]);
                });
                //console.log(zip);
                return zip;
            });
        console.log(ret);
        return ret;
    }
    readInFile();
    setTimeout(function() { //figure out a better solution to this
        console.log(frequencyData.getData());
        frequencyData.createObject(false);
    }, 3000);

}());