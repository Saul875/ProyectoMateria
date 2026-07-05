import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e' }}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Coffee Personal</Text>
                <Text style={styles.subtitle}>Integrated Management System</Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Welcome to Coffee</Text>

                    <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#DDD" />
                    <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#DDD" secureTextEntry />
                    <TextInput style={styles.input} placeholder="Rol" placeholderTextColor="#DDD" />

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MenuCliente')}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>

                    <Text style={styles.forgot}>Forgot Password?</Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        alignItems: 'center',
        paddingTop: 80,
    },
    title: {
        color: '#FFF',
        fontSize: 27,
        fontWeight: '600',
    },
    subtitle: {
        color: '#9B844E',
        fontSize: 13,
        fontWeight: 'bold',
    },
    card: {
        marginTop: 100,
        backgroundColor: '#5C5C5C',
        width: '80%',
        borderRadius: 28,
        padding: 25,
    },
    cardTitle: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#AAA',
        color: '#FFF',
        paddingVertical: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingVertical: 13,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#555',
        fontWeight: 'bold',
    },
    forgot: {
        color: '#DDD',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 12,
    },
});