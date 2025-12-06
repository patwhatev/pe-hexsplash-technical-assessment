describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    // Note: Do we need to reload before each test? Need to analyze and decide 
    await device.reloadReactNative();
  });

// Naming Convention
// testID="element-xxx"
// testID="action-xxx"

// Welcome Screen
// testID="element-welcome-screen"
// testID="action-get-started"

// // Palette Screen
// testID="element-palette-container"
// testID=`action-color-cell-${index}`

// Info Modal 


// Share Screen


// Settings Screen

  it('should have welcome screen with Get Started pressable elem', async () => {
    await expect(element(by.id('element-welcome-screen'))).toBeVisible();
    await expect(element(by.id('action-get-started'))).toBeVisible();
  });

  it('should show palette screen after tapping Get Started', async () => {
    await element(by.id('action-get-started')).tap();
    await expect(element(by.id('element-palette-container'))).toBeVisible();
    await expect(element(by.id('action-color-cell-0'))).toBeVisible();
  });

  it.skip('should show world screen after tap', async () => {
    await element(by.id('world_button')).tap();
    await expect(element(by.text('World!!!'))).toBeVisible();
  });
});
