import { StatusBar } from 'expo-status-bar';
import React, {useState, useCallback, useRef} from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import produce from 'immer';


export default function App() {
  const ROWS = 50;
  const COLUMNS = 50;

  const operations = [
    [0,1],
    [0,-1],
    [1,-1],
    [-1,1],
    [1,1],
    [-1,-1],
    [1,0],
    [-1,0],
  ];

  const[grid, setGrid] = useState(Array.from({length: ROWS}).map(() => Array.from({length: COLUMNS}).fill(0)));
  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if(!runningRef.current) return;

    setGrid((g) => {
      return produce(g, gridCopy => {
        for(let i = 0; i < ROWS; i++){
          for(let k = 0; k < COLUMNS; k++){

            let neighbors = 0;
            operations.forEach(([x,y]) => {
              const newI = i + x;
              const newK = k + y;
              if(newI >= 0 && newI < ROWS && newK >= 0 && newK < COLUMNS){
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3){
              gridCopy[i][k] = 0;
            }else if(g[i][k] === 0 && neighbors === 3){
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    
    setTimeout(runSimulation, 1000); //really nice recursive pattern, that's why it is wrapped in useCallback hook.
  }, []);

  return (

    <View style={styles.container}>
      <button onClick={() => {
        setRunning(!running);
        if(!running){
          runningRef.current = true;
          runSimulation();
        }
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
