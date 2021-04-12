import { StatusBar } from 'expo-status-bar';
import React, {useState, TouchableWithoutFeedback} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const ROWS = 50;
  const COLUMNS = 50;

  const[grid, setGrid] = useState(Array.from({length: ROWS}).map(() => Array.from({length: COLUMNS}).fill(0)));
  const onpress = () => {};
  return (
    <TouchableWithoutFeedback onPress={onpress}>
    <View style={styles.container}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLUMNS}, 20px)`
      }}>
        {grid.map((rows, index) => 
            rows.map((columns, colIndex) => <div key = {`${index}_${colIndex}`} 
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[index][colIndex] ? 'blue': undefined,
                border: 'solid 1px black'
            }}></div>))}
      </div>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    </TouchableWithoutFeedback>
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
