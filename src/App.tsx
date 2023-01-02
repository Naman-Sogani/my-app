import React from 'react';
import { Provider } from "react-redux";
import store from "./store/store";
import { ChakraProvider, Container, Heading } from '@chakra-ui/react';
import CanvasBoard from './Components/CanvasBoard';
import ScoreCard from './Components/ScoreCard';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Container maxW="container.lg" centerContent>
          <Heading as="h1" size ="xl">SNAKE GAME</Heading>
          <ScoreCard />
          <CanvasBoard height={600} width={1000} />
        </Container>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
