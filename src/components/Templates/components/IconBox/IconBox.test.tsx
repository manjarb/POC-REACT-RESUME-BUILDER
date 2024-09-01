import renderer from 'react-test-renderer';
import { describe, expect,it } from 'vitest';

import IconBox from './IconBox';

describe('IconBox Component', () => {
  const setup = (props = {}) => {
    return renderer.create(
      <IconBox title="Sample Title" icon="/path/to/icon.png" {...props} />,
    );
  };

  it('renders without crashing', () => {
    const tree = setup().toJSON();
    expect(tree).toBeTruthy();
  });
});
