import renderer from 'react-test-renderer';
import { describe, expect,it } from 'vitest';

import HRLine from './HRLine';

describe('HRLine Component', () => {
  const setup = (props = {}) => {
    return renderer.create(<HRLine {...props} />);
  };

  it('renders without crashing', () => {
    const tree = setup().toJSON();
    expect(tree).toBeTruthy();
  });
});
