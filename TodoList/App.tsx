import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const [input, setInput] = useState<string>('')
  const { state, handleAdd, handleToggle } = useTodos()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add a new task"
        />
        <Button title='Add' onPress={() => {handleAdd(input); setInput('');}} />
      </View>
      <View>
        <FlatList
          data={state}
          renderItem={({ item }) =>
            <View style={styles.singleTaskContainer} onTouchEnd={() => { handleToggle(item.id); }}>
              <Text style={item.done ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 24 } : { fontSize: 24 }} >{item.text}</Text>
            </View>}
          keyExtractor={item => item.id.toString() }
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    paddingTop: 48,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  singleTaskContainer: {
    flex: 1,
    margin: 8,
    padding: 8,
  },
});
