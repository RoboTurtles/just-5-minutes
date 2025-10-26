import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

import { useUserDataContext } from "../app/task-context";

export default function TaskTile({idx, title, description}: {idx: number, title: string, description: string}) {
  const { setUserData } = useUserDataContext();

  function deleteTask(title: string) {
    setUserData(prevUserData => ({
      ...prevUserData,
      taskList: prevUserData.taskList.filter(task => task.title !== title),
    }));
  }
  
  return (
    <View key={idx}>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <View>
          <ThemedText style={styles.taskTitle}>{title}</ThemedText>
          <ThemedText>{description}</ThemedText>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.actionButtonPressable,
            { transform: [{ scale: pressed ? 0.97 : 1 }] },
          ]}
          onPress={() => deleteTask(title)}
        >
          <ThemedText>
            Delete
          </ThemedText>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  actionButtonPressable: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: "orange",
    padding: 8
  },
  taskTitle: {
    fontWeight: 700,
    fontSize: 20,
  }
})