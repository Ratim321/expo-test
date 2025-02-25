import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Users, DollarSign } from 'lucide-react-native';

export default function CreateRide() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    // Handle ride creation
    console.log({ from, to, date, time, seats, price });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create a Ride</Text>
          <Text style={styles.subtitle}>Share your journey with fellow students</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <MapPin size={20} color="#6366f1" />
              <TextInput
                style={styles.input}
                placeholder="Pickup location"
                value={from}
                onChangeText={setFrom}
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.inputContainer}>
              <MapPin size={20} color="#6366f1" />
              <TextInput
                style={styles.input}
                placeholder="Destination"
                value={to}
                onChangeText={setTo}
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Clock size={20} color="#6366f1" />
              <TextInput
                style={styles.input}
                placeholder="Date"
                value={date}
                onChangeText={setDate}
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Clock size={20} color="#6366f1" />
              <TextInput
                style={styles.input}
                placeholder="Time"
                value={time}
                onChangeText={setTime}
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Users size={20} color="#6366f1" />
              <TextInput
                style={styles.input}
                placeholder="Available seats"
                value={seats}
                onChangeText={setSeats}
                keyboardType="numeric"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <DollarSign size={20} color="#6366f1" />
              <TextInput
                style={styles.input}
                placeholder="Price per seat"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create Ride</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  form: {
    padding: 20,
    gap: 20,
  },
  inputGroup: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  halfWidth: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});