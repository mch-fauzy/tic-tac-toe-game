import * as React from 'react';
import { ChakraProvider, Box, Button, Text, Center, Flex} from '@chakra-ui/react';

function calculateStatus(winner, squares, nextValue) {
  return winner
        ? `Winner: ${winner}` // is there a winner
        : squares.every(Boolean) // check board
        ? `Draw` // if board filled without winner
        : `Next player: ${nextValue}` // if board not filled 
}

function calculateNextValue(squares) {
  const nextPlayer = squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
  return nextPlayer;
}

function calculateWinner(squares) {
  // win condition
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getWinningLine(squares) {
  // win condition
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return line;
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [nextValue, setNextValue] = React.useState('X');
  const [status, setStatus] = React.useState('');

  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[square] = nextValue;

    const winner = calculateWinner(newSquares);
    const status = calculateStatus(winner, newSquares, nextValue);

    setSquares(newSquares);
    setNextValue(calculateNextValue(newSquares));
    setStatus(status);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue('X');
    setStatus('');
  }

  function renderSquare(i) {
    const winningLine = getWinningLine(squares); // get the winning line
    const isWinningLine = winningLine && winningLine.includes(i); // check the winner and it winning line
    return (
      <Button
        className="square"
        colorScheme={isWinningLine ? 'red' : 'teal'}
        onClick={() => selectSquare(i)}
        w="100px"
        h="100px"
        fontSize="xl"
      >
        {squares[i]}
      </Button>
    );
  }
   

  return (
    <Center h="100vh">
      <Box p={50} bg="white" rounded="md" boxShadow="md" textAlign="center">
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={6} color="teal">
            {status}
          </Text>
        </Box>
        <Flex direction="column" align="center">
          <Box mb={8}>
            <Flex>
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </Flex>
            <Flex>
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </Flex>
            <Flex>
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </Flex>
          </Box>
          <Button size="md" colorScheme="red" onClick={restart}>
            Restart
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}


function Game() {
  return (
      <Board />
  );
}

function App() {
  return (
    <ChakraProvider>
      <Game />
    </ChakraProvider>
  );
}

export default App;