import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import Svg, { Defs, Path, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const gradientColors = ['#D78FEE', '#4E56C0'];

export default function TabTwoScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const [progressNote, setProgressNote] = useState('');
  const [geminiOutput, setGeminiOutput] = useState("");

  async function getGeminiResponse() { // call backend to get response to user input
    if (progressNote.length == 0) {
      return;
    }
    try {
      const response = await fetch("http://100.66.218.68:8021/gemini-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(progressNote)
      });

      const data = await response.json();

      if (data.status == 200) {
        setGeminiOutput(data.data);

        console.log(data.data);
      } else {
        console.log("Error occurred on getting Gemini response: ", data.error);
      }
    } catch (err) {
      console.log("Error occurred on getting Gemini response: ", err);
    }
  }

  return (
    <LinearGradient colors={['#D78FEE', '#4E56C0']} style={styles.gradient}>
      <ParallaxScrollView
        style={styles.parallax}
        headerBackgroundColor={{ light: gradientColors, dark: gradientColors }}
        headerImage={
          <Svg width={160} height={160} viewBox="0 0 24 24" style={styles.reactLogo}>
            <Defs>
              <SvgLinearGradient id="discovererGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#9B5DE0" />
                <Stop offset="100%" stopColor="#FDCFFA" />
              </SvgLinearGradient>
            </Defs>
            <Path
              fill="url(#discovererGradient)"
              d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z"
            />
            <Path
              fill="url(#discovererGradient)"
              d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z"
            />
          </Svg>
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText
            type="title"
            style={{
              fontFamily: Fonts.rounded,
            }}>
            Discoverer
          </ThemedText>
        </ThemedView>
        <ThemedText>Talk to Discoverer about new insights, trends, help, and more! ✨</ThemedText>
        <ThemedText style={styles.discovererOutputLabel}>Output:</ThemedText>
        <View style={styles.outputWrapper}>
          <ThemedText>{geminiOutput}</ThemedText>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.progressInput,
              {
                color: palette.text,
                borderColor: palette.icon,
                backgroundColor: palette.background,
              },
            ]}
            multiline
            placeholder="Talk about your progress"
            placeholderTextColor={palette.icon}
            value={progressNote}
            onChangeText={setProgressNote}
          />
        </View>
        <Button title="Send" onPress={getGeminiResponse}/>
      </ParallaxScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  parallax: {
    backgroundColor: 'transparent',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  stepContainer: {
    marginBottom: 8,
  },
  inputWrapper: {
    marginTop: 16,
  },
  progressInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minHeight: 160,
    textAlignVertical: 'top',
    borderColor: 'white',
    fontSize: 14
  },
  reactLogo: {
    position: 'absolute',
    bottom: -25,
    left: 30,
  },
  outputWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    borderColor: 'white'
  },
  discovererOutputLabel: {
    fontWeight: 600,
    fontSize: 18,
    padding: 0,
    margin: 0
  }
});
