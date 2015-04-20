;(function() {
    'use strict';

    var f = {
                'data':
   [ { x: 7, y: 24 },
     { x: 8, y: 16 },
     { x: 9, y: 12 },
     { x: 10, y: 12 },
     { x: 12, y: 21 },
     { x: 14, y: 11 },
     { x: 16, y: 22 },
     { x: 17, y: 23 },
     { x: 5, y: 2 },
     { x: 6, y: 34 },
     { x: 11, y: 12 },
     { x: 13, y: 23 },
     { x: 20, y: 20 },
     { x: 21, y: 11 },
     { x: 15, y: 17 },
     { x: 18, y: 27 },
     { x: 19, y: 14 },
     { x: 22, y: 3 },
     { x: 23, y: 5 } ] 
            };
    var objects = [];
    var temp;

    for (var i = 0; i < f.data.length; i++) {
        for (var j = 0; j < f.data.length; j++) {
            if (j !== i) {
                if (f.data[i].x < f.data[j].x ) {
                    temp = f.data[j];
                    f.data[j] = f.data[i] ;
                    f.data[i]  = temp;
                }
            }
        }
    }    
        console.log(f);
}());