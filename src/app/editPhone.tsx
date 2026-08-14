import api from '@/utils/crud-api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function EditPhone() {
    const { id, name, sect, tel } = useLocalSearchParams<{ id: string; name: string; sect: string; tel: string }>();
    const [newName, setNewName] = useState(name || '');
    const [newSect, setNewSect] = useState(sect || '');
    const [newTel, setNewTel] = useState(tel || '');
    const router = useRouter();

    const updatePhone = async () => {
        if (!newName.trim() || !newSect.trim() || !newTel.trim()) {
            Alert.alert("SYS_WARNING", "PLEASE FILL IN ALL ATTRIBUTES!");
            return;
        }
        try {
            await api.put('phones/' + id, {
                name: newName.trim(),
                sect: newSect.trim(),
                tel: newTel.trim(),
            });
            if (router.canGoBack()) router.back();
            else router.replace('/');
        } catch(err: any) {
            Alert.alert("SYS_ERROR", err.message || "COULD NOT UPDATE STATS!");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.frameBox}>
                <Text style={styles.title}>[ ★ UPGRADE STATS ★ ]</Text>

                {/* Name */}
                <Text style={styles.label}>{'>'} PLAYER NAME:</Text>
                <TextInput 
                    style={styles.input}
                    value={newName}
                    onChangeText={setNewName}
                    placeholder='ENTER NAME...'
                    placeholderTextColor="#555"
                />

                {/* Section Radio */}
                <Text style={styles.label}>{'>'} GUILD / SECTION:</Text>
                <RadioButton.Group value={newSect} onValueChange={setNewSect}>
                    <View style={styles.radioRow}>
                        <View style={styles.radioItem}>
                            <RadioButton value="CED" color="#FFE600" uncheckedColor="#555" />
                            <Text style={styles.radioText}>CED</Text>
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton value="TCT" color="#FFE600" uncheckedColor="#555" />
                            <Text style={styles.radioText}>TCT</Text>
                        </View>
                    </View>
                </RadioButton.Group>

                {/* Tel */}
                <Text style={styles.label}>{'>'} COMMS NO. (TEL):</Text>
                <TextInput 
                    style={styles.input}
                    value={newTel}
                    onChangeText={setNewTel}
                    placeholder='ENTER TEL...'
                    placeholderTextColor="#555"
                    keyboardType="phone-pad"
                />

                {/* Controls */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity 
                        onPress={() => router.canGoBack() ? router.back() : router.replace('/')} 
                        style={styles.btnCancel}
                    >
                        <Text style={styles.btnText}>{'< ESC'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={updatePhone} style={styles.btnUpdate}>
                        <Text style={[styles.btnText, { color: '#000' }]}>{'APPLY >'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0E15',
        justifyContent: 'center',
        padding: 15,
    },
    frameBox: {
        backgroundColor: '#181824',
        borderWidth: 4,
        borderColor: '#FFE600',
        borderBottomWidth: 8,
        borderRightWidth: 8,
        padding: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '900',
        color: '#00FFFF',
        marginBottom: 20,
        letterSpacing: 1.5,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    label: {
        color: '#FFE600',
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 10,
        marginBottom: 5,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    input: {
        backgroundColor: '#000000',
        borderWidth: 2,
        borderColor: '#3D3D5C',
        color: '#FFE600',
        padding: 10,
        fontSize: 14,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    radioRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginVertical: 4,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    btnCancel: {
        flex: 1,
        backgroundColor: '#555',
        borderWidth: 2,
        borderColor: '#000',
        borderBottomWidth: 4,
        borderRightWidth: 4,
        paddingVertical: 12,
        marginRight: 8,
        alignItems: 'center',
    },
    btnUpdate: {
        flex: 1,
        backgroundColor: '#FFE600',
        borderWidth: 2,
        borderColor: '#000',
        borderBottomWidth: 4,
        borderRightWidth: 4,
        paddingVertical: 12,
        marginLeft: 8,
        alignItems: 'center',
    },
    btnText: {
        color: '#FFF',
        fontWeight: '900',
        fontSize: 14,
        letterSpacing: 1.5,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
});