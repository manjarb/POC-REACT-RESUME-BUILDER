import renderer from 'react-test-renderer';
import { describe, expect,it } from 'vitest';

import { IUserExperience } from '../../../../../common/constants';

import BasicExperience from './BasicExperience';

describe('BasicExperience Component', () => {
  const defaultExperiences: IUserExperience[] = [
    {
      title: 'Software Engineer',
      startDate: '2021-01-01',
      endDate: '2022-01-01',
      company: 'Tech Corp',
      location: 'New York, NY',
      description: 'Developed and maintained web applications.',
    },
    {
      title: 'Junior Developer',
      startDate: '2019-01-01',
      endDate: '2020-12-31',
      company: 'Web Solutions',
      location: 'San Francisco, CA',
      description: 'Assisted in the development of web projects.',
    },
  ];

  const setup = (props = {}) => {
    return renderer.create(
      <BasicExperience
        baseFontSize={12}
        titleColor="#000000"
        experiences={defaultExperiences}
        {...props}
      />,
    );
  };

  it('renders without crashing', () => {
    const tree = setup().toJSON();
    expect(tree).toBeTruthy();
  });
});
