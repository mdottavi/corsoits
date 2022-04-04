console.log('inzio');

function setTimeoutPromise(seconds) {
  const prom = new Promise((resolve, reject) => {
    setTimeout(resolve, seconds);
  })
  return prom;
}

setTimeoutPromise(2000)
  .then(() => {
    console.log('sono passati 2 secondi');
    return setTimeoutPromise(2000)
  })
  .then(() => {
    console.log('sono passati altri 2 secondi');
    return setTimeoutPromise(1000)
  })
  .then(() => {
    console.log('è passato un altro secondo');    
  })

console.log('fine');