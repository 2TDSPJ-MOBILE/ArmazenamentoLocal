import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function App() {
  const [nomeProduto, setNomeProduto] = useState("")
  const [precoProduto, setPrecoProduto] = useState()
  const [listaProdutos,setListaProdutos]=useState([])

  async function salvar() {
    let produtos = []

    if(await AsyncStorage.getItem("PRODUTOS")!=null){
      produtos = JSON.parse(await AsyncStorage.getItem("PRODUTOS"))
    }

    produtos.push({nome:nomeProduto,preco:precoProduto})

    //Salvado os dados no Async Storage
    await AsyncStorage.setItem("PRODUTOS",JSON.stringify(produtos))

    alert("PRODUTO SALVO")

    buscarDados()
  }

  async function buscarDados() {
    const p = await AsyncStorage.getItem("PRODUTOS")
    setListaProdutos(JSON.parse(p))
  }

  return (
    <View style={styles.container}>
      <Text>Cadastro</Text>
      <TextInput
        placeholder='Digite o nome do produto'
        style={styles.input}
        value={nomeProduto}
        onChangeText={(value) => setNomeProduto(value)}
      />
      <TextInputMask
        placeholder='Digite o preço do produto'
        style={styles.input}
        type='money'
        value={precoProduto}
        onChangeText={(value) => setPrecoProduto(value)}
      />
      <TouchableOpacity style={styles.btn} onPress={salvar}>
        <Text style={{ color: "white" }}>CADASTRAR</Text>
      </TouchableOpacity>

      {/* {Botão para buscarDados} */}
      <TouchableOpacity style={styles.btn} onPress={buscarDados}>
        <Text style={{color:"white"}}>BUSCAR DADOS</Text>
      </TouchableOpacity>

      <FlatList 
        data={listaProdutos}
        renderItem={({item,index})=>{
          return(
            <View style={styles.listFlat}>
              <View> 
                <Text>Nome:{item.nome} - Preco:{item.preco}</Text>
              </View>
            </View>

          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop:30
  },
  input: {
    borderWidth: 1,
    height: 50,
    width: 300,
    borderRadius: 15,
    marginTop: 10
  },
  btn: {
    backgroundColor: "blue",
    borderWidth: 1,
    height: 50,
    width: 300,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  listFlat:{
    width:300,
    borderWidth:1,
    borderRadius:15,
    height:80,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:3
  }
});
