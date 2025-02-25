import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { MapPin, Clock, Users, ChevronRight, Car, Bike, Bus, MessageCircle, Star } from 'lucide-react-native';
import { format } from 'date-fns';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type VehicleType = 'car' | 'bike' | 'cng' | 'uber' | 'taxi';

type Member = {
  id: string;
  name: string;
  avatar: string;
};

type Driver = {
  name: string;
  avatar: string;
  rating: number;
  badges: string[];
  gender: 'male' | 'female';
  verified: boolean;
};

type RideCardProps = {
  id: string;
  driver: Driver;
  from: string;
  to: string;
  date: Date;
  seats: number;
  price: number;
  vehicleType: VehicleType;
  vehicleNumber?: string;
  femaleOnly: boolean;
  members: Member[];
  onChatPress: () => void;
};

export default function RideCard({
  driver,
  from,
  to,
  date,
  seats,
  price,
  vehicleType,
  vehicleNumber,
  femaleOnly,
  members,
  onChatPress,
}: RideCardProps) {
  const scale = useSharedValue(1);
  const elevation = useSharedValue(2);

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
    elevation.value = withSpring(4);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    elevation.value = withSpring(2);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    elevation: elevation.value,
  }));

  const getVehicleIcon = (type: VehicleType) => {
    switch (type) {
      case 'car':
        return <Car size={16} color="#6366f1" />;
      case 'bike':
        return <Bike size={16} color="#6366f1" />;
      case 'cng':
      case 'uber':
      case 'taxi':
        return <Bus size={16} color="#6366f1" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Good':
        return '#22c55e';
      case 'Reliable':
        return '#6366f1';
      case 'Hero':
        return '#eab308';
      default:
        return '#64748b';
    }
  };

  const pulseAnimation = () => {
    'worklet';
    return withSequence(
      withSpring(1.05),
      withSpring(1)
    );
  };

  return (
    <AnimatedPressable
      style={[styles.rideCard, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <View style={styles.driverInfo}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: driver.avatar }} style={styles.avatar} />
          {driver.verified && (
            <View style={styles.verifiedBadge}>
              <Star size={12} color="#fff" fill="#fff" />
            </View>
          )}
        </View>
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#eab308" fill="#eab308" />
            <Text style={styles.rating}>{driver.rating}</Text>
            {driver.badges.map((badge) => (
              <View
                key={badge}
                style={[styles.badge, { backgroundColor: getBadgeColor(badge) }]}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        </View>
        <Pressable
          style={styles.chatButton}
          onPress={() => {
            scale.value = pulseAnimation();
            onChatPress();
          }}>
          <MessageCircle size={20} color="#6366f1" />
        </Pressable>
      </View>

      <View style={styles.rideDetails}>
        <View style={styles.locationContainer}>
          <MapPin size={16} color="#6366f1" />
          <View style={styles.locations}>
            <Text style={styles.location}>{from}</Text>
            <Text style={styles.locationArrow}>→</Text>
            <Text style={styles.location}>{to}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.info}>
            <Clock size={16} color="#64748b" />
            <Text style={styles.infoText}>
              {format(date, 'MMM d, h:mm a')}
            </Text>
          </View>

          <View style={styles.info}>
            {getVehicleIcon(vehicleType)}
            <Text style={styles.infoText}>
              {vehicleNumber || vehicleType}
            </Text>
          </View>

          <View style={styles.info}>
            <Users size={16} color="#64748b" />
            <Text style={styles.infoText}>{seats} seats left</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          {femaleOnly && (
            <View style={styles.femaleOnlyTag}>
              <Text style={styles.femaleOnlyText}>Female Only</Text>
            </View>
          )}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${price}</Text>
            <Text style={styles.perPerson}> per person</Text>
            <ChevronRight size={20} color="#6366f1" />
          </View>
        </View>
      </View>

      {members.length > 0 && (
        <View style={styles.membersContainer}>
          <Text style={styles.membersTitle}>Members</Text>
          <View style={styles.membersList}>
            {members.map((member) => (
              <Image
                key={member.id}
                source={{ uri: member.avatar }}
                style={styles.memberAvatar}
              />
            ))}
          </View>
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  rideCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
      },
    }),
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  verifiedBadge: {
    position: 'absolute',
    right: 8,
    bottom: -4,
    backgroundColor: '#6366f1',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rating: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  chatButton: {
    padding: 8,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
  },
  rideDetails: {
    gap: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locations: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  location: {
    fontSize: 15,
    color: '#1e293b',
    fontWeight: '500',
  },
  locationArrow: {
    fontSize: 15,
    color: '#6366f1',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  femaleOnlyTag: {
    backgroundColor: '#fdf2f8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  femaleOnlyText: {
    color: '#be185d',
    fontSize: 12,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6366f1',
  },
  perPerson: {
    fontSize: 14,
    color: '#64748b',
  },
  membersContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  membersTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 8,
  },
  membersList: {
    flexDirection: 'row',
    gap: 8,
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});