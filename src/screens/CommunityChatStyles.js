import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Grey background color
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff", // White background
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    elevation: 2, // Elevate header slightly for shadow effect (Android)
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Dark text color
    marginLeft: 10,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  messageBubbleSent: {
    alignSelf: "flex-end",
    backgroundColor: "#e5e5ea", // Light grey for sent messages
  },
  messageBubbleReceived: {
    alignSelf: "flex-start",
    backgroundColor: "#007aff", // Blue for received messages
  },
  messageTextSent: {
    color: "#000", // Black text for sent messages
  },
  messageTextReceived: {
    color: "#fff", // White text for received messages
  },
  timeText: {
    fontSize: 12,
    color: "#888", // Grey for message timestamp
    marginLeft: 8,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff", // White background for input container
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    elevation: 3, // Elevate input container for shadow effect (Android)
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#e53935", // Red send button
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Elevate send button for shadow effect (Android)
  },
  sendButtonText: {
    color: "#fff", // White text for send button
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
