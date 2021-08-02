const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // I don't know if I need these scoped variables here 
  let commandsArray1 = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commandsArray1);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
  console.log(rover);
  console.log(message);
  console.log(response);

  // 7 tests here!
  // test 7
  it("constructer sets position and default values for mode and generatorWatts", function() {
    expect(rover.position).toEqual(98382);
    expect(rover.generatorWatts).toEqual(110);
    
  })

  // test 8
  it("response returned by receiveMessage contains name of message", function() {
    //expect(response).toEqual(message.name);
    let command1 = new Command('MOVE', 10000);
    let command2 = new Command('MODE_CHANGE', 'LOW_POWER');
    let commandArray = [command1, command2];
    let message = new Message('thing', commandArray);
    let rover1 = new Rover(10);
    let messageReceived = rover1.receiveMessage(message);
    expect(messageReceived.message).toEqual(message.name);

   })

  // test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let command1 = new Command('STATUS_CHECK');
    let command2 = new Command('MODE_CHANGE', 'LOW_POWER');
    let commandArray = [command1, command2];
    let message = new Message('thing', commandArray);
    let rover2 = new Rover(10);
    let commandArray2 = rover2.receiveMessage(message);
    expect(commandArray2.results.length).toEqual(2);
  });

  // test 10
  it("responds correctly to status check command", function() {
    let command1 = new Command('STATUS_CHECK');
    let commandArray = [command1];
    let message = new Message('thing', commandArray);
    let rover3 = new Rover(10);
    let command = rover3.receiveMessage(message);
    expect(command.results).toContain(jasmine.objectContaining({completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 10}}));
  });

  // test 11 
  it("responds correctly to mode change command", function() {
    let command1 = new Command('MODE_CHANGE', 'LOW_POWER');
    let commandArray = [command1];
    let message = new Message('thing', commandArray);
    let rover3 = new Rover(10);
    let command = rover3.receiveMessage(message);
    expect(command.results).toContain(jasmine.objectContaining({completed: true}));
  });

  // test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let command1 = new Command('MODE_CHANGE', 'LOW_POWER');
    let command2 = new Command('MOVE', 10000)
    let commandArray = [command1, command2];
    let message = new Message('thing', commandArray);
    let rover3 = new Rover(10);
    let command = rover3.receiveMessage(message);
    expect(command.results).toContain(jasmine.objectContaining({completed: false}));
  });

  // test 13
  it("responds with position for move command", function(){
    let command2 = new Command('MOVE', 10000)
    let commandArray = [command2];
    let message = new Message('thing', commandArray);
    let rover3 = new Rover(10);
    let command = rover3.receiveMessage(message);
    expect(rover3.position).toEqual(command2.value)
  });

});