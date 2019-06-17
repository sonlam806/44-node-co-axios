var co = require('co');
var axios = require('axios');

var urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
    'https://jsonplaceholder.typicode.com/todos/4',
    'https://jsonplaceholder.typicode.com/todos/5'
  ];


function readFilePromise(url){
return axios.get(url, function(err, data){
    if(err){
        reject(err);
    } else{
        resolve(data);
    }
    });
};

var result = urls.map(function(link) {
return readFilePromise(link);
})

var readFiles = co.wrap(function*(files) {
    var array = files.map(function(file) {
        return readFilePromise(file);
    })
    var values = yield array;
    return values;
});

readFiles(urls)
    .then(function(values) {
        for (var i = 0; i < values.length; i++) {
        console.log(values[i].data);
    }
})

// co(function*() {
//  var values =  yield (result)
//   return values
// }).then(function(values) {
//     console.log(values);
// }).catch(function(error) {
//     console.log(error);
// });