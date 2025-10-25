import { ThemedText } from "@/components/themed-text";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from 'react-native';

import { useUserDataContext } from "../task-context";

export default function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { userData, setUserData } = useUserDataContext();

  function saveNewTask() {
    const newTask = {
      "title": title,
      "description": description
    }

    setUserData((prevUserData) => ({...prevUserData, taskList: [...prevUserData.taskList, newTask]}));
  }

  return (
    <View>
      <ThemedText>Title</ThemedText>
      <TextInput style={styles.titleInput} onChangeText={setTitle} value={title}/>
      <ThemedText>Description</ThemedText>
      <TextInput 
        style={styles.descriptionInput}
        multiline
        onChangeText={setDescription}
        value={description}
      />
      <Button title="Save Task" onPress={saveNewTask}/>
    </View>
  )
}

const styles = StyleSheet.create({
  titleInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    color: 'white',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 12,
    color: 'white',
  },
})