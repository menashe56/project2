import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Modal, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, {useState} from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';


export default function App() {

  const [data, setData] = useState([]);
  const [ModalOpen,setModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');


  const handlePrintData = () => {
    // Fetch data from your server's API endpoint
    fetch('http://10.0.0.14:3000/api/fetch')
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          // Show an alert if no student is found
          Alert.alert('There is no data.');
        } else {
          console.log('Data received:', data);
          setData(data); // Store the fetched data in the component's state
          setModalOpen(true)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const AddStudent = () => {
    const dataToInsert = { Roll, Name };
  
    Axios.post('http://10.0.0.14:3000/api/insert', { data: dataToInsert })
      .then((response) => {
        console.log('Server response status:', response.status);
        return response.data;
      })
      .then((data) => {
        console.log('Data inserted successfully:', data);
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
      });
  };

  
  const handleInsertData = async () => {
    try {
      const data = { name, age, email, dob };
      await axios.post('http://10.0.0.14:3000/api/insert', data);
      Alert.alert('Data inserted successfully');
      console.log('Data inserted successfully');
      setName('')
      setEmail('')
      setAge('')
      setDob('')
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };


  return (
    <View style={{marginTop:80}}>
      <Button title='Print data' onPress={handlePrintData}/>
      <View style={{marginTop:40}}>
        <TextInput placeholder='name' style={styles.input} onChangeText={(text) => setName(text)} value={name}/>
        <TextInput placeholder='email' style={styles.input} onChangeText={(text) => setEmail(text)} value={email}/>
        <TextInput placeholder='age' style={styles.input} onChangeText={(text) => setAge(text)} value={age}/>
        <TextInput placeholder='date of birdth' style={styles.input} onChangeText={(text) => setDob(text)} value={dob}/>
      <Button title='Add Student' onPress={handleInsertData}/>
      </View>
      <Modal visible={ModalOpen}  animationType='slide'>
      <MaterialIcons name='close' size={45} onPress={() => setModalOpen(false)}/>
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
            <Text style={{left:-80, fontSize: 24, fontWeight:'bold'}}>Data from Database:</Text>
      {data.map((item, index) => (
      <View key={index}>
        <Text style={{fontSize:20, fontWeight:'bold'}}>Student Number {index+1}:</Text>
        <Text>id: {item.id}</Text>
        <Text>name: {item.name}</Text>
        <Text>email: {item.email}</Text>
        <Text>age: {item.age}</Text>
        <Text style={{marginBottom:10}}>date of birth: {item.dob}</Text>
      </View>
    ))}
    </View>
    </ScrollView>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  scroll : {
    height: "100%"
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    textAlign: 'center',
    marginHorizontal: '20',
    marginLeft: '20%',
    marginBottom: 10
  },
});
