import { PaletteScreen, ColorUtils, NavigationHelpers } from './helpers/screen-objects';

describe('Palette Screen', () => {
  let paletteScreen;

  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
    paletteScreen = new PaletteScreen();
    // Navigate to the palette screen before each test
    await NavigationHelpers.navigateToPalette();
  });

  /**
   * Test: Generate all test
   * Given that I am on the palette view, I should be able to retrieve and store
   * the initial color values of each cell. If I click the "Generate all" button,
   * I should retrieve the cell color values again and for each cell, its initial
   * color should NOT match its color after clicking generate.
   * Note: When asserting, you should assert that the hex code in the Color Text
   * DOES match the color value in the style attribute of colorCellTestID
   */
  it('should update all color cells when Generate All is tapped', async () => {
    // Retrieve and store initial color values for all cells
    const initialColors = await ColorUtils.getAllColorCellColors(paletteScreen);

    // Verify initial state: hex text should match background color for each cell
    for (let i = 0; i < initialColors.length; i++) {
      ColorUtils.assertHexMatchesBackground(
        initialColors[i].hexText,
        initialColors[i].backgroundColor
      );
    }

    // Tap the Generate All button
    await paletteScreen.tapGenerateAll();

    // Retrieve color values after tapping Generate All
    const updatedColors = await ColorUtils.getAllColorCellColors(paletteScreen);

    // Assert that each cell's color has changed
    for (let i = 0; i < initialColors.length; i++) {
      // Assert initial color does NOT match updated color
      expect(ColorUtils.colorsMatch(
        initialColors[i].hexText,
        updatedColors[i].hexText
      )).toBe(false);

      // Assert hex text matches background color after update
      ColorUtils.assertHexMatchesBackground(
        updatedColors[i].hexText,
        updatedColors[i].backgroundColor
      );
    }
  });

  /**
   * Test: Individual Color Cell test
   * Given that I am on the palette view and the palette cell is NOT locked,
   * I should be able to retrieve its initial color value (hex string text, and
   * background color of cell) -> tap that pressable element to trigger a color
   * change -> and assert that the initial color value does NOT match its current value
   */
  it('should update a single color cell when unlocked and cell is tapped', async () => {
    const cellIndex = 0;

    // Retrieve and store initial color values for the first cell
    const initialColors = await ColorUtils.getColorCellColors(paletteScreen, cellIndex);

    // Verify hex text matches background color initially
    ColorUtils.assertHexMatchesBackground(
      initialColors.hexText,
      initialColors.backgroundColor
    );

    // Tap the first cell to trigger a color change
    await paletteScreen.tapColorCell(cellIndex);

    // Retrieve color values after tapping
    const updatedColors = await ColorUtils.getColorCellColors(paletteScreen, cellIndex);

    // Assert initial color does NOT match updated color
    expect(ColorUtils.colorsMatch(
      initialColors.hexText,
      updatedColors.hexText
    )).toBe(false);

    // Assert hex text matches background color after update
    ColorUtils.assertHexMatchesBackground(
      updatedColors.hexText,
      updatedColors.backgroundColor
    );
  });

  /**
   * Test: Individual Color Cell test - WHEN LOCKED - via tapping cell
   * Given that I am on the palette view and the palette cell IS locked,
   * I should be able to retrieve its initial color value (hex string text, and
   * background color of cell) -> tap that pressable lock element to prevent a
   * color change from happening -> click that cell element -> and assert that
   * the initial color value DOES match its current value because the lock
   * prevents it from changing
   */
  it('should not update single cell when locked - when single cell is tapped', async () => {
    const cellIndex = 0;

    // Retrieve and store initial color values for the first cell
    const initialColors = await ColorUtils.getColorCellColors(paletteScreen, cellIndex);

    // Verify hex text matches background color initially
    ColorUtils.assertHexMatchesBackground(
      initialColors.hexText,
      initialColors.backgroundColor
    );

    // Tap the lock icon to lock the first cell
    await paletteScreen.tapColorCellLock(cellIndex);

    // Tap the first cell to attempt a color change
    await paletteScreen.tapColorCell(cellIndex);

    // Retrieve color values after tapping
    const updatedColors = await ColorUtils.getColorCellColors(paletteScreen, cellIndex);

    // Assert initial color DOES match updated color (because it's locked)
    expect(ColorUtils.colorsMatch(
      initialColors.hexText,
      updatedColors.hexText
    )).toBe(true);

    // Assert hex text still matches background color
    ColorUtils.assertHexMatchesBackground(
      updatedColors.hexText,
      updatedColors.backgroundColor
    );
  });

  /**
   * Test: Individual Color Cell test - WHEN LOCKED - via tapping generate all
   * Given that I am on the palette view, I should be able to retrieve its initial
   * color value (hex string text, and background color of cell) -> tap that
   * pressable lock element to prevent a color change from happening -> click the
   * Generate All element -> and assert that the initial color value DOES match its
   * current value because the lock prevents it from changing AND all the elements
   * not currently locked DID change from their initial color value
   */
  it('should not update single cell when locked - when Generate All is tapped', async () => {
    const lockedCellIndex = 0;

    // Retrieve and store initial color values for all cells
    const initialColors = await ColorUtils.getAllColorCellColors(paletteScreen);

    // Verify hex text matches background color for all cells initially
    for (let i = 0; i < initialColors.length; i++) {
      ColorUtils.assertHexMatchesBackground(
        initialColors[i].hexText,
        initialColors[i].backgroundColor
      );
    }

    // Tap the lock icon to lock the first cell
    await paletteScreen.tapColorCellLock(lockedCellIndex);

    // Tap the Generate All button
    await paletteScreen.tapGenerateAll();

    // Retrieve color values after tapping Generate All
    const updatedColors = await ColorUtils.getAllColorCellColors(paletteScreen);

    // Assert locked cell (index 0) color DOES match initial color
    expect(ColorUtils.colorsMatch(
      initialColors[lockedCellIndex].hexText,
      updatedColors[lockedCellIndex].hexText
    )).toBe(true);

    // Assert unlocked cells (indices 1-4) colors do NOT match initial colors
    for (let i = 1; i < initialColors.length; i++) {
      expect(ColorUtils.colorsMatch(
        initialColors[i].hexText,
        updatedColors[i].hexText
      )).toBe(false);

      // Verify hex text matches background color after update
      ColorUtils.assertHexMatchesBackground(
        updatedColors[i].hexText,
        updatedColors[i].backgroundColor
      );
    }
  });
});
