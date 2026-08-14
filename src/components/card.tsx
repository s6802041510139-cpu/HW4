import { Link } from "expo-router";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../utils/crud-api";

export default function Card(props: any) {

  const executeDelete = async (id: string) => {
    try {
      await api.delete('phones/' + id);
      props.refresh();
    } catch (err) {
      console.log("Delete error:", err);
      Alert.alert("GAME ERROR", "CANNOT DELETE ITEM!");
    }
  };

  const delPhone = (id: string, name: string) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`[SYSTEM ALERT] DELETE PLAYER: "${name}" ?`);
      if (confirmed) executeDelete(id);
    } else {
      Alert.alert(
        "[ ! ] CONFIRM DELETE",
        `DELETE RECORD: "${name}" ?`,
        [
          { text: "CANCEL", style: "cancel" },
          { text: "DELETE", onPress: () => executeDelete(id), style: "destructive" }
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={styles.card}>
      {/* Phone Data Container */}
      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.pixelIcon}>👾</Text>
          <Text style={styles.nameText}>{props.phone.name}</Text>
        </View>
        
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>GUILD: {props.phone.sect}</Text>
        </View>
        <Text style={styles.telText}>☎ TEL: {props.phone.tel}</Text>
      </View>

      {/* 8-bit Action Buttons */}
      <View style={styles.actionGroup}>
        <Link
          href={{
            pathname: "/editPhone",
            params: { 
              id: props.phone.id, 
              name: props.phone.name,
              sect: props.phone.sect,
              tel: props.phone.tel,
            },
          }}            
          push 
          style={styles.btnEdit}
        >
          <Text style={styles.btnEditText}>EDIT</Text>
        </Link>

        <TouchableOpacity 
          onPress={() => delPhone(props.phone.id, props.phone.name)}
          style={styles.btnDelete}
        >
          <Text style={styles.btnDeleteText}>DEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E2E',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 3,
    borderColor: '#3D3D5C',
    borderBottomWidth: 6,
    borderRightWidth: 6,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 15,
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pixelIcon: {
    marginRight: 6,
    fontSize: 14,
  },
  nameText: {
    color: '#00FFFF',
    fontSize: 17,
    fontWeight: '900',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  badgeRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  badge: {
    backgroundColor: '#FF0055',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 11,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  telText: {
    color: '#A0A0B0',
    fontSize: 13,
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  btnEdit: {
    backgroundColor: '#FFE600',
    borderWidth: 2,
    borderColor: '#000',
    borderBottomWidth: 4,
    borderRightWidth: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  btnEditText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  btnDelete: {
    backgroundColor: '#FF0055',
    borderWidth: 2,
    borderColor: '#000',
    borderBottomWidth: 4,
    borderRightWidth: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  btnDeleteText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});