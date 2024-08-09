# Tic-Tac-Toe with React and XState

[DEMO](https://tic-tac-toe-react-xstate.vercel.app/)

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

The Tic-Tac-Toe project uses XState’s finite state machines (FSM) to manage game logic and state transitions effectively. Here’s a detailed breakdown of the design:

## Finite State Machine Design

### States:

- **idle**: Initial state where the game is not running. Transitions to 'playing' upon starting the game or remains idle when changing the board size.
- **playing**: The game is in progress. Automatically transitions to 'won' or 'draw' when a win or draw condition is met.
- **won**: Represents the game end when a player wins. Transitions to 'idle' on reset.
- **draw**: Represents the game end when it's a draw. Transitions to 'idle' on reset.

### Transitions:

- **From idle to playing**: Triggered by the `START` event. Includes initialization of the board with the current size.
- **From playing to won or draw**: Based on win or draw conditions checked during each move.
- **From won or draw to idle**: Triggered by the `RESET` event, resetting the game to its initial state, including the board size.

### Context:

- **board**: An array representing the game grid. It stores the current state of each cell (either 'x', 'o', or null). The board size is configurable and affects the board’s initialization and rendering.
- **size**: Defines the dimensions of the board (e.g., 3x3, 4x4). This parameter influences how the board is created, rendered, and how game logic is applied.
- **moves**: Counter for the number of moves made in the game.
- **player**: Indicates the current player ('x' or 'o').
- **winner**: Stores the winner of the game, if any.

### Guards:

- **checkWin**: Evaluates whether there is a winning condition based on predefined winning lines for the current board size.
- **checkDraw**: Determines if the game is a draw (i.e., all cells are filled and there is no winner).
- **isValidMove**: Validates if a move is allowed in a specified cell (i.e., the cell is empty).

### Actions:

- **updateBoard**: Updates the board with the current player’s move, toggles the player, and increments the move counter. Takes into account the board size for updating the correct cell.
- **resetGame**: Resets the game context to its initial state, including board size and player turns.
- **setSize**: Updates the board size dynamically. Reinitializes the board to fit the new size and adjusts the game logic accordingly.
- **setWinner**: Sets the winner based on the current player when the game ends.

### Event Handling:

- **PLAY**: Represents a player making a move. If the move is valid, it updates the board and transitions to 'won' or 'draw' based on the game outcome.
- **RESET**: Resets the game state to the initial 'idle' state, clearing the board and resetting counters. Also resets the board size if changed.
- **CHANGE_SIZE**: Updates the board size to a new value, reinitializing the game with the new board dimensions.

### Error Handling:

- **assertEvent**: Ensures that events conform to expected types, which helps prevent unexpected behavior and maintains game stability.

## Design Decisions

### Finite State Machine (FSM) for Game Logic:

- **Modularity and Clarity**: Using FSMs simplifies the management of game states and transitions. XState’s declarative approach allows for clear and manageable state transitions and actions, making the game logic easier to follow and maintain.

### Modular and Scalable Design:

- **Board Size Flexibility**: The inclusion of a `setSize` action allows the game to dynamically adjust the board size. This flexibility makes the game adaptable to different board dimensions (e.g., 3x3, 4x4) and enhances scalability.
- **Extensibility**: The modular design of states, actions, and context management facilitates the addition of new features or board sizes with minimal code changes.

### Context Management:

- **Centralized Data**: Centralizing game-related data, including the `size` parameter, in the context provides a unified way to manage and access game state. This approach ensures consistency and simplifies the process of updating and retrieving game-related information.

### Validation and Error Handling:

- **Dynamic Validation**: Guards and actions take into account the board size to validate moves and handle game outcomes accurately. This validation helps prevent invalid game states and improves the overall robustness of the game.

### Responsiveness and Usability:

- **Responsive Design**: The UI adapts to the board size, ensuring that the game remains visually appealing and functional across various dimensions. The design considers usability to ensure that players can interact with the game easily, regardless of the board size.

By incorporating the `setSize` action and leveraging XState's FSM capabilities, the Tic-Tac-Toe game achieves a robust, maintainable, and adaptable design. This structured approach provides a solid foundation for future enhancements or additional features, ensuring a customizable and engaging game experience.
