import { Tabs } from 'expo-router';
import { Car, Search, User } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          ...(Platform.OS === 'web' ? {
            transition: 'all 0.3s ease',
          } : {}),
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          letterSpacing: 0.5,
          marginTop: 4,
        },
        tabBarItemStyle: {
          gap: 4,
          ...(Platform.OS === 'web' ? {
            transition: 'all 0.3s ease',
          } : {}),
        },
        tabBarIconStyle: {
          marginBottom: -4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Available Rides',
          tabBarIcon: ({ size, color }) => (
            <Search
              size={size}
              color={color}
              strokeWidth={2.5}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create Ride',
          tabBarIcon: ({ size, color }) => (
            <Car
              size={size}
              color={color}
              strokeWidth={2.5}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User
              size={size}
              color={color}
              strokeWidth={2.5}
            />
          ),
        }}
      />
    </Tabs>
  );
}