import { Provider } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';
import Counter from './src/Counter';
import { configureStore, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

import * as React from 'react';


const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})

const getUsers = () => {
  axios.get('https://randomuser.me/api/')
  .then(user => {
    setUser(JSON.stringify(user))
  })
}


export default function App() {

  const [user, setUser] = React.useState();

  React.useEffect(() => {
  }, [])

  const [incrementer, setIncrementer] = React.useState(0)

  const handleOnPress = () => {
    getUsers()
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Incrementer: {user}</Text>
        <Button style={{position: "fixed"}} onPress={handleOnPress} title="Up"/>
      </View>
      {/* <Counter/> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
