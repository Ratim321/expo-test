import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, LogOut, Star, Clock } from 'lucide-react-native';

export default function Profile() {
  const user = {
    name: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    rating: 4.8,
    ridesGiven: 12,
    ridesJoined: 8,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Profile</Text>
            <Pressable style={styles.iconButton}>
              <Settings size={24} color="#64748b" />
            </Pressable>
          </View>

          <View style={styles.profile}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{user.name}</Text>
            <View style={styles.rating}>
              <Star size={16} color="#eab308" fill="#eab308" />
              <Text style={styles.ratingText}>{user.rating}</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user.ridesGiven}</Text>
              <Text style={styles.statLabel}>Rides Given</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user.ridesJoined}</Text>
              <Text style={styles.statLabel}>Rides Joined</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Rides</Text>
          <View style={styles.rideCard}>
            <View style={styles.rideInfo}>
              <Clock size={20} color="#6366f1" />
              <View>
                <Text style={styles.rideDestination}>Downtown Library → North Campus</Text>
                <Text style={styles.rideTime}>Today, 2:30 PM</Text>
              </View>
            </View>
            <Pressable style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View</Text>
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.logoutButton}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
  },
  iconButton: {
    padding: 8,
  },
  profile: {
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e2e8f0',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  rideCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  rideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rideDestination: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1e293b',
  },
  rideTime: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  viewButton: {
    backgroundColor: '#eff6ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#6366f1',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    marginTop: 12,
    marginHorizontal: 20,
    marginBottom: 32,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
});