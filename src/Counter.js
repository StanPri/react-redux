import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

export default function Counter() {

  const counter = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! {counter}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});