import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Card, Paragraph, TextInput, Button, Avatar } from 'react-native-paper';

const BlogDetailScreen = ({ route }) => {
  const { blog } = route.params;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Avatar.Icon icon="account" style={styles.avatar} />
            <View style={styles.headerText}>
              <Text style={styles.title}>{blog.title}</Text>
              <Text style={styles.subtitle}>by {blog.author}</Text>
            </View>
          </View>
          <Card.Content>
            <Paragraph style={styles.content}>{blog.content}</Paragraph>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button icon="heart" labelStyle={styles.iconButton} onPress={() => { /* handle like action */ }}>
              {blog.likes}
            </Button>
          </Card.Actions>
        </Card>
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comments</Text>
          {/* Dummy comments */}
          <Card style={[styles.commentCard, styles.card]}>
            <View style={styles.commentHeader}>
              <Avatar.Icon icon="account" style={styles.avatar} />
              <View style={styles.headerText}>
                <Text style={styles.commentAuthor}>Jane Doe</Text>
                <Text style={styles.commentTime}>2 hours ago</Text>
              </View>
            </View>
            <Card.Content>
              <Paragraph style={styles.commentText}>This is very inspiring!</Paragraph>
            </Card.Content>
          </Card>
          {/* Add new comment */}
          <TextInput
            label="Add a comment"
            multiline
            numberOfLines={4}
            mode="outlined"
            style={styles.commentInput}
            theme={{ colors: { primary: '#e53935', underlineColor: 'transparent' } }}
          />
          <Button mode="contained" onPress={() => { /* handle add comment */ }} style={styles.postButton} labelStyle={styles.postButtonLabel}>
            Post Comment
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#fff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    backgroundColor: '#e53935',
  },
  headerText: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  content: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  iconButton: {
    color: '#e53935',
    fontSize: 18,
  },
  commentsSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  commentCard: {
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  commentTime: {
    fontSize: 14,
    color: '#555',
  },
  commentText: {
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  commentInput: {
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#e53935',
    borderWidth: 1,
  },
  postButton: {
    backgroundColor: '#e53935',
    borderRadius: 5,
    marginTop: 10,
  },
  postButtonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BlogDetailScreen;
