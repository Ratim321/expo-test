import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, Search } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { Modal } from 'react-native'; // Ensure this is installed
import { format } from 'date-fns'; // For date formatting

import RideCard from '../../components/rides/RideCard';
import FilterModal from '../../components/rides/FilterModal';
import ChatModal from '../../components/rides/ChatModal';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = Animated.createAnimatedComponent(Text);

type VehicleType = 'car' | 'bike' | 'cng' | 'uber' | 'taxi';

type Ride = {
  id: string;
  driver: {
    name: string;
    avatar: string;
    rating: number;
    badges: string[];
    gender: 'male' | 'female';
    verified: boolean;
  };
  from: string;
  to: string;
  date: Date;
  seats: number;
  price: number;
  vehicleType: VehicleType;
  vehicleNumber?: string;
  femaleOnly: boolean;
  members: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
};

const sampleRides: Ride[] = [
  {
    id: '1',
    driver: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      rating: 4.8,
      badges: ['Hero'],
      gender: 'female',
      verified: true,
    },
    from: 'North Campus',
    to: 'Downtown Library',
    date: new Date(2024, 2, 15, 14, 30),
    seats: 3,
    price: 5,
    vehicleType: 'car',
    vehicleNumber: 'DHK-1234',
    femaleOnly: true,
    members: [
      {
        id: '2',
        name: 'Emily Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      },
    ],
  },
  {
    id: '2',
    driver: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      rating: 4.5,
      badges: ['Reliable'],
      gender: 'male',
      verified: true,
    },
    from: 'Student Housing',
    to: 'Shopping Mall',
    date: new Date(2024, 2, 15, 16, 0),
    seats: 2,
    price: 7,
    vehicleType: 'bike',
    femaleOnly: false,
    members: [],
  },
];

