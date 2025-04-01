import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';

export default function App() {
  const[nomeProduto,setNomeProduto]=useState("")
  const[precoProduto,setPrecoProduto]=useState()

  return (
    <View style={styles.container}>
      <Text>Cadastro</Text>
      <TextInput 
        placeholder='Digite o nome do produto'
        style={styles.input}
        value={nomeProduto}
        onChangeText={(value)=>setNomeProduto(value)}
      />
      <TextInput 
        placeholder='Digite o preço do produto'
        style={styles.input}
        keyboardType='numeric'
        value={precoProduto}
        onChangeText={(value)=>setPrecoProduto(value)}
      />
      <TouchableOpacity style={styles.btn}>
        <Text style={{color:"white"}}>CADASTRAR</Text>
      </TouchableOpacity>
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
  input:{
    borderWidth:1,
    height:50,
    width:300,
    borderRadius:15,
    marginTop:10
  },
  btn:{
    backgroundColor:"blue",
    borderWidth:1,
    height:50,
    width:300,
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    marginTop:10
  }
});
