/**
 * Detox E2E Test Setup
 *
 * This file configures test lifecycle hooks to capture screenshots
 * and other artifacts when tests fail.
 */

beforeEach(async () => {
  // Optional: You can add setup logic here if needed
});

afterEach(async function () {
  // Capture screenshot on test failure
  if (this.currentTest && this.currentTest.status === 'failed') {
    const testName = this.currentTest.fullTitle.replace(/\s+/g, '_');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotName = `FAILED_${testName}_${timestamp}`;

    try {
      await device.takeScreenshot(screenshotName);
    } catch (error) {
      console.error('Failed to take screenshot:', error);
    }
  }
});
