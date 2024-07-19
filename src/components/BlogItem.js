import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons

const BlogItem = ({ item , title }) => {
  const navigation = useNavigation();

  const navigateToChat = () => {
    navigation.navigate('ChatRoom', { item });
  };

  const navigateToCommunityChat = () => {
    navigation.navigate('CommunityChat', { item , title });
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  return (
    <View style={[styles.container, styles.glassEffect]}>
      {/* Left Section */}
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={navigateToChat} style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{getInitials(item.username)}</Text>
        </TouchableOpacity>
      </View>

      {/* Right Section */}
      <View style={styles.rightContainer}>
        {/* Blog Header */}
        <View style={styles.header}>
          <Text style={styles.author}>{item.username}</Text>
          <Text style={styles.date}>{new Date(item.createdAt.seconds * 1000).toLocaleString()}</Text>
        </View>

        {/* Blog Content */}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.contentText}>{item.content}</Text>

        {/* Open Community Chat */}
        <TouchableOpacity onPress={navigateToCommunityChat} style={styles.communityChatButton}>
          <Ionicons name="people-outline" size={20} color="#007AFF" style={styles.communityChatIcon} />
          <Text style={styles.communityChatText}>Open Community Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 10,
  },
  glassEffect: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  leftContainer: {
    marginRight: 15,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e53935',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  rightContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  contentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  communityChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  communityChatIcon: {
    marginRight: 8,
  },
  communityChatText: {
    color: '#007AFF',
    fontSize: 14,
  },
});

export default BlogItem;
