import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import Calendar from '@/components/calendar';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const gradientColors = ['rgba(249, 98, 41, 1)', 'rgba(252, 142, 31, 1)', 'rgba(252, 182, 61, 1)'];
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: gradientColors, dark: gradientColors }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-sus.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Good morning!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">What do you want to do today?</ThemedText>
      </ThemedView>

      <View style={styles.actionRow}>
        <Pressable
          style={({ pressed }) => [
            styles.actionButtonPressable,
            { transform: [{ scale: pressed ? 0.97 : 1 }] },
          ]}
          onPress={() => router.push('/new-task')}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionButtonGradient}>
            <ThemedText type="defaultSemiBold" style={styles.actionButtonPrimaryText}>
              Create a new task
            </ThemedText>
          </LinearGradient>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.actionButtonPressable,
            { transform: [{ scale: pressed ? 0.97 : 1 }] },
          ]}
          onPress={() => router.push('/view-tasks')}>
          <LinearGradient
            colors={[...gradientColors].reverse()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.actionButtonGradient, styles.actionButtonBorder]}>
            <ThemedText type="defaultSemiBold" style={styles.actionButtonSecondaryText}>
              View upcoming tasks
            </ThemedText>
          </LinearGradient>
        </Pressable>
      </View>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">Schedule for Today</ThemedText>
      <View style={styles.calendarWrapper}>
        <Calendar />
      </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    marginBottom: 8,
  },
  calendarWrapper: {
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    minHeight: 360,
    maxHeight: 400,
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 12,
    gap: 12,
  },
  actionButtonPressable: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonBorder: {
    borderWidth: 1,
    borderColor: '#ffffff55',
  },
  actionButtonPrimaryText: {
    color: '#FFFFFF',
  },
  actionButtonSecondaryText: {
    color: '#FFFFFF',
  },
});
