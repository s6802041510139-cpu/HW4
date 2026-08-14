import api from '@/utils/crud-api';
import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function AddPhone() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [sect, setSect] = useState('');
    const [tel, setTel] = useState('');
    
    const addPhone = async () => {
        if (!name.trim() || !sect.trim() || !tel.trim()) {
            Alert.alert("SYS_WARNING", "PLEASE FILL IN ALL ATTRIBUTES!");
            return;
        }

        let phone = {
            id: Crypto.randomUUID(),
            name: name.trim(),
            sect: sect.trim(),
            tel: tel.trim(),
        };

        try {
            await api.post('phones', phone);
            setName('');
            setSect('');
            setTel('');
            if (router.canGoBack()) router.back();
            else router.replace('/');
        } catch(err: any) {
            Alert.alert("SYS_ERROR", err.message || "COULD NOT SAVE HERO!");
        }
    };

    const handleCancel = () => {
        if (router.canGoBack()) router.back();
        else router.replace('/');
    };

    return (
        <View style={styles.container}>
            <View style={styles.frameBox}>
                <Text style={styles.title}>[ + SPAWN NEW PHONE + ]</Text>
                
                {/* Input Name */}
                <Text style={styles.label}>{'>'} PLAYER NAME:</Text>
                <TextInput 
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder='ENTER NAME...' 
                    placeholderTextColor="#555"
                />

                {/* Section Radio */}
                <Text style={styles.label}>{'>'} GUILD / SECTION:</Text>
                <RadioButton.Group value={sect} onValueChange={setSect}>
                    <View style={styles.radioRow}>
                        <View style={styles.radioItem}>
                            <RadioButton value="CED" color="#00FFFF" uncheckedColor="#555" />
                            <Text style={styles.radioText}>CED</Text>
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton value="TCT" color="#00FFFF" uncheckedColor="#555" />
                            <Text style={styles.radioText}>TCT</Text>
                        </View>
                    </View>
                </RadioButton.Group>

                {/* Input Tel */}
                <Text style={styles.label}>{'>'} COMMS NO. (TEL):</Text>
                <TextInput 
                    style={styles.input}
                    value={tel}
                    onChangeText={setTel}
                    placeholder='ENTER TEL...' 
                    placeholderTextColor="#555"
                    keyboardType="phone-pad"
                />

                {/* Controls */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={handleCancel} style={styles.btnCancel}>
                        <Text style={styles.btnText}>{'< ESC'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={addPhone} style={styles.btnAdd}>
                        <Text style={[styles.btnText, { color: '#000' }]}>{'SAVE >'}</Text>
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
        borderColor: '#00FFFF',
        borderBottomWidth: 8,
        borderRightWidth: 8,
        padding: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '900',
        color: '#FFE600',
        marginBottom: 20,
        letterSpacing: 1.5,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    label: {
        color: '#00FFFF',
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
        color: '#00FF66',
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
    btnAdd: {
        flex: 1,
        backgroundColor: '#00FF66',
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