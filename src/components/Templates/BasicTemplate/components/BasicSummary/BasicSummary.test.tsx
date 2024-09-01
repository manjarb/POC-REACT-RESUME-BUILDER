import renderer from 'react-test-renderer';
import { describe, expect,it } from 'vitest';

import BasicSummary from './BasicSummary';

describe('BasicSummary Component', () => {
  const setup = (props = {}) => {
    return renderer.create(
      <BasicSummary
        text="This is a summary text."
        baseFontSize={12}
        {...props}
      />,
    );
  };

  it('renders without crashing', () => {
    const tree = setup().toJSON();
    expect(tree).toBeTruthy();
  });
});
