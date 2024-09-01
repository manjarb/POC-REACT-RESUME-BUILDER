import renderer from 'react-test-renderer';
import { describe, expect,it } from 'vitest';

import { IUserEducation } from '../../../../../common/constants';

import BasicEducation from './BasicEducation';

describe('BasicEducation Component', () => {
  const defaultEducations: IUserEducation[] = [
    {
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      startDate: '2020-05-01',
      endDate: '2020-05-01',
      university: 'University of Example',
      location: 'Example City, EC',
      description: 'description',
    },
    {
      degree: 'Master of Science',
      major: 'Software Engineering',
      startDate: '2020-05-01',
      endDate: '2022-05-01',
      university: 'Example University',
      location: 'Example Town, ET',
      description: 'description',
    },
  ];

  const setup = (props = {}) => {
    return renderer.create(
      <BasicEducation
        baseFontSize={12}
        titleColor="#000000"
        educations={defaultEducations}
        {...props}
      />,
    );
  };

  it('renders without crashing', () => {
    const tree = setup().toJSON();
    expect(tree).toBeTruthy();
  });
});
