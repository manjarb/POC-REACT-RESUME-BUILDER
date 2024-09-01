import renderer from 'react-test-renderer';
import { describe, expect, it } from 'vitest';

import { IUserSkill } from '../../../../../common/constants';

import BasicSkill from './BasicSkill';

describe('BasicSkill Component', () => {
  const defaultSkills: IUserSkill[] = [
    { name: 'JavaScript', score: 10 },
    { name: 'React', score: 9 },
    { name: 'Node.js', score: 8 },
  ];

  const setup = (props = {}) => {
    return renderer.create(
      <BasicSkill baseFontSize={12} skills={defaultSkills} {...props} />,
    );
  };

  it('renders without crashing', () => {
    const tree = setup().toJSON();
    expect(tree).toBeTruthy();
  });
});
