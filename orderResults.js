;(function() {
    'use strict';
    var a;
    var b;
    var temp;
    var timesByTime = [];
    var timesByFreq = [];
    var times = [
        ['6', 4],
        ['7', 6],
        ['17', 2],
        ['10', 1],
        ['19', 1],
        ['13', 3],
        ['14', 3],
        ['16', 1],
        ['15', 1],
        ['11', 2],
        ['12', 2],
        ['8', 2],
        ['9', 1]
    ];

    for (var i = 0; i < times.length; i++) {
        //a = parseInt(times[i-1][0]);
        a = parseInt(times[i][0]);
        for (var j = 0; j < times.length; j++) {
            b = parseInt(times[j][0]);
            if (j !== i) {
                if (b > a) {
                    temp = times[i];
                    times[i] = times[j];
                    times[j] = temp;
                }
            }
        }

    }

    console.log(times);

    for (var k = 0; k < times.length; k++) {
        //a = parseInt(times[i-1][0]);
        //a = parseInt(times[i][0]);
        for (var l = 0; l < times.length; l++) {
            //b = parseInt(times[j][0]);
            if (l !== k) {
                if (times[l][1] < times[k][1]) {
                    temp = times[k];
                    times[k] = times[l];
                    times[l] = temp;
                }
            }
        }

    }

    console.log(times);


}());