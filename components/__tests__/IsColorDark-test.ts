import { isColorDark } from '../IsColorDark';

describe('isColorDark', () => {
  describe('light colors', () => {
    it('should return false for white (#FFFFFF)', () => {
      expect(isColorDark('#FFFFFF')).toBe(false);
    });

    it('should return false for light gray (#CCCCCC)', () => {
      expect(isColorDark('#CCCCCC')).toBe(false);
    });

    it('should return false for light yellow (#FFFF00)', () => {
      expect(isColorDark('#FFFF00')).toBe(false);
    });

    it('should return false for light cyan (#00FFFF)', () => {
      expect(isColorDark('#00FFFF')).toBe(false);
    });

    it('should return false for light green (#00FF00)', () => {
      expect(isColorDark('#00FF00')).toBe(false);
    });

    it('should return false for light pink (#FFC0CB)', () => {
      expect(isColorDark('#FFC0CB')).toBe(false);
    });
  });

  describe('dark colors', () => {
    it('should return true for black (#000000)', () => {
      expect(isColorDark('#000000')).toBe(true);
    });

    it('should return true for dark gray (#333333)', () => {
      expect(isColorDark('#333333')).toBe(true);
    });

    it('should return true for dark blue (#0000FF)', () => {
      expect(isColorDark('#0000FF')).toBe(true);
    });

    it('should return true for dark red (#FF0000)', () => {
      expect(isColorDark('#FF0000')).toBe(true);
    });

    it('should return true for dark green (#008000)', () => {
      expect(isColorDark('#008000')).toBe(true);
    });

    it('should return true for navy blue (#000080)', () => {
      expect(isColorDark('#000080')).toBe(true);
    });
  });

  describe('edge cases near threshold', () => {
    it('should correctly identify color just below threshold (luma < 128)', () => {
      // A color with luma approximately 127
      expect(isColorDark('#787878')).toBe(true);
    });

    it('should correctly identify color just above threshold (luma >= 128)', () => {
      // A color with luma approximately 128
      expect(isColorDark('#808080')).toBe(false);
    });
  });

  describe('real-world color examples', () => {
    it('should return true for Material Design primary dark (#1976D2)', () => {
      expect(isColorDark('#1976D2')).toBe(true);
    });

    it('should return false for Material Design primary light (#BBDEFB)', () => {
      expect(isColorDark('#BBDEFB')).toBe(false);
    });

    it('should return true for Bootstrap primary (#0d6efd)', () => {
      expect(isColorDark('#0d6efd')).toBe(true);
    });

    it('should return false for Bootstrap warning (#ffc107)', () => {
      expect(isColorDark('#ffc107')).toBe(false);
    });
  });
});
