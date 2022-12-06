import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';

function App() {
  const [list, setList] = useState([]);
  const [text, setText] = useState('');
  const [indexNum, setIndexNum] = useState();
  const [refresh, setRefresh] = useState(false);

  let add = () => {
    if (!text) {
      Alert.alert('Validation', 'Enter Some Text...', [
        {
          text: 'Okay',
          onPress: () => {
            console.log('Okay Press');
          },
        },
      ]);
      return;
    }
    if (indexNum && indexNum > -1) {
      list[indexNum] = {
        txt: text,
        time: JSON.stringify(new Date()),
      };
      setList([...list]);
      setIndexNum(null);
      console.log('if');
      ToastAndroid.show('Task Added', 5000);
      setText('');
    } else {
      ToastAndroid.show('Task Added', 5000);
      console.log('else');
      setList([
        ...list,
        {
          txt: text,
          time: JSON.stringify(new Date()),
        },
      ]);
      setText('');
    }
  };
  let edit = i => {
    setIndexNum(i);
    let obj = list[i];
    setText(obj.txt);
  };

  let abc = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
      console.log('Refreshhh');
    }, 3000);
  };

  return (
    <>
      <View>
        <View style={styles.header}>
          <Text style={styles.heading}>Todo App</Text>
        </View>
        <View>
          <View style={{padding: 10}}>
            <Text style={styles.centerText}>Enter Todo</Text>
            <TextInput
              value={text}
              onChangeText={e => setText(e)}
              placeholder="Enter Todo"
              style={styles.inp}
              // editable={false}
              // multiline={true}
              // numberOfLines={4}
              // maxLength={10}
              // keyboardType="numeric"
              // keyboardType="email-address"
              // keyboardType="number-pad"
              // keyboardType="name-phone-pad"
              // secureTextEntry={true}
            />
            <Button onPress={add} title="Add" color="maroon" />
          </View>
        </View>
        <View>
          <ScrollView
            refreshControl={
              <RefreshControl onRefresh={abc} refreshing={refresh} />
            }>
            {list &&
              list.map((e, i) => (
                <TouchableOpacity
                  onPress={() => edit(i)}
                  onLongPress={() => {
                    console.log('long Press ' + e.txt);
                  }}
                  style={{
                    margin: 10,
                    padding: 10,
                    backgroundColor: 'pink',
                    borderRadius: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,

                    elevation: 15,
                  }}
                  key={i}>
                  <Text
                    style={{
                      fontSize: 25,
                      color: 'maroon',
                      borderBottomWidth: 1,
                      borderBottomColor: 'maroon',
                      paddingVertical: 10,
                    }}>
                    {e.txt}
                  </Text>

                  <Text style={{fontSize: 15, color: 'maroon'}}>{e.time}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
          <ActivityIndicator />
        </View>
      </View>
    </>
  );
}
export default App;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'maroon',
    padding: 10,
  },
  heading: {
    fontSize: 25,
    color: 'white',
  },
  inp: {
    padding: 5,
    textAlign: 'center',
    borderBottomWidth: 2,
    margin: 20,
    fontSize: 25,
    backgroundColor: 'pink',
  },
  centerText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  },
});
