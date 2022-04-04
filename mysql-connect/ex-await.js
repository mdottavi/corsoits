

function setTimeoutPromise(seconds) {
  const prom = new Promise((resolve) => {
    setTimeout(resolve, seconds);
  })
  return prom;
}

async function main() {

  await setTimeoutPromise(2000);
  console.log('sono passati 2 secondi');
  await setTimeoutPromise(2000);
  console.log('sono passati altri 2 secondi');
  await setTimeoutPromise(2000);
  console.log('è passato un altro secondo');

  
}
console.log('inzio');
main();
console.log('fine');
