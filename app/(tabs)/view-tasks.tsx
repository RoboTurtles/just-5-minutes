import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import Svg, { Defs, Path, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

import TaskTile from "@/components/task-tile";
import { useUserDataContext } from "../task-context";

export default function ViewTasks() {
  const { userData } = useUserDataContext();
  const router = useRouter();

  const gradientColors = ['#5A81FF', '#9B5BFF'];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: gradientColors, dark: gradientColors }}
      headerImage={
        <Svg width={180} height={180} viewBox="0 0 24 24" style={styles.reactLogo}>
          <Defs>
            <SvgLinearGradient id="tasksGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#7AA8FF" />
              <Stop offset="100%" stopColor="#C18BFF" />
            </SvgLinearGradient>
          </Defs>
          <Path
            fill="url(#tasksGradient)"
            d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"
          />
          <Path
            fill="url(#tasksGradient)"
            fillRule="evenodd"
            d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </Svg>
      }
    >
      <ThemedText style={styles.title}>Manage Habits</ThemedText>
      {userData.taskList.map((task, idx) => {
        return (
          <TaskTile key={idx} idx={idx} title={task.title} description={task.description} />
        )
      })}
      <Pressable onPress={() => router.push('/new-task')}>
        <ThemedText type="link" style={{ marginTop: 12 }}>Add a new habit?</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reactLogo: {
    position: 'absolute',
    bottom: -25,
    right: 230,
  },
});