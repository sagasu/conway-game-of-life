import { StatusBar } from 'expo-status-bar';
import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import produce from 'immer';


export default function App() {
  const ROWS = 50;
  const COLUMNS = 50;

  const[grid, setGrid] = useState(Array.from({length: ROWS}).map(() => Array.from({length: COLUMNS}).fill(0)));
  const [running, setRunning] = useState(false);

  const runSimulation = useCallback(() => {
    if(!running) return;

    setTimeout(runSimulation, 1000); //really nice recursive pattern, that's why it is wrapped in useCallback hook.
  }, []);

  return (

    <View style={styles.container}>
      <button onClick={() => {
        setRunning(!running);
      }}>{running ? 'stop' : 'start'}</button>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLUMNS}, 20px)`
      }}>
        {grid.map((rows, index) => 
            rows.map((columns, colIndex) => <TouchableWithoutFeedback 
              key = {`${index}_${colIndex}_twf`}
              onPress={() => {
              //using immer to manipulate array using useState hook.
              const newGrid = produce(grid, gridCopy => {
                gridCopy[index][colIndex] = gridCopy[index][colIndex] ? 0: 1;
              });
              
              setGrid(newGrid);
            }}><View><div 
              key = {`${index}_${colIndex}`} 
              
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[index][colIndex] ? 'blue': undefined,
                border: 'solid 1px black'
            }}></div></View></TouchableWithoutFeedback>))}
      </div>
      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
