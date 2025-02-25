import { useState } from 'react';

import { View, Text, StyleSheet, Modal, Pressable, TextInput } from 'react-native';
import { X } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type VehicleType = 'car' | 'bike' | 'cng' | 'uber' | 'taxi';

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: {
    timeRange: string;
    vehicleType: VehicleType | '';
    femaleOnly: boolean;
  }) => void;
  currentFilters: {
    timeRange: string;
    vehicleType: VehicleType | '';
    femaleOnly: boolean;
  };
};

export default function FilterModal({
  visible,
  onClose,
  onApply,
  currentFilters,
}: FilterModalProps) {
  const scale = useSharedValue(1);
  const [timeRange, setTimeRange] = useState(currentFilters.timeRange);
  const [vehicleType, setVehicleType] = useState(currentFilters.vehicleType);
  const [femaleOnly, setFemaleOnly] = useState(currentFilters.femaleOnly);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Rides</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#64748b" />
            </Pressable>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Time Range</Text>
            <TextInput
              style={styles.filterInput}
              placeholder="e.g., 3:00 PM - 4:00 PM"
              value={timeRange}
              onChangeText={setTimeRange}
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Vehicle Type</Text>
            <View style={styles.vehicleTypeContainer}>
              {['car', 'bike', 'cng', 'uber', 'taxi'].map((type) => (
                <AnimatedPressable
                  key={type}
                  style={[
                    styles.vehicleTypeButton,
                    vehicleType === type && styles.vehicleTypeButtonSelected,
                    animatedStyle,
                  ]}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={() => setVehicleType(type as VehicleType)}>
                  <Text
                    style={[
                      styles.vehicleTypeText,
                      vehicleType === type && styles.vehicleTypeTextSelected,
                    ]}>
                    {type.toUpperCase()}
                  </Text>
                </AnimatedPressable>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Pressable
              style={styles.femaleOnlyButton}
              onPress={() => setFemaleOnly(!femaleOnly)}>
              <View
                style={[
                  styles.checkbox,
                  femaleOnly && styles.checkboxSelected,
                ]}>
                {femaleOnly && <View style={styles.checkmark} />}
              </View>
              <Text style={styles.femaleOnlyButtonText}>Female Only</Text>
            </Pressable>
          </View>

          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.applyButton]}
              onPress={() => {
                onApply({ timeRange, vehicleType, femaleOnly });
                onClose();
              }}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
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
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  closeButton: {
    padding: 8,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  vehicleTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  vehicleTypeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  vehicleTypeButtonSelected: {
    backgroundColor: '#6366f1',
  },
  vehicleTypeText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  vehicleTypeTextSelected: {
    color: '#fff',
  },
  femaleOnlyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#6366f1',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#6366f1',
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  femaleOnlyButtonText: {
    fontSize: 16,
    color: '#1e293b',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
  },
  applyButton: {
    backgroundColor: '#6366f1',
  },
  cancelButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '500',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});