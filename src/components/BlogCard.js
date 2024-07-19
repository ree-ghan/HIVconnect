import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Button, Avatar, Text } from 'react-native-paper';

const BlogCard = ({ blog, navigation }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Avatar.Icon icon="account" style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{blog.author}</Text>
          <Text style={styles.subtitle}>{blog.title}</Text>
        </View>
      </View>
      <Card.Content>
        <Paragraph style={styles.content}>{blog.content}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button 
          mode="text" 
          onPress={() => navigation.navigate('BlogDetail', { blog })} 
          labelStyle={styles.readMoreButton}
        >
          Read More
        </Button>
        <Button 
          icon="heart" 
          onPress={() => { /* handle like action */ }} 
          labelStyle={styles.iconButton}
        >
          {blog.likes}
        </Button>
        <Button 
          icon="comment" 
          onPress={() => { /* handle comment action */ }}
          labelStyle={styles.iconButton}
        >
          {blog.comments}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: '#e53935',
    marginRight: 10,
  },
  headerText: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
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
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  readMoreButton: {
    color: '#e53935',
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconButton: {
    color: '#fff',
    fontSize: 14,
  },
});

export default BlogCard;
