import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MessageItem = ({ message, currentUser }) => {
  const isCurrentUser = message.userId === currentUser.uid;
  return (
    <View style={[styles.messageContainer, isCurrentUser ? styles.currentUser : styles.otherUser]}>
      <Text style={styles.messageText}>{message.text}</Text>
      {!isCurrentUser && <Text style={styles.senderName}>{message.senderName}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderRadius: 20,
    maxWidth: '75%',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Glass effect with transparency
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Light border to enhance glass effect
  },
  currentUser: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 204, 204, 0.9)', // Light red/pink with transparency
    borderBottomRightRadius: 0,
  },
  otherUser: {
    backgroundColor: 'rgba(240, 240, 240, 0.9)', // Light gray with transparency
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: '#000', // Black text
  },
  senderName: {
    fontSize: 12,
    color: '#555', // Dark gray text
    marginTop: 5,
  },
});

export default MessageItem;
