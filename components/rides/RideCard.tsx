import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
  vehicleType: 'car' | 'bike' | 'cng' | 'uber' | 'taxi';
  vehicleNumber?: string;
  femaleOnly: boolean;
  members: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
};

const RideCard = ({ driver, from, to, date, seats, price, vehicleType, femaleOnly, members, onPress }) => {
  const joinButtonScale = useSharedValue(1);
  const joinButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: joinButtonScale.value }],
  }));

  const handleJoinPress = () => {
    joinButtonScale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
    setTimeout(() => {
      joinButtonScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    }, 100);
    onPress();
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.driverInfo}>
          <Image source={{ uri: driver.avatar }} style={styles.avatar} />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <View style={styles.driverRatingBadge}>
              <Text style={styles.driverRating}>★ {driver.rating}</Text>
              {driver.badges.map((badge) => (
                <Text key={badge} style={styles.badge}>{badge}</Text>
              ))}
            </View>
          </View>
        </View>
        <Text style={styles.route}>{from} → {to}</Text>
        <Text style={styles.details}>
          {date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
          {vehicleType === 'car' ? ' 🚗' : ' 🚲'} {seats} seats left
        </Text>
        {femaleOnly && <Text style={styles.femaleOnly}>Female Only</Text>}
        <Text style={styles.price}>${price} per person</Text>
        {members.length > 0 && (
          <View style={styles.membersSection}>
            <Text style={styles.membersTitle}>Members</Text>
            <View style={styles.membersList}>
              {members.map((member) => (
                <Image key={member.id} source={{ uri: member.avatar }} style={styles.memberAvatar} />
              ))}
            </View>
          </View>
        )}
      </View>
      <AnimatedPressable
        style={[styles.joinButton, joinButtonAnimatedStyle]}
        onPress={handleJoinPress}>
        <Text style={styles.joinButtonText}>Join Ride</Text>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff', // White background
    borderRadius: 16, // Rounded corners
    padding: 12, // Tight padding for compactness
    marginBottom: 12, // Tight margin
    shadowColor: '#3b82f6', // Blue shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#e5f3ff', // Light blue border around the entire card
    flexDirection: 'row', // Row layout for content and button
    alignItems: 'flex-end', // Align items to the bottom
    justifyContent: 'space-between', // Space between content and join button
  },
  content: {
    flex: 1, // Allow content to take available space
    paddingRight: 8, // Space for the button on the right
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // Tight margin
  },
  driverDetails: {
    flex: 1,
  },
  driverRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3b82f6', // Blue border for avatar
    marginRight: 8, // Tight margin
  },
  driverName: {
    fontSize: 16,
    color: '#1f2937', // Dark gray
    fontWeight: '600',
  },
  driverRating: {
    fontSize: 14,
    color: '#6b7280', // Gray
  },
  badge: {
    fontSize: 12,
    color: '#f59e0b', // Yellow for badges
    backgroundColor: '#fefcbf', // Light yellow background
    paddingHorizontal: 6, // Tight padding
    paddingVertical: 2, // Tight padding
    borderRadius: 6, // Smaller radius
    marginLeft: 6, // Space between rating and badge
  },
  route: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
    marginBottom: 8, // Tight margin
  },
  details: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8, // Tight margin
  },
  femaleOnly: {
    fontSize: 14,
    color: '#1f2937',
    backgroundColor: '#dbeafe', // Light blue background
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8, // Tight margin
  },
  price: {
    fontSize: 16,
    color: '#3b82f6', // Blue for price
    fontWeight: '600',
    marginBottom: 8, // Tight margin
  },
  membersSection: {
    marginBottom: 0, // Removed margin to eliminate blank space
  },
  membersTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  membersList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  joinButton: {
    backgroundColor: '#3b82f6', // Blue button
    paddingVertical: 8, // Tight padding
    paddingHorizontal: 16, // Tight padding
    borderRadius: 12,
    marginBottom: 12, // Tight margin to bottom
    marginLeft: 8, // Space from content
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  joinButtonText: {
    color: '#ffffff', // White text
    fontSize: 14, // Slightly smaller for compactness
    fontWeight: '600',
  },
});

export default RideCard;