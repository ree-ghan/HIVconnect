import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import BlogCard from "../components/BlogCard";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FAB } from "react-native-paper";
import { useUser } from "../../UserContext";
import { db } from "../firebase/firebaseConfig";
import BlogList from "../components/BlogList";



const BlogListScreen = ({ route,navigation }) => {
  const { user } = useUser(); // authenticated user
  const ScrollViewRef = useRef(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    console.log("Current user:", user);
    console.log("item:", route.params?.item);

    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const allBlogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(allBlogs);
      console.log("Blogs:", allBlogs);
    });

    return () => unsub();
  }, [user, route.params?.item]);
  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        <BlogList
          ScrollViewRef={ScrollViewRef}
          blogs={blogs}
          currentUser={user}
        />
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("BlogCreate")}
        color="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  listContent: {
    paddingBottom: 80,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#e53935",
  },
});

export default BlogListScreen;
