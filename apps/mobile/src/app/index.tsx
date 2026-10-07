import type { Business } from '@linko/domain';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const featuredBusiness: Business = {
  id: 'business-1',
  name: 'Luna Coffee',
  motto: 'Fresh brews, fast pickups, and easy ordering.',
  location: 'Downtown Market',
  whatsappNumber: '+2348143800220',
  accentColor: '#f97316',
};

const quickStats = [
  { label: 'Open now', value: '7:00 AM - 10:00 PM' },
  { label: 'Pickup', value: '12 min' },
  { label: 'Rating', value: '4.8/5' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.eyebrow}>Linko</Text>
          <Pressable style={styles.pill}>
            <Text style={styles.pillText}>Live</Text>
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.title}>{featuredBusiness.name}</Text>
          <Text style={styles.motto}>{featuredBusiness.motto}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Location</Text>
            <Text style={styles.metaValue}>{featuredBusiness.location}</Text>
          </View>

          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Order now</Text>
          </Pressable>
        </View>

        <View style={styles.statsGrid}>
          {quickStats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Today&apos;s picks</Text>
          <Text style={styles.menuItem}>Signature Latte</Text>
          <Text style={styles.menuItem}>Sunrise Sandwich</Text>
          <Text style={styles.menuItem}>Citrus Cold Brew</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f8',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyebrow: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.4,
    color: '#101828',
  },
  pill: {
    backgroundColor: '#d1fae5',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pillText: {
    color: '#065f46',
    fontWeight: '700',
    fontSize: 12,
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  motto: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4b5563',
    marginBottom: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  metaLabel: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  metaValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#f97316',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    minHeight: 86,
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  menuItem: {
    fontSize: 15,
    color: '#374151',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
});
