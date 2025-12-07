import Colors from '../Colors';

describe('Colors', () => {
  describe('light theme', () => {
    it('should have light theme configuration', () => {
      expect(Colors.light).toBeDefined();
    });

    it('should have correct text color for light theme', () => {
      expect(Colors.light.text).toBe('#000');
    });

    it('should have correct background color for light theme', () => {
      expect(Colors.light.background).toBe('#fff');
    });

    it('should have correct tint color for light theme', () => {
      expect(Colors.light.tint).toBe('#2f95dc');
    });

    it('should have correct tab icon default color for light theme', () => {
      expect(Colors.light.tabIconDefault).toBe('#ccc');
    });

    it('should have correct tab icon selected color for light theme', () => {
      expect(Colors.light.tabIconSelected).toBe('#2f95dc');
    });
  });

  describe('dark theme', () => {
    it('should have dark theme configuration', () => {
      expect(Colors.dark).toBeDefined();
    });

    it('should have correct text color for dark theme', () => {
      expect(Colors.dark.text).toBe('#fff');
    });

    it('should have correct background color for dark theme', () => {
      expect(Colors.dark.background).toBe('#000');
    });

    it('should have correct tint color for dark theme', () => {
      expect(Colors.dark.tint).toBe('#fff');
    });

    it('should have correct tab icon default color for dark theme', () => {
      expect(Colors.dark.tabIconDefault).toBe('#ccc');
    });

    it('should have correct tab icon selected color for dark theme', () => {
      expect(Colors.dark.tabIconSelected).toBe('#fff');
    });
  });

  describe('theme contrast', () => {
    it('should have contrasting text and background colors for light theme', () => {
      expect(Colors.light.text).not.toBe(Colors.light.background);
    });

    it('should have contrasting text and background colors for dark theme', () => {
      expect(Colors.dark.text).not.toBe(Colors.dark.background);
    });

    it('should have inverted text colors between themes', () => {
      expect(Colors.light.text).toBe(Colors.dark.background);
      expect(Colors.dark.text).toBe(Colors.light.background);
    });
  });

  describe('structure', () => {
    it('should have all required properties in light theme', () => {
      const requiredProps = ['text', 'background', 'tint', 'tabIconDefault', 'tabIconSelected'];
      requiredProps.forEach(prop => {
        expect(Colors.light).toHaveProperty(prop);
      });
    });

    it('should have all required properties in dark theme', () => {
      const requiredProps = ['text', 'background', 'tint', 'tabIconDefault', 'tabIconSelected'];
      requiredProps.forEach(prop => {
        expect(Colors.dark).toHaveProperty(prop);
      });
    });

    it('should have matching structure between light and dark themes', () => {
      const lightKeys = Object.keys(Colors.light).sort();
      const darkKeys = Object.keys(Colors.dark).sort();
      expect(lightKeys).toEqual(darkKeys);
    });
  });
});
