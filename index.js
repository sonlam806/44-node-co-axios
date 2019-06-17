var co = require('co');
var axios = require('axios');

var urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
    'https://jsonplaceholder.typicode.com/todos/4',
    'https://jsonplaceholder.typicode.com/todos/5'
  ];
  
  
  
  // Cách 1: Sử dụng vòng lặp for
  
  // Cách 2: Sử dụng array.map
  // Gợi ý: Có thể yield 1 array các Promise
  
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

  co(function*() {
    var values = yield(result);
    return values;
  }).then(function(values) {
      for (var i = 0; i < values.length; i++) {
          console.log(values[i].data)
      }
  })

  // function abc(arr) {
  //   var x = arr.map(function(item) {
  //     console.log(x);
  //   })
  // };
  // abc(result);
  
  
  // readFilePromise('https://jsonplaceholder.typicode.com/todos/1')
  // .then(function(values) {
  //   console.log(values.data);
  // });
  
//   co(function*() {
//     var values = yield [
//       readFilePromise('https://jsonplaceholder.typicode.com/todos/1'),
//       readFilePromise('https://jsonplaceholder.typicode.com/todos/2'),
//       readFilePromise('https://jsonplaceholder.typicode.com/todos/3'),
//       readFilePromise('https://jsonplaceholder.typicode.com/todos/4'),
//       readFilePromise('https://jsonplaceholder.typicode.com/todos/5')
//     ]
//     return values;
//   }).then(function(values) {
//       console.log(values.data);
//   }).catch(function(error) {
//       console.log(error);
//   });
  
  
  // var readFiles = co.wrap(function*(array) {
  //     var values = yield [array.map(function(link) {
  //         return readFilePromise(link);
  //     })];
  //     return values;
  // });
  
  // readFiles([urls])
  //   .then(function(values) {
  //       console.log(values.data);
  //   })