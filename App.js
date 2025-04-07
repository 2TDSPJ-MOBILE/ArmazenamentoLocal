import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList,Keyboard } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function App() {
  const [nomeProduto, setNomeProduto] = useState("")
  const [precoProduto, setPrecoProduto] = useState()
  const [listaProdutos,setListaProdutos]=useState([])
  const [produtoEditado,setProdutoEditado]=useState(null)

  useEffect(()=>{
    buscarDados()
  },[])

  async function salvar() {
    Keyboard.dismiss()
    let produtos = []

    if(await AsyncStorage.getItem("PRODUTOS")!=null){
      produtos = JSON.parse(await AsyncStorage.getItem("PRODUTOS"))
    }

    if(produtoEditado){
      //Atualizar o produto existente
      produtos[produtoEditado.index] = {nome:nomeProduto,preco:precoProduto}
    }else{
      produtos.push({nome:nomeProduto,preco:precoProduto})
    }

    

    //Salvado os dados no Async Storage
    await AsyncStorage.setItem("PRODUTOS",JSON.stringify(produtos))

    alert(produtoEditado?"PRODUTO ATUALIZADO":"PRODUTO CADASTRADO")

    setProdutoEditado(null)
    

    //Limpando formulário
    setNomeProduto('')
    setPrecoProduto('')

    buscarDados()
  }

  async function buscarDados() {
    const p = await AsyncStorage.getItem("PRODUTOS")
    setListaProdutos(JSON.parse(p))
  }

  async function deletarProduto(index){
    //console.log(index) //Verificando o index que será passado
    const tempDados = listaProdutos
    const dados = tempDados.filter((item,ind)=>{
       return ind!==index
    })

    setListaProdutos(dados)//Atualizado o estado listaProdutos
    await AsyncStorage.setItem("PRODUTOS",JSON.stringify(dados)) // Atualiza o banco sem o item excluido
  }

  function editarProduto(index){
    const produto = listaProdutos[index]
    setNomeProduto(produto.nome)
    setPrecoProduto(produto.preco)
    setProdutoEditado({index})//Definindo qual produto a ser editado
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
        <Text style={{ color: "white" }}>{produtoEditado?"ATUALIZAR":"CADASTRAR"}</Text>
      </TouchableOpacity>

      {/* {Botão para buscarDados} */}
      <TouchableOpacity style={styles.btn} onPress={buscarDados}>
        <Text style={{color:"white"}}>BUSCAR DADOS</Text>
      </TouchableOpacity>

      <FlatList 
        data={listaProdutos}
        renderItem={({item,index})=>{
          if(!item || !item.nome ) return null;// Garante que a FlatList só renderize se as propriedades for diferenete nulo.
          return(
            <View style={styles.listFlat}>
              <View> 
                <Text>Nome:{item.nome} - Preco:{item.preco}</Text>
              </View>

              <View style={{flexDirection:"row"}}>
                {/* Botão Excluir */}
                <TouchableOpacity 
                  style={styles.btnExcluir} 
                  onPress={()=>deletarProduto(index)}
                >
                  <Text>Excluir</Text>
                </TouchableOpacity>

                {/* Botão Editar */}
                <TouchableOpacity 
                  style={styles.btnEditar} 
                  onPress={()=>editarProduto(index)}
                >
                  <Text>Editar</Text>
                </TouchableOpacity>
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
  },
  btnExcluir:{
    width:100,
    backgroundColor:"red",
    borderRadius:15,
    alignItems:"center",
    marginTop:7
  },
  btnEditar:{
    width:100,
    backgroundColor:"orange",
    borderRadius:15,
    alignItems:"center",
    marginTop:7,
    marginLeft:5
  }
});
