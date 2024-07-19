import React from 'react';
import { ScrollView } from 'react-native';
import CommunityChatItem from './CommunityChatItem';

const CommunityChatList = ({ allCommunityChats, currentUser, ScrollViewRef }) => {
  return (
    <ScrollView 
      ref={ScrollViewRef}
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{ paddingTop: 10 }}>
      {allCommunityChats.map((allCommunityChat, index) => (
        <CommunityChatItem item={allCommunityChat} key={index} currentUser={currentUser}/>
      ))}
    </ScrollView>
  );
};

export default CommunityChatList;
