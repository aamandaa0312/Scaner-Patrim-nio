import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CameraView, Camera } from "expo-camera";

export default function Lancamento() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [selectedSetor, setSelectedSetor] = useState("");
  const [setores, setSetores] = useState([]);
  const [ni, setNi] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ultimaLocalizacao, setUltimaLocalizacao] = useState("");

  useEffect(() => {
    const fetchSetores = async () => {
      try {
        const response = await fetch("http://10.111.9.93:3000/listar_setores");
        const data = await response.json();
        setSetores(data);
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
      }
    };
    fetchSetores();
  }, []);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setNi(data);
    alert(`QR Code escaneado: ${data}`);
  };

  const handleGravar = async () => {
    if (!ni) {
      alert("Leia o QR code primeiro.");
      return;
    }

    try {
      const response = await fetch("http://10.111.9.93:3000/lancar_patrimonio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero_identificacao: ni,
          descricao,
          setor_id: selectedSetor,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Item registrado com sucesso!");
      } else {
        alert("Erro ao registrar item: " + data.erro);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para acessar a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Permissão para acessar a câmera foi negada.</Text>;
  }

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Lançamento de Item</Text>

        {/* Scanner */}
        <View style={styles.scannerContainer}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <View style={styles.scannerFrame} />
          </CameraView>
          {scanned && (
            <Text style={styles.scanAgain} onPress={() => setScanned(false)}>
              Toque para escanear novamente
            </Text>
          )}
        </View>

        {/* Campos */}
        <Text style={styles.label}>Setor</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedSetor}
            onValueChange={(itemValue) => setSelectedSetor(itemValue)}
            style={styles.picker}
            dropdownIconColor="#03484c"
          >
            <Picker.Item label="Escolha um setor" value="" />
            {setores.map((setor) => (
              <Picker.Item key={setor.id} label={setor.nome} value={setor.id} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição do item"
          placeholderTextColor="#888"
        />

        {ultimaLocalizacao && (
          <>
            <Text style={styles.label}>Última Localização</Text>
            <Text style={styles.readOnly}>{ultimaLocalizacao}</Text>
          </>
        )}

        {/* Botão */}
        <TouchableOpacity style={styles.button} onPress={handleGravar}>
          <Text style={styles.buttonText}>Lançar</Text>
        </TouchableOpacity>
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
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  scannerContainer: {
    height: 250,
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  scannerFrame: {
    flex: 1,
    margin: 20,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
  },
  scanAgain: {
    marginTop: 10,
    color: "#3b89c9",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  label: {
    color: "#fff",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    borderColor: "#03484c",
    borderWidth: 1,
  },
  picker: {
    height: 45,
    color: "#03484c",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    borderColor: "#03484c",
    borderWidth: 1,
  },
  readOnly: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "#03484c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
