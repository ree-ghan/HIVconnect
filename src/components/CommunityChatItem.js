import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CommunityChatItem = ({ item, currentUser }) => {
  const navigation = useNavigation();

  const navigateToChat = () => {
    navigation.navigate('ChatRoom', { item });
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const isCurrentUser = currentUser && item.userId === currentUser.uid;

  return (
    <TouchableOpacity onPress={navigateToChat} style={[styles.container, isCurrentUser ? styles.currentUser : styles.otherUser]}>
      {/* Left Section - Avatar */}
      <View style={[styles.avatarContainer, styles.leftContainer, { backgroundColor: isCurrentUser ? '#e53935' : '#8C92AC' }]}>
        <Text style={styles.avatarText}>{getInitials(item.username)}</Text>
      </View>

      {/* Right Section - Chat Content */}
      <View style={styles.rightContainer}>
        {/* Chat Header - Author and Date */}
        <View style={styles.header}>
          <Text style={styles.author}>{item.username}</Text>
          <Text style={styles.date}>{new Date(item.createdAt?.toDate()).toLocaleDateString()}</Text>
        </View>

        {/* Chat Content - Message Text */}
        <Text style={styles.contentText}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  currentUser: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 204, 204, 0.9)',
    borderBottomRightRadius: 0,
  },
  otherUser: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(240, 240, 240, 0.9)',
    borderBottomLeftRadius: 0,
  },
  leftContainer: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e53935',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  contentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default CommunityChatItem;
