import Card from "@/components/card";
import api from "@/utils/crud-api";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Phone = {
  id: string;
  name: string;
  sect: string;
  tel: string;
};

export default function Index() {
  const [data, setData] = useState<Phone[]>([]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    try {
      const response = await api.get("phones");
      setData(response.data);
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* 8-Bit Arcade Header */}
      <View style={styles.headerBox}>
        <Text style={styles.subTitle}>★ PLAYER DIRECTORY ★</Text>
        <Text style={styles.title}>STUDENT PHONES</Text>
      </View>

      {/* Retro Add Button */}
      <TouchableOpacity 
        onPress={() => router.push('/addPhone')} 
        style={styles.btnAdd}
      >
        <Text style={styles.btnAddText}>[ + NEW RECORD + ]</Text>
      </TouchableOpacity>

      <FlatList 
        data={data}        
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card phone={item} refresh={getData} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>[ NO DATA INSERT COIN ]</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0E15',
    paddingTop: 30,
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 10,
  },
  subTitle: {
    color: '#FFE600',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '900',
    color: '#00FFFF',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    textShadowColor: '#FF0055',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  btnAdd: {
    backgroundColor: '#00FF66',
    borderWidth: 3,
    borderColor: '#000000',
    borderBottomWidth: 5,
    borderRightWidth: 5,
    paddingVertical: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 0,
    alignItems: 'center',
  },
  btnAddText: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1.5,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});