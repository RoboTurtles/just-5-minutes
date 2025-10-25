import { ThemedText } from "@/components/themed-text";
import { View } from 'react-native';

import { useUserDataContext } from "../task-context";

export default function ViewTasks() {
  const { userData, setUserData } = useUserDataContext();

  return (
    <View>
      <ThemedText>Your Tasks</ThemedText>
      {userData.taskList.map((task, idx) => {
        return (
          <View key={idx}>
            <ThemedText>{task.title}</ThemedText>
            <ThemedText>{task.description}</ThemedText>
          </View>
        )
      })}
    </View>
  )
}