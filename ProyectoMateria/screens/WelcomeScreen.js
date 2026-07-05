import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e' }}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Coffee Personal</Text>
                <Text style={styles.subtitle}>Integrated Management System</Text>

                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>

                    <Text style={styles.text}>
                        Don’t have account? <Text style={styles.link}>Sign Up</Text>
                    </Text>
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
        paddingTop: 90,
    },
    title: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: '600',
    },
    subtitle: {
        color: '#9B844E',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 4,
    },
    bottom: {
        position: 'absolute',
        bottom: 100,
        width: '80%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#F2F2F2',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#5D5D5D',
        fontWeight: 'bold',
    },
    text: {
        color: '#AAA',
        marginTop: 15,
        fontSize: 12,
    },
    link: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});