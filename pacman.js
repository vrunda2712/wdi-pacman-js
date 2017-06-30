// Setup initial game stats
var score = 0;
var lives = 2;
var powerPallets = 4;

// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  color: 'Red',
  character: 'Shadow',
  edible: false
};
var blinky = {
  menu_option: '2',
  name: 'Blinky',
  color: 'Cyan',
  character: 'Speedy',
  edible: false
};
var pinky = {
  menu_option: '3',
  name: 'Pinky',
  color: 'Pink',
  character: 'Bashful',
  edible: false
};
var clyde = {
  menu_option: '4',
  name: 'Clyde',
  color: 'Orange',
  character: 'Pokey',
  edible: false
};

// replace this comment with your four ghosts setup as objects
var ghosts = [];
ghosts.push(inky);
ghosts.push(blinky);
ghosts.push(pinky);
ghosts.push(clyde);

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log('Power-Pallets: ' + powerPallets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPallets > 0) {
    console.log('(p) Eat Power-Pallet');
  }
  console.log('(1) Eat ' + ghosts[0].name);
  console.log('(2) Eat ' + ghosts[1].name);
  console.log('(3) Eat ' + ghosts[2].name);
  console.log('(4) Eat ' + ghosts[3].name);
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

// process eating an inedible ghosts
function eatGhost(ghost) {
  if (ghost.edible === false) {
    console.log('\n' + ghost.color + ' colored ' + ghost.name + ' kills Pac-Man. You lost life.' );
    lifeLost();
  } else {
    console.log('\nYou ate ' + ghost.character + ' ' + ghost.name + '.');
    score += 200;
    for (var ghost_index = 0; ghost_index < ghosts.length; ghost_index++){
      ghosts[ghost_index].edible = false;
    }
  }
}

function lifeLost() {
  lives--;
  if(lives === 0) {
    process.exit();
  }
}

function eatPowerPallete(){
  if (powerPallets === 0) {
    return console.log('\nNo Power-Pallets left!!');
  }
  score += 50;
  powerPallets--;
  for (var ghost_index = 0; ghost_index < ghosts.length; ghost_index++){
    ghosts[ghost_index].edible = true;
  }
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      eatPowerPallete();
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
