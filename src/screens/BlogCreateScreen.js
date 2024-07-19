import React, { useState, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useUser } from "../../UserContext";
import { db } from "../firebase/firebaseConfig";

const BlogCreateScreen = ({ navigation }) => {
  const { user } = useUser();
  const titleRef = useRef("");
  const contentRef = useRef("");
  const titleInputRef = useRef(null);
  const contentInputRef = useRef(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCreateBlog = async (titleRef, contentRef, titleInputRef, contentInputRef) => {
    let blogTitle = titleRef.current.trim();
    let blogContent = contentRef.current.trim();
    if (!blogTitle || !blogContent) return;

    if (!user || !user.uid) {
      Alert.alert("Error", "User information is missing.");
      return;
    }

    try {
      const blogsRef = collection(db, "blogs");

      titleRef.current = "";
      contentRef.current = "";
      if (titleInputRef.current) titleInputRef.current.clear();
      if (contentInputRef.current) contentInputRef.current.clear();

      const newDoc = await addDoc(blogsRef, {
        username: user.displayName,
        userId: user.uid,
        title: blogTitle,
        createdAt: Timestamp.fromDate(new Date()),
        content: blogContent,
      });

      const CommunityChatRef = collection(newDoc, "communityChat");

      await addDoc(CommunityChatRef, {
        id: newDoc.id,
        userId: user.uid,
        username: user.displayName,
        content: "Welcome, This is an open community chat for Blogs lets talk about Today's topic",
        createdAt: Timestamp.fromDate(new Date()),
      });

      setSnackbarMessage('Blog created successfully!');
      setSnackbarVisible(true);
    } catch (err) {
      setSnackbarMessage(`Error: ${err.message}`);
      setSnackbarVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <TextInput
            label="Title"
            ref={titleInputRef}
            onChangeText={(value) => (titleRef.current = value)}
            mode="outlined"
            style={styles.input}
            autoCapitalize="sentences"
            theme={{ colors: { primary: '#e53935' } }}
          />
          <TextInput
            label="Content"
            ref={contentInputRef}
            onChangeText={(value) => (contentRef.current = value)}
            mode="outlined"
            autoCapitalize="sentences"
            multiline
            numberOfLines={10}
            style={[styles.input, styles.textArea]}
            theme={{ colors: { primary: '#e53935' } }}
          />
          <Button
            mode="contained"
            onPress={() => handleCreateBlog(titleRef, contentRef, titleInputRef, contentInputRef)}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Create Blog
          </Button>
        </View>
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
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
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#e53935',
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: 10,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  snackbar: {
    backgroundColor: '#359106',
  },
});

export default BlogCreateScreen;
