import renderer from 'react-test-renderer';
import { describe, expect,it } from 'vitest';

import { IUserCertification } from '../../../../../common/constants';

import BasicCertification from './BasicCertification';

describe('BasicCertification Component', () => {
  const defaultCertifications: IUserCertification[] = [
    { name: 'Certified JavaScript Developer', date: '2023-01-01' },
    { name: 'Certified React Developer', date: '2023-06-01' },
  ];

  it('renders without crashing', () => {
    const tree = renderer
      .create(
        <BasicCertification
          baseFontSize={12}
          certifications={defaultCertifications}
        />,
      )
      .toJSON();

    expect(tree).toBeTruthy();
  });
});
