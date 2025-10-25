import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { useUserDataContext } from "../task-context";

export default function ViewTasks() {
  const { userData } = useUserDataContext();

  const gradientColors = ['rgba(249, 98, 41, 1)', 'rgba(252, 142, 31, 1)', 'rgba(252, 182, 61, 1)'];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: gradientColors, dark: gradientColors }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-sus.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedText>Your Tasks</ThemedText>
      {userData.taskList.map((task, idx) => {
        return (
          <View key={idx}>
            <ThemedText>{task.title}</ThemedText>
            <ThemedText>{task.description}</ThemedText>
          </View>
        )
      })}
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});