export default function AvailableRides() {
  const [rides, setRides] = useState<Ride[]>(sampleRides);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [filters, setFilters] = useState({
    timeRange: '',
    vehicleType: '' as VehicleType | '',
    femaleOnly: false,
  });

  const searchScale = useSharedValue(1);
  const titleScale = useSharedValue(1);
  const filterButtonScale = useSharedValue(1);
  const joinButtonScale = useSharedValue(1); // For modal buttons

  const searchAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchScale.value }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
  }));

  const filterButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: filterButtonScale.value }],
  }));

  const joinButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: joinButtonScale.value }],
  }));

  const handleSearchPress = () => {
    searchScale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
    setTimeout(() => {
      searchScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    }, 100);
  };

  const handleTitlePress = () => {
    titleScale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
    setTimeout(() => {
      titleScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    }, 100);
  };

  const handleFilterPress = () => {
    filterButtonScale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
    setTimeout(() => {
      filterButtonScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    }, 100);
  };

  const handleJoinPress = () => {
    joinButtonScale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
    setTimeout(() => {
      joinButtonScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    }, 100);
  };

  const handleJoinRide = (ride: Ride) => {
    if (ride.seats > 0) {
      setSelectedRide(ride);
      setJoinModalVisible(true);
    } else {
      alert('No seats available for this ride.');
    }
  };

  const confirmJoin = () => {
    if (selectedRide) {
      const updatedRide = {
        ...selectedRide,
        seats: selectedRide.seats - 1,
        members: [
          ...selectedRide.members,
          { id: 'user123', name: 'You', avatar: 'https://example.com/your-avatar.jpg' }, // Replace with actual user data
        ],
      };
      setRides(rides.map((r) => (r.id === selectedRide.id ? updatedRide : r)));
      setJoinModalVisible(false);
      alert(`You have successfully joined ${selectedRide.driver.name}'s ride!`);
    }
  };

  if (!rides || rides.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No rides available. Please check your connection or filters.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={handleTitlePress}>
            <AnimatedText style={[styles.title, titleAnimatedStyle]}>
              Available Rides
            </AnimatedText>
            <Text style={styles.subtitle}>
              Find a ride that matches your schedule
            </Text>
          </Pressable>
          <AnimatedPressable
            style={[styles.filterButton, filterButtonAnimatedStyle]}
            onPress={() => {
              handleFilterPress();
              setFilterModalVisible(true);
            }}>
            <Filter size={24} color="#3b82f6" />
          </AnimatedPressable>
        </View>

        <AnimatedPressable
          style={[styles.searchContainer, searchAnimatedStyle]}
          onPress={handleSearchPress}>
          <Search size={20} color="#6b7280" />
          <Text style={styles.searchPlaceholder}>Search destinations...</Text>
        </AnimatedPressable>
      </View>

      <ScrollView style={styles.rideList} showsVerticalScrollIndicator={false}>
        {rides.map((ride) => (
          <RideCard
            key={ride.id}
            {...ride}
            onPress={() => handleJoinRide(ride)}
          />
        ))}
      </ScrollView>

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={setFilters}
        currentFilters={filters}
      />

      <ChatModal
        visible={chatModalVisible}
        onClose={() => setChatModalVisible(false)}
        ride={selectedRide}
      />

      <Modal
        visible={joinModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setJoinModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.joinModalContent}>
            <Text style={styles.joinModalTitle}>Join Ride Confirmation</Text>
            {selectedRide && (
              <View style={styles.modalDetails}>
                <Text style={styles.modalDetail}>
                  <Text style={styles.modalLabel}>Driver:</Text> {selectedRide.driver.name}
                </Text>
                <Text style={styles.modalDetail}>
                  <Text style={styles.modalLabel}>Route:</Text> {selectedRide.from} → {selectedRide.to}
                </Text>
                <Text style={styles.modalDetail}>
                  <Text style={styles.modalLabel}>Date/Time:</Text> {format(selectedRide.date, 'MMM d, h:mm a')}
                </Text>
                <Text style={styles.modalDetail}>
                  <Text style={styles.modalLabel}>Price:</Text> ${selectedRide.price} per person
                </Text>
                <Text style={styles.modalDetail}>
                  <Text style={styles.modalLabel}>Seats Left:</Text> {selectedRide.seats}
                </Text>
                {selectedRide.femaleOnly && (
                  <Text style={[styles.modalDetail, { color: '#f43f5e' }]}>
                    <Text style={styles.modalLabel}>Note:</Text> This ride is female-only.
                  </Text>
                )}
              </View>
            )}
            <View style={styles.joinModalButtons}>
              <AnimatedPressable
                style={[styles.confirmButton, joinButtonAnimatedStyle]}
                onPress={() => {
                  handleJoinPress();
                  confirmJoin();
                }}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </AnimatedPressable>
              <AnimatedPressable
                style={[styles.cancelButton, joinButtonAnimatedStyle]}
                onPress={() => {
                  handleJoinPress();
                  setJoinModalVisible(false);
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </AnimatedPressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // Very light gray background
  },
  header: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#3b82f6',
    marginBottom: 8,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(59, 130, 246, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    letterSpacing: 0.3,
    fontWeight: '600',
    opacity: 0.9,
  },
  filterButton: {
    padding: 14,
    backgroundColor: '#eff6ff',
    borderRadius: 18,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#9ca3af',
    letterSpacing: 0.3,
    fontWeight: '500',
  },
  rideList: {
    padding: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for contrast
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinModalContent: {
    backgroundColor: '#ffffff', // White background
    borderRadius: 20, // Rounded corners
    padding: 24, // Generous padding for elegance
    width: '85%', // Slightly wider for a professional look
    maxWidth: 420, // Max width for responsiveness
    shadowColor: '#3b82f6', // Blue shadow for depth
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10, // Increased elevation for a floating effect
  },
  joinModalTitle: {
    fontSize: 24, // Larger, professional title
    fontWeight: '800', // Bold for emphasis
    color: '#1f2937', // Dark gray for professionalism
    marginBottom: 20, // Increased margin for spacing
    textAlign: 'center',
    textShadowColor: 'rgba(59, 130, 246, 0.1)', // Subtle blue shadow
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  modalDetails: {
    marginBottom: 24, // Increased margin for spacing
  },
  modalDetail: {
    fontSize: 16, // Clean, readable size
    color: '#374151', // Soft dark gray for text
    marginBottom: 12, // Consistent spacing
    lineHeight: 24, // Improved readability
  },
  modalLabel: {
    fontWeight: '600', // Bold labels for emphasis
    color: '#3b82f6', // Vibrant blue for labels
    marginRight: 8, // Space between label and value
  },
  joinModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16, // Reduced margin for compactness
  },
  confirmButton: {
    backgroundColor: '#3b82f6', // Vibrant blue for confirm
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14, // Slightly larger radius for elegance
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  confirmButtonText: {
    color: '#ffffff', // White text for contrast
    fontSize: 16,
    fontWeight: '600', // Bold for professionalism
  },
  cancelButton: {
    backgroundColor: '#e5e7eb', // Light gray for cancel
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14, // Consistent radius
    shadowColor: '#6b7280',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cancelButtonText: {
    color: '#1f2937', // Dark gray for readability
    fontSize: 16,
    fontWeight: '600', // Bold for consistency
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
    padding: 20,
  },
});