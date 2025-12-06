# <img src="https://github.com/ChitrakshTarun/HexSplash/blob/main/assets/images/icon.png" height="32"> HexSplash

HexSplash is a color-palette generator mobile app for design inspiration, inspired by the Coolors tool. HexSplash generates a palette of 5 random colors, which can be randomised based on the user's preference. The app functions on the frontend, and uses a randomiser function to randomise the colors on the screen.

# Tech Stack

### Frameworks, Tools & Languages

- React Native
- Expo
- JavaScript/TypeScript

### Dependencies

- `expo-router` File-based Routing & Navigation
- `expo-linear-gradient` Gradient Backgrounds
- `expo-font` Google Fonts
- `react-native-reanimated` App Animations
- `react-native-gesture-handler` Gesture Handling
- `react-native-view-shot` Exporting Palette as Image
- `react-native-share` Sharing Palette

# App Screenshots

<div>
<img src="https://github.com/ChitrakshTarun/HexSplash/blob/main/assets/screenshots/AppScreenshotLanding.png" height="400">
<img src="https://github.com/ChitrakshTarun/HexSplash/blob/main/assets/screenshots/AppScreenshotGenerator.png" height="400">
<img src="https://github.com/ChitrakshTarun/HexSplash/blob/main/assets/screenshots/AppScreenshotModal.png" height="400">
<img src="https://github.com/ChitrakshTarun/HexSplash/blob/main/assets/screenshots/AppScreenshotExport.png" height="400">
</div>

# Run Locally

### Pre-requisites

- Node.js
- Expo CLI
- Android/iOS Emulator (A Physical Device works as well)

### Installation

1. Clone this Repository, then change directory to the HexSplash directory.

```
git clone https://github.com/ChitrakshTarun/HexSplash.git
```

```
cd HexSplash
```

2. Install Dependencies

```
npm install
```

3. Build a prebuild of the app, and then run the app.

```
npx expo prebuild
```

```
npx expo run:android
```


# Extra Info for Feeld

### Original Task: 
Build a React Native Sample project and write automation tests using your favorite framework.
This exercise meant to let you show your expertise in React Native and Automation Testing. This work is similar to what you can expect as a day to day work. Use LLMs/AI Assistants as you normally would.

#### Scenario
You have a react native application that you need to test using automation tests thoroughly. If you
can, create a reasonably sized application (min 5 screens). If you are pressed for time pick an app
from https://github.com/ReactNativeNews/React-Native-Apps 

- Create a repository with automation tests for your (chosen OSS react native app)
- Add a markdown file with following details
	- React Native project
	- Describe how to setup and run the react native project
	- Briefly overview of the application functionality and which areas you chose to test using automation framework
- Automation Tests
	- Frameworks considered
	- Selected framework for automation test and rationale (pros/and 	   cons)
	- How to run automation tests
	- Improvements and next steps for the automation
- AI Usage & Judgement
	- Describe how you used AI
	- If yes
		- Log all the prompts and describe how you reviewed the code.
		- Where was the AI most helpful ?
		- Where was the AI least helpful
	- If no
		- Why not ?
- Additional/Bonus work
	- Using a CI tool for automation tests
	- Give links to automation run via CI (either GH Actions or some other tool)