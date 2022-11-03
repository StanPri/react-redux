import { Provider } from 'react-redux';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
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

export default function App() {

  const [users, setUsers] = React.useState([]);

const getUsers = async () => {
  await axios.get('https://randomuser.me/api/')
  .then(({data}) => {

    const formattedUser = JSON.stringify(data.results, null, 2);
     console.log(formattedUser)

    
    setUsers(data.results)
  })
  .catch(error => {console.error(error)})
}

  React.useEffect(() => {
    getUsers();
  }, [])

  const [incrementer, setIncrementer] = React.useState(0)

  const handleOnPress = () => {
    getUsers()
  }

  return (
    <Provider store={store}>

      <View style={styles.container}>
        {/* <Text>{JSON.stringify(users, null, 2)}</Text> */}
        {users.map((user) => (
          <View key={user.login.uuid}>
            <Text>First name: {user.name.first}</Text>
            <Text>Last name: {user.name.last}</Text>
            <Image
              style={{ width: 50, height: 50}}
              source={{
                uri: user.picture.thumbnail,
              }}
            />
          </View>
        ))
        }
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
