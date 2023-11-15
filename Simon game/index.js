document.addEventListener('DOMContentLoaded', function () {
  const topLeft = document.querySelector('.top-left-panel');
  const topRight = document.querySelector('.top-right-panel');
  const bottomLeft = document.querySelector('.bottom-left-panel');
  const bottomRight = document.querySelector('.bottom-right-panel');
  const startButton = document.querySelector('button');

  const getRandomPanel = () => {
    const panels = [topLeft, topRight, bottomLeft, bottomRight];
    return panels[parseInt(Math.random() * panels.length)];
  };

  const sequence = [getRandomPanel()];
  let sequenceToGuess = [...sequence];

  const flash = (panel) => {
    return new Promise((resolve) => {
      panel.classList.add('active');
      setTimeout(() => {
        panel.classList.remove('active');
        setTimeout(() => {
          resolve();
        }, 250);
      }, 1000);
    });
  };

  let canClick = false;

  const panelClicked = (clickedPanel) => {
    if (!canClick) return;
    const expectedPanel = sequenceToGuess.shift();
    if (expectedPanel === clickedPanel) {
      if (sequenceToGuess.length === 0) {
        // start new round
        sequence.push(getRandomPanel());
        sequenceToGuess = [...sequence];
        startFlashing();
      }
    } else {
      // end game
      alert('Game over!');
    }
  };

  const startFlashing = async () => {
    canClick = false;
    for (const panel of sequence) {
      await flash(panel);
    }
    canClick = true;
  };

  const startGame = () => {
    sequence.length = 0; // Clear the sequence
    sequence.push(getRandomPanel()); // Generate a new random sequence
    sequenceToGuess = [...sequence];
    startFlashing();
  };

  // Add event listeners to panels
  topLeft.addEventListener('click', () => panelClicked(topLeft));
  topRight.addEventListener('click', () => panelClicked(topRight));
  bottomLeft.addEventListener('click', () => panelClicked(bottomLeft));
  bottomRight.addEventListener('click', () => panelClicked(bottomRight));

  // Add event listener to the Start Game button
  startButton.addEventListener('click', startGame);
});
