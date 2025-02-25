import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, Search } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

import RideCard from '../../components/rides/RideCard';
import FilterModal from '../../components/rides/FilterModal';
import ChatModal from '../../components/rides/ChatModal';

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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AvailableRides() {
  const [rides] = useState<Ride[]>(sampleRides);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [filters, setFilters] = useState({
    timeRange: '',
    vehicleType: '' as VehicleType | '',
    femaleOnly: false,
  });

  const searchScale = useSharedValue(1);

  const searchAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchScale.value }],
  }));

  const handleSearchPress = () => {
    searchScale.value = withSpring(0.95);
    setTimeout(() => {
      searchScale.value = withSpring(1);
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Available Rides</Text>
          <Pressable
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}>
            <Filter size={24} color="#6366f1" />
          </Pressable>
        </View>
        <Text style={styles.subtitle}>Find a ride that matches your schedule</Text>

        <AnimatedPressable
          style={[styles.searchContainer, searchAnimatedStyle]}
          onPress={handleSearchPress}>
          <Search size={20} color="#64748b" />
          <Text style={styles.searchPlaceholder}>Search destinations...</Text>
        </AnimatedPressable>
      </View>

      <ScrollView style={styles.rideList} showsVerticalScrollIndicator={false}>
        {rides.map((ride) => (
          <RideCard
            key={ride.id}
            {...ride}
            onChatPress={() => {
              setSelectedRide(ride);
              setChatModalVisible(true);
            }}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#94a3b8',
  },
  rideList: {
    padding: 20,
  },
});