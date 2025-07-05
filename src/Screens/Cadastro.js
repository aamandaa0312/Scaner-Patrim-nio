import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from "react-native";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async () => {
    if (email.trim() === "" || senha.trim() === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await fetch("http://10.111.9.93:3000/cadastrar_usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status);
      }

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Sucesso", "Cadastro realizado!");
        // Aqui pode navegar para outra tela, ex: navigation.navigate('Login');
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
      source={require('../../assets/background.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.formBox}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#666"
            secureTextEntry
            onChangeText={setSenha}
            value={senha}
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(255, 255, 255, 0.55)", // fundo claro semi-transparente para suavizar
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2a3d66", // azul escuro sóbrio
    marginBottom: 30,
    textAlign: "center",
  },
  formBox: {
    width: "85%",
    backgroundColor: "#f7f9fc", // fundo claro para o formulário
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  label: {
    fontSize: 16,
    color: "#444",
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    height: 45,
    borderColor: "#7b8db0", // azul cinza suave
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    height: 50,
    backgroundColor: "#2a3d66", // azul escuro
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
