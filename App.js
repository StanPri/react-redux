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
  const [pageNumber, setPage] = React.useState(0);

const getUsers = async (page = 0) => {
  return await axios.get(`https://randomuser.me/api?page=${page}`)
  .then(({data}) => {

    const formattedUser = JSON.stringify(data.results, null, 2);
     console.log(formattedUser)

    return data.results;
  })
  .catch(error => {console.error(error)})
}

  React.useEffect(() => {
    getUsers().then((result)=> {
      setUsers(result)
    });
  }, [])

  const handleOnPress = () => {
    setPage(pageNumber+1)
    getUsers(pageNumber).then(result => {
      setUsers([...users, ...result])
    })
  }

  return (
    <Provider store={store}>

      <View style={styles.container}>
        {users.map((user) => (
          <View key={user.login.uuid}>
            <Text>First name: {user.name.first}</Text>
            <Text>Last name: {user.name.last}</Text>
            <Image
              style={{ width: 100, height: 100}}
              source={{
                uri: user.picture.large,
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
