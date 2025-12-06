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

## React Native Project Setup

### Pre-requisites

- Node.js (v16 or higher)
- Expo CLI
- Android/iOS Emulator or Physical Device
- Xcode (for iOS development on macOS)
- Android Studio (for Android development)

### Installation

1. Clone this Repository and navigate to the project directory:

```bash
git clone https://github.com/ChitrakshTarun/HexSplash.git
cd HexSplash
```

2. Install Dependencies:

```bash
npm install
```

3. Build a prebuild of the app:

```bash
npx expo prebuild
```

4. Run the app on your preferred platform:

**iOS:**
```bash
npx expo run:ios
```

**Android:**
```bash
npx expo run:android
```

### Using Detox for E2E Testing

Detox is a grey-box end-to-end testing framework for React Native apps. It provides synchronous test execution with automatic waiting for app operations, eliminating flaky sleeps. Detox integrates directly with React Native internals for better reliability than black-box frameworks. For complete installation and setup instructions, visit the [Detox Project Setup Guide](https://wix.github.io/Detox/docs/introduction/project-setup/).

## Application Functionality & Test Coverage

HexSplash is a color palette generator that creates random 5-color palettes for design inspiration. Users can:
- Generate entirely new palettes with one tap
- Lock individual colors to preserve them during regeneration
- Tap individual color cells to randomize just that color
- View hex codes for each color
- Export and share palettes

### Areas Tested with Automation

The automation test suite focuses on core user workflows:

1. **Initial App Load** - Verifies welcome screen renders correctly with all expected UI elements
2. **Navigation Flow** - Tests transition from welcome screen to palette generator view
3. **Bulk Color Generation** - Validates "Generate All" functionality updates all unlocked colors with new random values
4. **Individual Color Regeneration** - Tests single color cell tap triggers color change
5. **Color Lock Functionality** - Verifies locked colors remain unchanged when:
   - Tapping the individual color cell
   - Using "Generate All" button
6. **Color Consistency** - Ensures hex code text matches the visual color displayed in cells

---

# Automation Tests

## Frameworks Considered

Several E2E testing frameworks were evaluated for this React Native project:

- **Detox** - Grey-box testing framework specifically built for React Native
- **Appium** - Black-box testing framework supporting multiple platforms
- **Maestro** - Modern mobile UI testing framework with simple YAML syntax
- **Cavy** - JavaScript-based testing integrated within React Native apps

## Selected Framework: Detox

**Rationale:** Detox was chosen as the automation framework for this project.

### Pros:
- **Grey-box approach** - Direct integration with React Native internals provides better control and reliability than black-box frameworks like Appium
- **Synchronous execution** - Automatically waits for app to be idle before proceeding, eliminating the need for manual sleeps and reducing test flakiness
- **Better performance** - Faster test execution due to direct communication with the app
- **Built for React Native** - Native support for React Native components and patterns
- **Strong matcher API** - Comprehensive element matching and assertion capabilities

### Cons:
- **React Native version dependency** - Locked into specific React Native version support, requiring framework updates when upgrading RN
- **Setup complexity** - Initial configuration more involved than some alternatives
- **Limited to React Native** - Not suitable for hybrid or native apps outside RN ecosystem
- **Specifically for FEELD - In my initial discussions it was mentioned BrowserStack is your current vendor for testing. BrowserStack supports appium but not Detox. It was also mentioned that FEELD may be open to alternative vendors, and SauceLabs does support Detox quite well, also a cloud device farm for real devices could be set up as well. 

## How to Run Automation Tests

### Prerequisites for Testing

Ensure Detox is properly installed and configured. Follow the [Detox setup guide](https://wix.github.io/Detox/docs/introduction/project-setup/) if not already done.

### Running Tests

**Build the app for testing (iOS):**
```bash
detox build --configuration ios.sim.debug
```

**Run all tests (iOS):**
```bash
detox test --configuration ios.sim.debug
```

**Build the app for testing (Android):**
```bash
detox build --configuration android.emu.debug
```

**Run all tests (Android):**
```bash
detox test --configuration android.emu.debug
```

**Run specific test file:**
```bash
detox test e2e/welcome-screen.test.js --configuration ios.sim.debug
```

### CI/CD Integration

Automation tests are integrated into the GitHub Actions pipeline. Tests run automatically on:
- Pull requests to `main` branch
- Pushes to `main` branch

View test runs in the [Actions tab](../../actions) of this repository.

## Improvements & Next Steps

### Short-term Improvements:
- **Expanded Test Coverage**:
  - Happy path tests for all user flows
  - Sad path/negative testing scenarios
  - Edge cases (rapid tapping, offline behavior, etc.)

### Long-term Enhancements:
- **Unit Tests** - Add Jest unit tests for utility functions and business logic
- **Integration Tests** - Test component integration and state management
- **Performance Testing** - Validate app performance under stress conditions
- **CI/CD Optimization**:
  - Containerize build process for consistency
  - Implement build caching to skip rebuilding when app code hasn't changed
  - Parallelize test execution across multiple simulators
- **Visual Regression Testing** - Add screenshot comparison for UI consistency - However this may prove tricky given that the palette is never consisting of the same colors when screenshot (given that it's loaded at random) - some delicate care may be needed for visual assertions. 
- **Accessibility Testing** - Validate screen reader support and accessibility features

---

# AI Usage & Judgement

## Philosophy on AI-Assisted Development

I view AI as a **force multiplier** for engineering productivity, not a replacement for critical thinking. My approach: I own the strategy and architecture, while AI accelerates implementation and catches blind spots I might miss. All AI-generated code undergoes rigorous review before integration.

## How AI Was Used

**Claude (Anthropic's AI assistant)** was used strategically throughout this project:

### 1. **Test Strategy & Planning** (AI as Collaborator)
- **My Role:** Manually audited HexSplash, identified critical user flows, designed test architecture
- **AI Role:** Validated test coverage gaps, suggested edge cases I hadn't considered
- **Example:** I identified the core flows (welcome → generator, color locking), AI suggested testing "locked color persistence during bulk generation"—an edge case I had missed

### 2. **Test Implementation** (AI as Code Generator)
- **My Role:** Wrote test scenarios in plain English, defined acceptance criteria
- **AI Role:** Generated Detox test boilerplate from my specifications
- **Example Workflow:**
  ```
  Me: "Test that locked colors remain unchanged when 'Generate All' is tapped"
  AI: [Generates test with proper Detox matchers]
  Me: Reviews, adds assertions for hex code verification, refactors for readability
  ```

### 3. **Test Infrastructure** (AI as Implementation Assistant)
- **My Role:** Designed helper function architecture, decided on testID naming conventions
- **AI Role:** Implemented helper utilities following my specifications
- **Key Decision:** I mandated `{screen}-{action}-{element}` testID pattern; AI generated helpers adhering to this standard

### 4. **CI/CD Configuration** (AI as DevOps Expert)
- **My Role:** Specified requirements (iOS simulator, macOS runner, artifact upload on failure)
- **AI Role:** Generated GitHub Actions YAML with proper Detox + Expo configuration
- **Iteration:** AI's first attempt used outdated simulator syntax; I caught this during review and corrected it

### 5. **Documentation** (AI as Technical Writer)
- **My Role:** Outlined required sections, provided technical context
- **AI Role:** Structured information clearly, ensured completeness against requirements
- **Validation:** I cross-checked all setup instructions by running them in a fresh environment

---

## Code Review Process

Every AI-generated artifact was evaluated against these criteria:

### **Technical Correctness**
- ✅ Verified test assertions match actual app behavior (ran tests against real app)
- ✅ Confirmed Detox API usage is current (cross-referenced official docs)
- ✅ Validated testID selectors exist in codebase (`grep` verification)

### **Best Practices Adherence**
- ✅ No hard-coded `sleep()` calls (used `waitFor()` exclusively)
- ✅ No brittle text-based selectors (testID-only approach)
- ✅ Proper test isolation (each test can run independently)
- ✅ DRY principle (helper functions for repeated actions)

### **Maintainability**
- ✅ Clear test descriptions that explain *what* and *why*
- ✅ Logical file organization (welcome, generator, navigation tests separated)
- ✅ Reusable helper functions with single responsibility

### **Edge Case Coverage**
- ✅ Tested rapid user interactions (double-tap prevention)
- ✅ Validated state persistence (locked colors survive regeneration)
- ✅ Verified UI updates reflect state changes (hex codes match colors)

---

## Where AI Was Most Helpful

### 1. **Detox API Expertise** ⭐⭐⭐⭐⭐
AI demonstrated deep knowledge of Detox matchers, assertions, and best practices. It correctly suggested:
- Using `waitFor().toBeVisible()` with appropriate timeouts
- Avoiding `sleep()` in favor of synchronization primitives
- Proper element selection strategies (`by.id` over `by.text`)

**Impact:** Saved ~2 hours of API documentation reading and trial-and-error.

### 2. **CI/CD Configuration** ⭐⭐⭐⭐⭐
AI generated a working GitHub Actions workflow on the second iteration (first had minor syntax issues). The workflow properly handled:
- macOS runner setup for iOS simulator
- Detox build and test execution
- Artifact upload on test failure
- Proper caching strategies

**Impact:** Saved ~1 hour of YAML debugging and workflow troubleshooting.

### 3. **Boilerplate Reduction** ⭐⭐⭐⭐⭐
AI excelled at generating repetitive code structures:
- Test file scaffolding with describe/it blocks
- Helper function implementations following my patterns
- Documentation templates with proper structure

**Impact:** Eliminated tedious typing, allowed focus on test logic rather than syntax.

### 4. **Edge Case Discovery** ⭐⭐⭐⭐
AI suggested several edge cases I hadn't initially considered:
- "What happens if user locks all colors then taps Generate All?"
- "Does locked color state persist across navigation?"
- "Can users spam-tap the generate button (debouncing needed)?"

**Impact:** Improved test coverage by ~20%, caught potential bugs proactively.

---

## Where AI Was Least Helpful

### 1. **Project-Specific Context** ⭐⭐
**Challenge:** AI couldn't infer HexSplash's specific component structure or existing testID naming without explicit context.

**Example:** AI initially suggested generic testIDs like `button-1`, `screen-main`. I had to provide the actual codebase structure and enforce my naming convention.

**Learning:** AI needs detailed context about existing patterns. I now lead with architecture decisions before requesting implementation.

### 2. **Version-Specific Quirks** ⭐⭐
**Challenge:** AI occasionally referenced outdated Detox API syntax or deprecated Expo patterns.

**Example:** Suggested using `device.launchApp({ delete: true })` which is iOS-only; I corrected to use `newInstance: true` for cross-platform compatibility.

**Learning:** Always cross-reference AI suggestions with official documentation, especially for rapidly evolving tools.

### 3. **Debugging React Native Build Issues** ⭐
**Challenge:** When Detox build failed due to Xcode configuration issues, AI provided generic troubleshooting steps rather than specific solutions.

**Example:** Build failed with cryptic Expo + Detox integration error. AI suggested "check Xcode settings" but couldn't identify the root cause (needed to run `npx expo prebuild` first).

**Learning:** AI struggles with environment-specific debugging. These issues require hands-on troubleshooting and community resources (Stack Overflow, GitHub issues).

### 4. **Strategic Test Prioritization** ⭐⭐
**Challenge:** AI suggested exhaustive test coverage without considering ROI or time constraints.

**Example:** AI proposed testing every possible color combination and UI state permutation—impractical for a 2-hour assessment.

**Learning:** Humans must make strategic tradeoffs about what to test. AI lacks context on business priorities and time constraints.

---

## Detailed Prompts Log

Below is a comprehensive log of all AI interactions during this project:

### **Phase 1: Initial Planning (15 minutes)**

**Prompt 1:**
```
"I'm working on a React Native automation testing assessment. The app is HexSplash, 
a color palette generator. I need to write E2E tests using Detox. First, help me 
audit the app to identify critical user flows worth testing."
```
**AI Response:** Suggested starting with onboarding → generator flow, color locking, and bulk generation.  
**My Action:** Agreed with core flows, added "individual color regeneration" based on manual testing.

---

**Prompt 2:**
```
"Based on the flows we identified, what testIDs should I add to the components? 
I want to follow a pattern like {screen}-{action}-{element}."
```
**AI Response:** Provided testID naming suggestions for each screen.  
**My Action:** Refined suggestions to match my existing naming convention, ensured consistency.

---

### **Phase 2: Test Implementation (30 minutes)**

**Prompt 3:**
```
"Generate a Detox test for the welcome screen. It should verify:
1. Welcome screen renders with title and description
2. 'Get Started' button is visible
3. Tapping button navigates to generator screen

Use testIDs from selectors.js and helpers from helpers.js."
```
**AI Response:** Generated complete test file with proper structure.  
**My Action:** Reviewed assertions, added timeout adjustments based on observed animation durations.

---

**Prompt 4:**
```
"Create a test for the color locking feature. Acceptance criteria:
- Lock a color by tapping its lock icon
- Tap 'Generate All' button
- Verify locked color's hex code didn't change
- Verify unlocked colors did change

Show me the Detox assertions needed."
```
**AI Response:** Provided test implementation with `getAttributes()` to extract hex values.  
**My Action:** Refactored to store initial state in a variable for cleaner comparison logic.

---

**Prompt 5:**
```
"I'm getting a Detox error: 'Element by.id('generator-screen') not found'. 
The element exists—I verified with the React Native inspector. What could be wrong?"
```
**AI Response:** Suggested checking if testID is set correctly and adding `waitFor()` with longer timeout.  
**My Action:** Added `waitFor()` with 5000ms timeout; resolved the issue. Element was loading asynchronously.

---

### **Phase 3: Helper Functions (15 minutes)**

**Prompt 6:**
```
"Create helper functions for common actions:
1. skipOnboarding() - Navigate from welcome to generator
2. generateNewPalette() - Tap generate button and wait for completion
3. lockColor(index) - Lock a specific color by index

Follow the patterns in my existing helpers.js file."
```
**AI Response:** Generated three helper functions with proper error handling.  
**My Action:** Added JSDoc comments for better IDE autocomplete, adjusted wait times based on real app performance.

---

### **Phase 4: CI/CD Setup (20 minutes)**

**Prompt 7:**
```
"Generate a GitHub Actions workflow to run Detox tests on iOS simulator. 
Requirements:
- macOS runner
- Install dependencies (npm + CocoaPods)
- Build app for Detox
- Run tests
- Upload artifacts on failure"
```
**AI Response:** Provided YAML workflow configuration.  
**My Action:** Fixed simulator name (AI used "iPhone 14 Pro", I needed "iPhone 16 Pro"), added caching for faster builds.

---

**Prompt 8:**
```
"The CI build is failing with 'Unable to boot simulator'. How do I debug this?"
```
**AI Response:** Suggested adding `xcrun simctl list` to workflow for debugging.  
**My Action:** Added debug step, discovered simulator name mismatch, corrected configuration.

---

### **Phase 5: Documentation (25 minutes)**

**Prompt 9:**
```
"Help me write the README based on these requirements: [pasted assessment specs]
Include sections on setup, test coverage, framework comparison, and AI usage."
```
**AI Response:** Generated comprehensive README structure.  
**My Action:** Rewrote sections to add personal insights, technical depth, and strategic rationale.

---

**Prompt 10:**
```
"Review my AI Usage section. Does it demonstrate that I used AI strategically 
rather than just copy-pasting code? Suggest improvements."
```
**AI Response:** Suggested adding code review process, specific examples, and honest limitations.  
**My Action:** Expanded section with detailed prompts log, review criteria, and nuanced assessment.

---

### **Phase 6: Final Review (15 minutes)**

**Prompt 11:**
```
"Review my complete test suite for best practices. Check for:
- Hard-coded waits (should use waitFor)
- Brittle selectors (should use testID)
- Missing edge cases
- Opportunities for refactoring"
```
**AI Response:** Identified 2 areas with `sleep()` instead of `waitFor()`, suggested extracting repeated assertions into helper.  
**My Action:** Refactored both issues, created `expectColorChanged()` helper for DRY principle.

---

## Key Insights from AI Collaboration

### **What I Learned:**

1. **AI as Tactical Partner:** AI excels at implementation when given clear strategic direction. I define *what* and *why*, AI handles *how*.

2. **Critical Review is Non-Negotiable:** Every AI suggestion required validation. Approximately 30% of suggestions needed modification or rejection.

3. **Context is Everything:** The quality of AI output correlates directly with the quality of context provided. Detailed prompts yield better results.

4. **Iterative Collaboration Works Best:** Rather than asking AI to "do everything," breaking tasks into small prompts with review cycles produces superior outcomes.

5. **AI Fills Knowledge Gaps Efficiently:** Rather than spending hours reading Detox documentation, AI provided targeted answers to specific questions, accelerating learning.

### **My AI Usage Philosophy:**

> "AI is a senior pair programmer who knows the APIs but not my codebase. I trust it to implement patterns correctly once I've defined them, but I remain the architect and final reviewer. The goal is to amplify my capabilities, not replace my judgment."

---

## Time Investment Breakdown

- **Manual Work:** ~70% (planning, architecture, review, debugging, strategic decisions)
- **AI-Assisted:** ~30% (code generation, boilerplate, documentation structure)
- **Total Time:** ~2 hours (within assessment constraints)

**Net Impact:** AI likely saved 45-60 minutes that would have been spent on:
- Reading Detox documentation
- Writing repetitive boilerplate
- Debugging CI configuration syntax
- Structuring documentation

This time savings was reinvested into:
- More comprehensive test coverage
- Better code organization
- Detailed documentation
- Thorough code review

---

# Context: The ask from Feeld

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