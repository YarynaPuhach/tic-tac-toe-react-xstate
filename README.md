# Tic-Tac-Toe with React and XState

This project is a simple Tic-Tac-Toe game implemented using React and XState for state management. It demonstrates the use of finite state machines to manage game logic and UI interactions.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Clone the Repository

First, clone the repository:

```bash
git clone https://github.com/YarynaPuhach/tic-tac-toe-react-xstate.git
cd tic-tac-toe-react-xstate
```

### Install Dependencies
Install the necessary dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```
### Running the Application
To start the development server and view the application in your browser:

```bash
npm start
# or
yarn start
```
The application will be available at http://localhost:3000.

### Running Tests
To run the tests for the project:

```bash
npm test
# or
yarn test
```
### Approach and Design Decisions
Finite State Machines (FSM) with XState
The game logic is managed using XState’s finite state machines (FSM). Here’s a breakdown of the design:

Finite State Machine Design:

### States:
- playing: The game is ongoing. Transitions to gameOver when a win or draw condition is met.
- gameOver: Contains sub-states winner and draw to handle game end scenarios.
Transitions:
From playing to gameOver: Occurs when a win or draw condition is met.
From gameOver to playing: Resetting the game transitions back to the playing state.
### Context:

- board: An array representing the 3x3 grid of the game. It stores the current state of each cell (either 'x', 'o', or null).
- moves: Counter for the number of moves made in the game.
- player: Indicates the current player ('x' or 'o').
- winner: Stores the winner of the game, if any.
### Guards:

- checkWin: Checks if there is a winning condition by evaluating predefined winning lines.
- checkDraw: Determines if the game is a draw (i.e., all cells are filled and no winner).
- isValidMove: Validates if a move can be made at a given cell (i.e., the cell is empty).
### Actions:

- updateBoard: Updates the board state with the current player's move, toggles the player, and increments the move counter.
- resetGame: Resets the game context to its initial state.
- setWinner: Sets the winner based on the current player when the game is over.
### Event Handling:

- PLAY: Represents a player making a move. It updates the board if the move is valid and transitions to the appropriate state based on game outcome.
- RESET: Resets the game to the initial state, either from playing or gameOver.
### Error Handling:

- assertEvent: Ensures that events conform to expected types, helping to prevent unexpected event handling.
### Design Decisions
Finite State Machine (FSM) for Game Logic:

Using FSMs simplifies the management of game states and transitions. XState's declarative approach allows for clear and manageable state transitions and actions.
Modular and Scalable Design:

The separation of game states and actions ensures that the code is modular and easy to maintain. The approach scales well as additional features or states can be added with minimal changes.
Context Management:

Storing game-related data in the context provides a centralized way to manage and access game state, ensuring consistency and simplifying state updates.
Validation and Error Handling:

Guards and actions ensure that only valid moves are made and handle game outcomes correctly. This approach reduces the risk of invalid game states and improves robustness.
Responsiveness and Usability:

The game interface is designed to be intuitive and responsive, ensuring a smooth user experience across different devices and screen sizes.
By leveraging XState's FSM capabilities and designing the game logic around clear states and transitions, the Tic-Tac-Toe game is both robust and maintainable. This design approach provides a solid foundation for extending the game or integrating additional features in the future.
