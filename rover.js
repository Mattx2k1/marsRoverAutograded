class Rover {
   // Write code here!
    // define constructor with 1 param (position)
      // set position
      // set mode 
      // set generatorWatts'
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;

   }

  //define a function called receiveMessage(message)
    //return {
        // message: message name
        // results: this.buildResults(message)
    // }

  receiveMessage(message) {
    let response = {
      message: message.name,
      results: this.buildResults(message)
    };

  }

  buildResults(message){
    // initialize result array
    let resultArray = [];
    // go through each command
    for (let i = 0; i < message.command; i++) {
      if (message.command === 'STATUS_CHECK') {
        resultArray.push({
         completed: true, 
         roverStatus: {
           mode: 'NORMAL', 
           generatorWatts: 110,
           position: 87382098
         }
        )
      }
    })
    // check what type of command it is
    // if command is status check
        // add this to the result array
      // {
      //   completed: true, 
      //   roverStatus: {
      //     mode: 'NORMAL', 
      //     generatorWatts: 110,
      //     position: 87382098
      //   }
      // }
  }
}

module.exports = Rover;