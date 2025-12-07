import * as React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';

import { MonoText } from '../StyledText';

describe('MonoText', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders children text correctly', () => {
    const { getByText } = render(<MonoText>Test Content</MonoText>);
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('applies SpaceMono font family', () => {
    const tree = renderer.create(<MonoText>Font Test</MonoText>).toJSON();
    // Style is an array, we need to check if SpaceMono is in the nested array
    const styleString = JSON.stringify(tree.props.style);
    expect(styleString).toContain('SpaceMono');
  });

  it('preserves custom styles passed via props', () => {
    const customStyle = { color: 'red', fontSize: 20 };
    const tree = renderer.create(
      <MonoText style={customStyle}>Styled Text</MonoText>
    ).toJSON();

    // Check that custom styles are present in the style array
    const styleString = JSON.stringify(tree.props.style);
    expect(styleString).toContain('red');
    expect(styleString).toContain('20');
  });

  it('combines custom styles with default SpaceMono font', () => {
    const customStyle = { color: 'blue' };
    const tree = renderer.create(
      <MonoText style={customStyle}>Combined Style</MonoText>
    ).toJSON();

    // Should have both custom style and SpaceMono font
    const styleString = JSON.stringify(tree.props.style);
    expect(styleString).toContain('blue');
    expect(styleString).toContain('SpaceMono');
  });

  it('renders without children', () => {
    const tree = renderer.create(<MonoText />).toJSON();
    expect(tree).toBeTruthy();
  });

  it('renders with multiple children', () => {
    const { getByText } = render(
      <MonoText>
        First child
        Second child
      </MonoText>
    );
    expect(getByText(/First child/)).toBeTruthy();
  });
});
