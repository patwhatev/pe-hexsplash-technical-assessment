import { PaletteScreen, ColorUtils, NavigationHelpers } from './helpers/screen-objects';
import { expect as jestExpect } from '@jest/globals';

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
   */
  it('should update all color cells when Generate All is tapped', async () => {
    // Retrieve and store initial color values for all cells
    const initialColors = await ColorUtils.getAllColorCellColors(paletteScreen);

    // Tap the Generate All button
    await paletteScreen.tapGenerateAll();

    // Retrieve color values after tapping Generate All
    const updatedColors = await ColorUtils.getAllColorCellColors(paletteScreen);

    // Assert that each cell's color has changed
    for (let i = 0; i < initialColors.length; i++) {
      // Assert initial color does NOT match updated color
      jestExpect(ColorUtils.normalizeColor(initialColors[i]))
        .not.toBe(ColorUtils.normalizeColor(updatedColors[i]));
    }
  });

  /**
   * Test: Individual Color Cell test
   * Given that I am on the palette view and the palette cell is NOT locked,
   * I should be able to retrieve its initial color value -> tap that pressable
   * element to trigger a color change -> and assert that the initial color value
   * does NOT match its current value
   */
  it('should update a single color cell when unlocked and cell is tapped', async () => {
    const cellIndex = 0;

    // Retrieve and store initial color value for the first cell
    const initialColor = await ColorUtils.getColorCellColor(paletteScreen, cellIndex);

    // Tap the first cell to trigger a color change
    await paletteScreen.tapColorCell(cellIndex);

    // Retrieve color value after tapping
    const updatedColor = await ColorUtils.getColorCellColor(paletteScreen, cellIndex);

    // Assert initial color does NOT match updated color
    jestExpect(ColorUtils.normalizeColor(initialColor))
      .not.toBe(ColorUtils.normalizeColor(updatedColor));
  });

  /**
   * Test: Individual Color Cell test - WHEN LOCKED - via tapping cell
   * Given that I am on the palette view and the palette cell IS locked,
   * I should be able to retrieve its initial color value -> tap that pressable
   * lock element to prevent a color change from happening -> click that cell
   * element -> and assert that the initial color value DOES match its current
   * value because the lock prevents it from changing
   */
  it('should not update single cell when locked - when single cell is tapped', async () => {
    const cellIndex = 0;

    // Retrieve and store initial color value for the first cell
    const initialColor = await ColorUtils.getColorCellColor(paletteScreen, cellIndex);

    // Tap the lock icon to lock the first cell
    await paletteScreen.tapColorCellLock(cellIndex);

    // Tap the first cell to attempt a color change
    await paletteScreen.tapColorCell(cellIndex);

    // Retrieve color value after tapping
    const updatedColor = await ColorUtils.getColorCellColor(paletteScreen, cellIndex);

    // Assert initial color DOES match updated color (because it's locked)
    jestExpect(ColorUtils.normalizeColor(initialColor))
      .toBe(ColorUtils.normalizeColor(updatedColor));
  });

  /**
   * Test: Individual Color Cell test - WHEN LOCKED - via tapping generate all
   * Given that I am on the palette view, I should be able to retrieve its initial
   * color value -> tap that pressable lock element to prevent a color change from
   * happening -> click the Generate All element -> and assert that the initial
   * color value DOES match its current value because the lock prevents it from
   * changing AND all the elements not currently locked DID change from their
   * initial color value
   */
  it('should not update single cell when locked - when Generate All is tapped', async () => {
    const lockedCellIndex = 0;

    // Retrieve and store initial color values for all cells
    const initialColors = await ColorUtils.getAllColorCellColors(paletteScreen);

    // Tap the lock icon to lock the first cell
    await paletteScreen.tapColorCellLock(lockedCellIndex);

    // Tap the Generate All button
    await paletteScreen.tapGenerateAll();

    // Retrieve color values after tapping Generate All
    const updatedColors = await ColorUtils.getAllColorCellColors(paletteScreen);

    // Assert locked cell (index 0) color DOES match initial color
    jestExpect(ColorUtils.normalizeColor(initialColors[lockedCellIndex]))
      .toBe(ColorUtils.normalizeColor(updatedColors[lockedCellIndex]));

    // Assert unlocked cells (indices 1-4) colors do NOT match initial colors
    for (let i = 1; i < initialColors.length; i++) {
      jestExpect(ColorUtils.normalizeColor(initialColors[i]))
        .not.toBe(ColorUtils.normalizeColor(updatedColors[i]));
    }
  });
});
