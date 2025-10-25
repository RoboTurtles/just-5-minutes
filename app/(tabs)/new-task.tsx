import { ThemedText } from "@/components/themed-text";
import { Image } from 'expo-image';
import { useState } from "react";
import { Button, StyleSheet, TextInput } from 'react-native';

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useUserDataContext } from "../task-context";

export default function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { setUserData } = useUserDataContext();

  const gradientColors = ['rgba(249, 98, 41, 1)', 'rgba(252, 142, 31, 1)', 'rgba(252, 182, 61, 1)'];

  function saveNewTask() {
    
    const newTask = {
      "title": title,
      "description": description
    }

    setUserData((prevUserData) => ({...prevUserData, taskList: [...prevUserData.taskList, newTask]}));

    setTitle("");
    setDescription("");
  }

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
    </ParallaxScrollView>
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});