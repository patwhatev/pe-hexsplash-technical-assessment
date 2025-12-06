import { WelcomeScreen, PaletteScreen } from './helpers/screen-objects';

describe('Welcome Screen', () => {
  let welcomeScreen;

  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
    welcomeScreen = new WelcomeScreen();
  });

  /**
   * Test: Initial load of app
   * Given that I am on the welcome screen / index view,
   * I should see the welcome container, as well as the "Get Started" pressable element
   */
  it('should have welcome screen with Get Started pressable element', async () => {
    await welcomeScreen.assertVisible();
  });

  /**
   * Test: Advance to palette
   * Given that I am on the welcome screen and click "Get Started"
   * it should advance to the Palette view (I should see the palette container
   * as well as all the individual elements)
   */
  it('should show palette screen after tapping Get Started', async () => {
    await welcomeScreen.tapGetStarted();

    const paletteScreen = new PaletteScreen();
    await paletteScreen.assertVisible();
  });
});
