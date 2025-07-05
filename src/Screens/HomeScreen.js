import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://10.111.9.93:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha: password }),
      });

      const data = await response.json();

      if (data.success) {
        navigation.navigate("TempScreen");
      } else {
        alert(data.erro);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor. Verifique sua conexão.");
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')} // Coloque a imagem nesta pasta
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Patrimônio</Text>
          <Text style={styles.subtitle}>Acesse sua conta</Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Cadastro de Setores")}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
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
  loginBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#03484c',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#3b8952',
    fontSize: 15,
    textAlign: 'center',
  },
});
