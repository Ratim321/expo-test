import { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TextInput, ScrollView, Image } from 'react-native';
import { format } from 'date-fns';
import { X } from 'lucide-react-native';

type ChatModalProps = {
  visible: boolean;
  onClose: () => void;
  ride: {
    from: string;
    to: string;
    date: Date;
    driver: {
      name: string;
      avatar: string;
    };
  } | null;
  isDarkMode?: boolean; // New prop to toggle themes
};

export default function ChatModal({ visible, onClose, ride, isDarkMode = true }: ChatModalProps) {
  const [message, setMessage] = useState('');
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  if (!ride) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={themeStyles.modalOverlay}>
        <View style={themeStyles.modalContent}>
          <View style={themeStyles.modalHeader}>
            <View>
              <Text style={themeStyles.modalTitle}>Group Chat</Text>
              <Text style={themeStyles.chatRideInfo}>
                {ride.from} → {ride.to}
              </Text>
              <Text style={themeStyles.chatDateTime}>
                {format(ride.date, 'MMM d, h:mm a')}
              </Text>
            </View>
            <Pressable style={themeStyles.closeButton} onPress={onClose}>
              <X size={24} color={isDarkMode ? '#93c5fd' : '#6b7280'} />
            </Pressable>
          </View>

          <ScrollView style={themeStyles.chatMessages}>
            <View style={themeStyles.messageContainer}>
              <Image source={{ uri: ride.driver.avatar }} style={themeStyles.messageAvatar} />
              <View style={themeStyles.messageContent}>
                <Text style={themeStyles.messageSender}>{ride.driver.name}</Text>
                <Text style={themeStyles.messageText}>Hello everyone! I'll be at the pickup point 5 minutes early.</Text>
                <Text style={themeStyles.messageTime}>2:30 PM</Text>
              </View>
            </View>
          </ScrollView>

          <View style={themeStyles.chatInputContainer}>
            <TextInput
              style={themeStyles.chatInput}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              multiline
              placeholderTextColor={isDarkMode ? '#93c5fd' : '#9ca3af'}
            />
            <Pressable
              style={[themeStyles.sendButton, !message && themeStyles.sendButtonDisabled]}
              disabled={!message}
              onPress={() => {
                setMessage('');
              }}>
              <Text style={[themeStyles.sendButtonText, !message && themeStyles.sendButtonTextDisabled]}>
                Send
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const darkStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    height: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#bfdbfe',
    marginBottom: 6,
  },
  chatRideInfo: {
    fontSize: 16,
    color: '#dbeafe',
    marginBottom: 4,
  },
  chatDateTime: {
    fontSize: 14,
    color: '#93c5fd',
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#334155',
    borderRadius: 12,
  },
  chatMessages: {
    flex: 1,
    marginBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  messageContent: {
    flex: 1,
    backgroundColor: '#334155',
    padding: 14,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageSender: {
    fontSize: 14,
    fontWeight: '600',
    color: '#bfdbfe',
    marginBottom: 6,
  },
  messageText: {
    fontSize: 14,
    color: '#dbeafe',
    marginBottom: 6,
  },
  messageTime: {
    fontSize: 12,
    color: '#93c5fd',
    alignSelf: 'flex-end',
  },
  chatInputContainer: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#1e293b',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#3b82f6',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    maxHeight: 100,
    color: '#dbeafe',
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 12,
    elevation: 2,
  },
  sendButtonDisabled: {
    backgroundColor: '#334155',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  sendButtonTextDisabled: {
    color: '#93c5fd',
  },
});

const lightStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Lighter overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    height: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937', // Dark gray for title
    marginBottom: 6,
  },
  chatRideInfo: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 4,
  },
  chatDateTime: {
    fontSize: 14,
    color: '#6b7280', // Softer gray for datetime
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  chatMessages: {
    flex: 1,
    marginBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3b82f6', // Keep blue for consistency
  },
  messageContent: {
    flex: 1,
    backgroundColor: '#f9fafb', // Very light gray
    padding: 14,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  messageSender: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },
  messageText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
  messageTime: {
    fontSize: 12,
    color: '#6b7280',
    alignSelf: 'flex-end',
  },
  chatInputContainer: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#ffffff',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db', // Light gray border
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    maxHeight: 100,
    color: '#374151',
  },
  sendButton: {
    backgroundColor: '#3b82f6', // Same blue for consistency
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 12,
    elevation: 2,
  },
  sendButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  sendButtonTextDisabled: {
    color: '#9ca3af',
  },
});