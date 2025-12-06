/**
 * Screen Objects and Helper Functions for Detox E2E Tests
 *
 * This file contains:
 * - Page Object Models (POM) for each screen
 * - Utility functions for common test operations
 * - Color extraction and comparison helpers
 */

/**
 * WelcomeScreen - Page Object Model for the welcome/index screen
 */
export class WelcomeScreen {
  constructor() {
    this.welcomeContainer = element(by.id('element-welcome-screen'));
    this.getStartedButton = element(by.id('action-get-started'));
  }

  /**
   * Assert that all elements on the welcome screen are visible
   */
  async assertVisible() {
    await expect(this.welcomeContainer).toBeVisible();
    await expect(this.getStartedButton).toBeVisible();
  }

  async tapGetStarted() {
    await this.getStartedButton.tap();
  }
}

/**
 * PaletteScreen - Page Object Model for the palette/generator screen
 */
export class PaletteScreen {
  constructor() {
    this.paletteContainer = element(by.id('element-palette-container'));
    this.generateAllButton = element(by.id('action-generate-all'));
    this.unlockAllButton = element(by.id('action-unlock-all'));
    this.viewInfoButton = element(by.id('action-view-info'));
    this.viewSettingsButton = element(by.id('action-view-settings'));
    this.sharePaletteButton = element(by.id('action-share-palette'));
  }

  /**
   * Get a color cell element by index
   * @param {number} index - The index of the color cell (0-4)
   * @returns {Detox.IndexableNativeElement}
   */
  getColorCell(index) {
    return element(by.id(`action-color-cell-${index}`));
  }

  /**
   * Get the color text element by index
   * @param {number} index - The index of the color cell (0-4)
   * @returns {Detox.IndexableNativeElement}
   */
  getColorCellText(index) {
    return element(by.id(`action-color-cell-${index}-text`));
  }

  /**
   * Get the lock element by index (the tappable Pressable)
   * @param {number} index - The index of the color cell (0-4)
   * @returns {Detox.IndexableNativeElement}
   */
  getColorCellLock(index) {
    return element(by.id(`action-color-cell-${index}-lock`));
  }

  /**
   * Get the lock icon element by index (the visual icon inside the Pressable)
   * @param {number} index - The index of the color cell (0-4)
   * @returns {Detox.IndexableNativeElement}
   */
  getColorCellLockIcon(index) {
    return element(by.id(`action-color-cell-${index}-lock-icon`));
  }

  /**
   * Assert that all elements on the palette screen are visible
   * This includes all UI controls and all 5 color cells
   */
  async assertVisible() {
    // Assert main container is visible
    await expect(this.paletteContainer).toBeVisible();

    // Assert all action buttons are visible
    await expect(this.generateAllButton).toBeVisible();
    await expect(this.unlockAllButton).toBeVisible();
    await expect(this.viewInfoButton).toBeVisible();
    await expect(this.viewSettingsButton).toBeVisible();
    await expect(this.sharePaletteButton).toBeVisible();

    // Assert all 5 color cells and their text are visible
    for (let i = 0; i < 5; i++) {
      await expect(this.getColorCell(i)).toBeVisible();
      await expect(this.getColorCellText(i)).toBeVisible();
      await expect(this.getColorCellLockIcon(i)).toBeVisible();
    }
  }

  /**
   * Tap the generate all button
   */
  async tapGenerateAll() {
    await this.generateAllButton.tap();
  }

  /**
   * Tap a specific color cell
   * @param {number} index - The index of the color cell to tap
   */
  async tapColorCell(index) {
    await this.getColorCell(index).tap();
  }

  /**
   * Tap the lock for a specific color cell
   * @param {number} index - The index of the color cell
   */
  async tapColorCellLock(index) {
    await this.getColorCellLock(index).tap();
  }

  /**
   * Tap the unlock all button
   */
  async tapUnlockAll() {
    await this.unlockAllButton.tap();
  }
}

/**
 * Color Utilities - Helper functions for extracting and comparing colors
 */
export class ColorUtils {
  /**
   * Extract the hex color value from a color cell's text element
   * @param {Detox.IndexableNativeElement} textElement - The text element containing the hex code
   * @returns {Promise<string>} The hex color code (e.g., "#FF5733")
   */
  static async getHexFromText(textElement) {
    const attributes = await textElement.getAttributes();
    return attributes.text;
  }

  /**
   * Extract the background color from a color cell element
   * @param {Detox.IndexableNativeElement} cellElement - The color cell element
   * @returns {Promise<string>} The background color value
   */
  static async getBackgroundColor(cellElement) {
    const attributes = await cellElement.getAttributes();
    // Background color is in the style attribute
    if (attributes.style && attributes.style.backgroundColor) {
      return attributes.style.backgroundColor;
    }
    throw new Error('Unable to extract background color from element');
  }

  /**
   * Get both hex text and background color for a color cell
   * @param {PaletteScreen} paletteScreen - The palette screen object
   * @param {number} index - The index of the color cell
   * @returns {Promise<{hexText: string, backgroundColor: string}>}
   */
  static async getColorCellColors(paletteScreen, index) {
    const hexText = await this.getHexFromText(paletteScreen.getColorCellText(index));
    const backgroundColor = await this.getBackgroundColor(paletteScreen.getColorCell(index));
    return { hexText, backgroundColor };
  }

  /**
   * Get all color cell colors from the palette
   * @param {PaletteScreen} paletteScreen - The palette screen object
   * @returns {Promise<Array<{hexText: string, backgroundColor: string}>>}
   */
  static async getAllColorCellColors(paletteScreen) {
    const colors = [];
    for (let i = 0; i < 5; i++) {
      const cellColors = await this.getColorCellColors(paletteScreen, i);
      colors.push(cellColors);
    }
    return colors;
  }

  /**
   * Normalize color format for comparison
   * Converts various color formats to uppercase hex without alpha channel
   * @param {string} color - The color string to normalize
   * @returns {string} Normalized color (e.g., "#FF5733")
   */
  static normalizeColor(color) {
    // If it's already in hex format, just uppercase it
    if (color.startsWith('#')) {
      return color.toUpperCase().substring(0, 7); // Take only #RRGGBB
    }

    // If it's in rgba format, we might need to convert
    // This is a placeholder - actual implementation may vary based on what Detox returns
    return color.toUpperCase();
  }

  /**
   * Compare two color values
   * @param {string} color1 - First color to compare
   * @param {string} color2 - Second color to compare
   * @returns {boolean} True if colors match
   */
  static colorsMatch(color1, color2) {
    const normalized1 = this.normalizeColor(color1);
    const normalized2 = this.normalizeColor(color2);
    return normalized1 === normalized2;
  }

  /**
   * Assert that hex text matches background color for a color cell
   * @param {string} hexText - The hex text from the text element
   * @param {string} backgroundColor - The background color from the cell element
   */
  static assertHexMatchesBackground(hexText, backgroundColor) {
    expect(this.colorsMatch(hexText, backgroundColor)).toBe(true);
  }
}

/**
 * Navigation Helpers
 */
export class NavigationHelpers {
  /**
   * Navigate from welcome screen to palette screen
   */
  static async navigateToPalette() {
    const welcomeScreen = new WelcomeScreen();
    await welcomeScreen.tapGetStarted();
    const paletteScreen = new PaletteScreen();
    await paletteScreen.assertVisible();
  }
}
