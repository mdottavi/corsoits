console.log('inzio');

setTimeout(
  () => {
    console.log('sono passati 2 secondi');

    setTimeout(
      () => {
        console.log('sono passati altri 2 secondi');
        if(true) {
          setTimeout(
            () => {
              console.log('è passato un altro secondo');
            }, 1000)
        } else {
          
        }
        
      },
      2000)
  },
  2000
);

console.log('fine');