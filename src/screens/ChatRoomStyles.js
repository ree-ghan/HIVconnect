import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light background with transparency
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Glass effect with transparency
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(221, 221, 221, 0.6)", // Light border with transparency
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  userInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e53935",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  userInitialsText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  messageBubbleSent: {
    alignSelf: "flex-end",
    backgroundColor: 'rgba(255, 204, 204, 0.9)', 
    borderBottomRightRadius: 0,
  },
  messageBubbleReceived: {
    alignSelf: "flex-start",
    backgroundColor: 'rgba(240, 240, 240, 0.9)', 
    borderBottomLeftRadius: 0,
  },
  messageTextSent: {
    color: "#000",
    fontSize: 16,
  },
  messageTextReceived: {
    color: "#000",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Glass effect with transparency
    borderTopWidth: 1,
    borderTopColor: "rgba(221, 221, 221, 0.6)", // Light border with transparency
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(221, 221, 221, 0.6)", // Light border with transparency
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slight transparency for input background
  },
  sendButton: {
    backgroundColor: "#e53935",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
