# This is a project built for NewHacks 2025! 
We ended up using two GitHub repos for this; please find our backend code [here](https://github.com/yisiliu2005/just-5-minutes-backend).

# Project Description
## Inspiration
If I told you to begin doing something every day for the rest of your life, how willing and motivated would you be about making that commitment? How likely are you to stick with it? Yeah, me neither. But what if instead I asked you, when you're conveniently free, to spend just 5 minutes doing this thing you've been meaning to do more often, maybe even get in the habit of? You might as well. But just 5 minutes, day after day, is what makes a habit. Do the things you've been meaning to, become who you want to be, just 5 minutes at a time. 

## What it does
Just 5 Minutes is a habit builder application. Users input an action (or several) that they want to do more often—maybe even get in the habit of—and using AI, the app schedules reminders to the most convenient gaps in the user's schedule. This empowers people to **get started with something new**, no matter how insurmountable or discouraging it may seem before they begin. Our application takes away the stress of self-management while minimizing the impact of a new commitment on the user's life to make adjusting to the change feel easy and rewarding by sending non-pressuring, non-judgemental reminders without interrupting their existing schedule. Users can view a calendar with the proposed times to complete their action(s) and the prior commitments they've input into the app on their home page, add/edit their set action(s), as well as engage the Discoverer Chatbot in advice on their personal journeys to building new habits, talk about their progress, and more.

## How we built it
We wanted our application to run on mobile devices (both Android and iOS), so we opted to use **JavaScript** and **React Native**. For the backend, we chose to use **Python** and **Flask** as it provided a lightweight backend with a gentle learning curve. To implement our scheduler, we use the **Gemini 2.5 Flash** model through the **Gemini API**. Lastly, our Discoverer Chatbot also uses the **Gemini 2.5 Flash** model.

## Challenges we ran into
Initially, we wanted to implement user login and authentication, a database to store data, and push notifications through Firebase. However, we found that building and integrating all these features was unfeasible within the duration of the hackathon, so we decided to focus on the core functionality of our application and plan to implement these features in the future.
Another challenge we faced was on the technical side. Each member had to learn a lot of new things while working with the various technologies that were used in the creation of this application.
A surprising challenge was limiting the scope of our app to what we could feasibly build within the duration of the hackathon because we had so many cool ideas on how to expand, refine, and improve the app and its features to better represent our vision. It was difficult to discard them, and even more difficult to determine what should be included and to what extent. 

## Accomplishments that we're proud of
We are proud of being able to create an application that functions and captures the heart of our vision. We believe that this application has immense potential to help many people start building good habits, empowering people to become a better version of themselves, the way they each personally define wellness. Aside from that, we are incredibly proud of persevering, learning, and growing in the face of unforeseen obstacles and immense stress. 

## What we learned
We learned how to work with several technologies, such as React Native, Flask, Firebase, Git, and the Gemini API. These technologies are robust and useful in a wide range of situations, and we believe that learning these technologies now will be beneficial for us. We also learned to work effectively in groups, to communicate clearly, and to trust each other (even though we've just met).

## What's next for Just 5 Minutes
There are many features that we would like to implement in the future, such as:
1. **Firebase Cloud Messaging** for push notifications. Implementing this would allow our users to receive push notifications on their devices when the scheduled time for their habits is near, so that our users can be reminded of their habits.
2. **Firebase**  and **Firestore Database** for login and database. This would enable our application to handle multiple users, track the users' progress, keep count of their daily streaks, and more. We could also implement an in-game currency that can be used to purchase decorations or themes, gamifying habit-building and providing enticing instant gratification for the potentially tedious process.
3. **Smart Reminder**. This means that the application will be able to take inputs about when you’re busy and assign convenient times to remind you about the habits you’re trying to establish. Some ways to implement this would include: using your Google Calendar to view your commitments on that day, using Gemini's Speech-to-Text so that users can tell Gemini their responsibilities and their times that day, or remembering the repeating events in the user's schedule.


# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
