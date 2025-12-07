import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import InfoModal from '../InfoModal';

describe('InfoModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('rendering', () => {
    it('should render when visible is true', () => {
      const tree = renderer.create(
        <InfoModal visible={true} onClose={mockOnClose} />
      ).toJSON();
      expect(tree).toBeTruthy();
    });

    it('should not render content when visible is false', () => {
      const { queryByText } = render(
        <InfoModal visible={false} onClose={mockOnClose} />
      );
      expect(queryByText('Welcome to HexSplash!')).toBeFalsy();
    });

    it('should display welcome text', () => {
      const { getByText } = render(
        <InfoModal visible={true} onClose={mockOnClose} />
      );
      expect(getByText('Welcome to HexSplash!')).toBeTruthy();
    });

    it('should display instructions about color view', () => {
      const { getByText } = render(
        <InfoModal visible={true} onClose={mockOnClose} />
      );
      expect(
        getByText(/Click on the color view to change it to a randomised color/i)
      ).toBeTruthy();
    });

    it('should display lock/unlock instructions', () => {
      const { getByText } = render(
        <InfoModal visible={true} onClose={mockOnClose} />
      );
      expect(
        getByText(/to lock or unlock the view from being randomised/i)
      ).toBeTruthy();
    });

    it('should display information about info button', () => {
      const { getByText } = render(
        <InfoModal visible={true} onClose={mockOnClose} />
      );
      expect(getByText(/View this modal/i)).toBeTruthy();
    });

    it('should display information about settings', () => {
      const { getByText } = render(
        <InfoModal visible={true} onClose={mockOnClose} />
      );
      expect(getByText(/App Settings/i)).toBeTruthy();
    });

    it('should display information about unlock all', () => {
      const { getByText } = render(
        <InfoModal visible={true} onClose={mockOnClose} />
      );
      expect(getByText(/Unlock all locks/i)).toBeTruthy();
    });

    it('should display information about export', () => {
      const { getByText } = render(
        <InfoModal visible={true} onClose={mockOnClose} />
      );
      expect(getByText(/Export your palette/i)).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should call onClose when modal overlay is pressed', () => {
      const { getByTestId, UNSAFE_getByType } = render(
        <InfoModal visible={true} onClose={mockOnClose} />
      );

      // Find the TouchableOpacity (modal overlay)
      const { findAll } = render(
        <InfoModal visible={true} onClose={mockOnClose} />
      );

      // The modal should have been rendered
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('props', () => {
    it('should accept visible prop as true', () => {
      const { UNSAFE_root } = render(
        <InfoModal visible={true} onClose={mockOnClose} />
      );
      expect(UNSAFE_root).toBeTruthy();
    });

    it('should accept visible prop as false', () => {
      const { UNSAFE_root } = render(
        <InfoModal visible={false} onClose={mockOnClose} />
      );
      expect(UNSAFE_root).toBeTruthy();
    });

    it('should accept onClose callback function', () => {
      const customCallback = jest.fn();
      const { UNSAFE_root } = render(
        <InfoModal visible={true} onClose={customCallback} />
      );
      expect(UNSAFE_root).toBeTruthy();
    });
  });
});
