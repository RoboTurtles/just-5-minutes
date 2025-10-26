import { ThemedText } from "@/components/themed-text";
import { useState } from "react";
import { Button, StyleSheet, TextInput } from 'react-native';
import Svg, { Defs, Path, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useUserDataContext } from "../task-context";

export default function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { setUserData } = useUserDataContext();

  const gradientColors = ['#5D50F9', '#2E75FF'];

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
        <Svg width={180} height={180} viewBox="0 0 24 24" style={styles.reactLogo}>
          <Defs>
            <SvgLinearGradient id="newTaskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#93aee7ff" />
              <Stop offset="100%" stopColor="#4c94ffff" />
            </SvgLinearGradient>
          </Defs>
          <Path
            fill="url(#newTaskGradient)"
            fillRule="evenodd"
            d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
            clipRule="evenodd"
          />
          <Path
            fill="url(#newTaskGradient)"
            fillRule="evenodd"
            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </Svg>
      }
    >

      <ThemedText type="title">Add Habits</ThemedText>

      <ThemedText>Title</ThemedText>
      <TextInput
        style={styles.titleInput}
        onChangeText={setTitle}
        value={title}
        placeholder="What habit to develop?"
        placeholderTextColor="#b0b0b0"
      />
      <ThemedText>Description</ThemedText>
      <TextInput
        style={styles.descriptionInput}
        multiline
        onChangeText={setDescription}
        value={description}
        placeholder="Give it a description..."
        placeholderTextColor="#b0b0b0"
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
    bottom: -30,
    left: 120,
    position: 'absolute',
  },
});