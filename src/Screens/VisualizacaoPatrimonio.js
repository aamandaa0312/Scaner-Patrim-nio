import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function VisualizacaoPatrimonio({ navigation }) {
  const [patrimonios, setPatrimonios] = useState([]);
  const [setorFiltro, setSetorFiltro] = useState("");
  const [setores, setSetores] = useState([]);

  useEffect(() => {
    const fetchSetores = async () => {
      try {
        const response = await fetch("http://10.111.9.93:3000/listar_setores");
        const data = await response.json();

        if (Array.isArray(data)) {
          setSetores(data);
        } else {
          console.error("Erro: Dados recebidos não são um array", data);
          setSetores([]);
        }
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
        setSetores([]);
      }
    };

    fetchSetores();
  }, []);

  useEffect(() => {
    const fetchPatrimonios = async () => {
      try {
        let url = `http://10.111.9.93:3000/listar_patrimonios`;
        if (setorFiltro) {
          url += `?setor_id=${setorFiltro}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data)) {
          setPatrimonios(data);
        } else {
          console.error("Erro: Dados recebidos não são um array", data);
          setPatrimonios([]);
        }
      } catch (error) {
        console.error("Erro ao buscar patrimônios:", error);
        setPatrimonios([]);
      }
    };

    fetchPatrimonios();
  }, [setorFiltro]);

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Visualização de Patrimônio</Text>

        {/* Picker de Setores */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={setorFiltro}
            onValueChange={(itemValue) => setSetorFiltro(itemValue)}
            style={styles.picker}
            dropdownIconColor="#03484c"
          >
            <Picker.Item label="Todos os Setores" value="" />
            {setores.map((setor) => (
              <Picker.Item key={setor.id} label={setor.nome} value={setor.id} />
            ))}
          </Picker>
        </View>

        {/* Lista de Patrimônios */}
        <FlatList
          data={patrimonios}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("DetalhesPatrimonio", { item })}
            >
              <Text style={styles.cardTitle}>{item.descricao}</Text>
              <Text style={styles.cardSubtitle}>Setor: {item.setor}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum patrimônio encontrado.</Text>
          }
        />
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
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#03484c",
    marginBottom: 20,
  },
  picker: {
    height: 45,
    color: "#03484c",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E1E1E",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 15,
    color: "#555",
  },
  emptyText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});
