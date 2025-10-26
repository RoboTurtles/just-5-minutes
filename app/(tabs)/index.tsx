import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import Calendar from '@/components/calendar';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

import { useState } from 'react';
import { useUserDataContext } from "../task-context";

export default function HomeScreen() {
  const gradientColors = ['rgba(249, 98, 41, 1)', 'rgba(252, 142, 31, 1)', 'rgba(252, 182, 61, 1)'];
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const [scheduledHabitsList, setScheduledHabitsList] = useState([]);
  const [parentScrollEnabled, setParentScrollEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useUserDataContext();

  async function scheduleHabits() { // call backend to assign times to habits
    if (userData.taskList.length == 0) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("http://100.66.218.68:8021/schedule-habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData.taskList)
      });

      const data = await response.json();

      if (data.status == 200) {
        const jsonData = JSON.parse(data.data);

        setScheduledHabitsList(jsonData);

        console.log(jsonData);
      } else {
        console.log("Error occurred on scheduleTask: ", data.error);
      }
      setIsLoading(false);
    } catch (err) {
      console.log("Error occurred on scheduleTask: ", err);
      setIsLoading(false);
    }
  }

  return (
    <ParallaxScrollView
      scrollEnabled={parentScrollEnabled}
      headerBackgroundColor={{ light: gradientColors, dark: gradientColors }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-sus.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <Pressable 
          onTouchStart={() => {
            if (!parentScrollEnabled) {
              setParentScrollEnabled(true);
            }
          }}
        >
          <ThemedText type="title">Good morning!</ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Pressable 
          onTouchStart={() => {
            if (!parentScrollEnabled) {
              setParentScrollEnabled(true);
            }
          }}
        >
          <ThemedText type="defaultSemiBold">What do you want to do today?</ThemedText>
        </Pressable>
      </ThemedView>

      <View style={styles.actionRow}>
        <Pressable
          style={({ pressed }) => [
            styles.actionButtonPressable,
            { transform: [{ scale: pressed ? 0.97 : 1 }] },
          ]}
          onTouchStart={() => {
            if (!parentScrollEnabled) {
              setParentScrollEnabled(true);
            }
          }}
          onPress={() => router.push('/new-task')}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionButtonGradient}>
            <ThemedText type="defaultSemiBold" style={styles.actionButtonPrimaryText}>
              Create a new habit
            </ThemedText>
          </LinearGradient>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.actionButtonPressable,
            { transform: [{ scale: pressed ? 0.97 : 1 }] },
          ]}
          onTouchStart={() => {
            if (!parentScrollEnabled) {
              setParentScrollEnabled(true);
            }
          }}
          onPress={() => router.push('/view-tasks')}>
          <LinearGradient
            colors={[...gradientColors].reverse()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.actionButtonGradient, styles.actionButtonBorder]}>
            <ThemedText onPress={scheduleHabits} type="defaultSemiBold" style={styles.actionButtonSecondaryText}>
              Reschedule Time
            </ThemedText>
          </LinearGradient>
        </Pressable>
      </View>
      {isLoading && (
        <ActivityIndicator size="small" color="#FC8E1F" style={{ marginLeft: 10, alignSelf: 'center' }} />
      )}

      <ThemedView 
        style={styles.stepContainer}
        onStartShouldSetResponder={() => {
          // Re-enable scroll when tapping outside calendar
          if (!parentScrollEnabled) {
            setParentScrollEnabled(true);
          }
          return false;
        }}
      >
        <Pressable 
          onTouchStart={() => {
            if (!parentScrollEnabled) {
              setParentScrollEnabled(true);
            }
          }}
        >
          <ThemedText type="title">Daily Schedule</ThemedText>
        </Pressable>
      <View 
        style={styles.calendarWrapper}
        onStartShouldSetResponderCapture={() => {
          // Disable scroll when touching calendar area
          setParentScrollEnabled(false);
          return false; // Don't capture, let calendar handle it
        }}
      >
        <Calendar habits={scheduledHabitsList} onInteractStart={() => setParentScrollEnabled(false)} onInteractEnd={() => {}}/>
      </View>
      <ThemedText type="link" style={{ marginTop: 12 }}>Events gathered from Google Calendar</ThemedText>
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
