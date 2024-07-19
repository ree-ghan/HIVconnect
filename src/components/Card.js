import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Card = ({ item }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.urlToImage }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.footer}>
                    <View style={styles.authorContainer}>
                        <Ionicons name="person-circle-outline" size={16} color="#e53935" />
                        <Text style={styles.author}>{item.author}</Text>
                    </View>
                    <Text style={styles.publishedAt}>{new Date(item.publishedAt).toLocaleDateString()}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e6ecf0', // Twitter-like border color
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    image: {
        height: 200,
        width: '100%',
    },
    content: {
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e53935',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    author: {
        fontSize: 15,
        color: '#e53935',
        marginLeft: 5,
    },
    publishedAt: {
        fontSize: 15,
        color: '#999',
    },
});

export default Card;
