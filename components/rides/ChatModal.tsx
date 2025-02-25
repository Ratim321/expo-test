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
};

export default function ChatModal({ visible, onClose, ride }: ChatModalProps) {
  const [message, setMessage] = useState('');

  if (!ride) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Group Chat</Text>
              <Text style={styles.chatRideInfo}>
                {ride.from} → {ride.to}
              </Text>
              <Text style={styles.chatDateTime}>
                {format(ride.date, 'MMM d, h:mm a')}
              </Text>
            </View>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#64748b" />
            </Pressable>
          </View>

          <ScrollView style={styles.chatMessages}>
            <View style={styles.messageContainer}>
              <Image source={{ uri: ride.driver.avatar }} style={styles.messageAvatar} />
              <View style={styles.messageContent}>
                <Text style={styles.messageSender}>{ride.driver.name}</Text>
                <Text style={styles.messageText}>Hello everyone! I'll be at the pickup point 5 minutes early.</Text>
                <Text style={styles.messageTime}>2:30 PM</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.chatInputContainer}>
            <TextInput
              style={styles.chatInput}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              multiline
              placeholderTextColor="#94a3b8"
            />
            <Pressable
              style={[styles.sendButton, !message && styles.sendButtonDisabled]}
              disabled={!message}
              onPress={() => {
                // Send message logic here
                setMessage('');
              }}>
              <Text style={[styles.sendButtonText, !message && styles.sendButtonTextDisabled]}>
                Send
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  chatRideInfo: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 2,
  },
  chatDateTime: {
    fontSize: 14,
    color: '#64748b',
  },
  closeButton: {
    padding: 8,
  },
  chatMessages: {
    flex: 1,
    marginBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  messageAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  messageContent: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    borderTopLeftRadius: 4,
  },
  messageSender: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 12,
    color: '#64748b',
    alignSelf: 'flex-end',
  },
  chatInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    maxHeight: 100,
    color: '#1e293b',
  },
  sendButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#e2e8f0',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  sendButtonTextDisabled: {
    color: '#94a3b8',
  },
});