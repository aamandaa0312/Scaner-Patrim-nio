import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {View,Text,StyleSheet,TouchableOpacity,TextInput,ImageBackground,Alert} from "react-native";

export default function TempScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const handleCadastro = async () => {
    if (!nome || !responsavel) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://10.111.9.93:3000/cadastrar_setores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, responsavel }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Sucesso", "Cadastro realizado!");
      } else {
        Alert.alert("Erro", data.erro || "Erro ao cadastrar.");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha na comunicação com o servidor.");
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')} // use o mesmo fundo tecnológico
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Cadastro de Setores</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do setor"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Responsável pelo setor"
            placeholderTextColor="#999"
            value={responsavel}
            onChangeText={setResponsavel}
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigationBox}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Lancamento")}
          >
            <Text style={styles.secondaryButtonText}>Lançamento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("VisualizacaoPatrimonio")}
          >
            <Text style={styles.secondaryButtonText}>Visualizar Patrimônio</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  box: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    marginBottom: 30,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  primaryButton: {
    backgroundColor: '#03484c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  navigationBox: {
    width: '100%',
    gap: 15,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#03484c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#03484c',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
