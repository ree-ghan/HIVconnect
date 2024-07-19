import React from 'react';
import { ScrollView } from 'react-native';
import BlogItem from './BlogItem';

const BlogList = ({ blogs, currentUser, ScrollViewRef }) => {
  // Sort blogs by createdAt in descending order
  const sortedBlogs = blogs.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  return (
    <ScrollView 
      ref={ScrollViewRef}
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{ paddingTop: 10 }}>
      {sortedBlogs.map((blog, index) => (
        <BlogItem item={blog} key={index} currentUser={currentUser} title={blog.title} />
      ))}
    </ScrollView>
  );
};

export default BlogList;
