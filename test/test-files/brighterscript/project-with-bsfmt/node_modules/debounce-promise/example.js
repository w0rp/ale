const debounce = require('debounce-promise')

function expensiveOperation (value, delay) {
  return Promise.resolve(value)
}

// Simple example
{
  const saveCycles = debounce(expensiveOperation, 100);

  [1, 2, 3, 4].forEach(num => {
    return saveCycles('call no #' + num).then(value => {
      console.log(value)
    })
  })
}

// With leading=true
{
  const saveCycles = debounce(expensiveOperation, 100, {leading: true});

  [1, 2, 3, 4].forEach(num => {
    return saveCycles('call no #' + num).then(value => {
      console.log(value)
    })
  })
}

// With accumulate=true
{
  function squareValues (values) {
    return Promise.all(values.map(val => val * val))
  }

  const square = debounce(squareValues, 100, {accumulate: true});

  [1, 2, 3, 4].forEach(num => {
    return square(num).then(value => {
      console.log(value)
    })
  })
}
