import renderer from 'react-test-renderer';
import { describe, expect,it } from 'vitest';

import {
  ColorCode,
  FontFamily,
  ITemplateSectionDataDetail,
  IUserData,
  TemplateSection,
} from '../../../common/constants';

import BasicTemplate from './BasicTemplate';

describe('BasicTemplate Component', () => {
  const setup = (props = {}) => {
    const templateData: ITemplateSectionDataDetail = {
      formValue: {
        fontFamily: FontFamily.ARIAL,
        baseFontSize: 14,
        lineSpacing: 1.5,
        headerTextColor: ColorCode.BLACK,
        headerPadding: 20,
        rightColumnBgColor: ColorCode.DARK_BLUE,
        headerBackgroundColor: ColorCode.WHITE,
        titleColor: ColorCode.BLACK,
        watermarkUrl: '',
      },
      left: [TemplateSection.DESCRIPTION, TemplateSection.EXPERIENCES],
      right: [TemplateSection.CERTIFICATIONS, TemplateSection.SKILLS],
    };

    const userData: Partial<IUserData> = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      linkedin: 'linkedin.com/in/johndoe',
      address: '123 Main St, Springfield, USA',
      description:
        'A highly motivated software engineer with a passion for development.',
      experiences: [
        {
          title: 'Software Engineer',
          startDate: '2021-01-01',
          endDate: '2022-01-01',
          company: 'Tech Corp',
          location: 'New York, NY',
          description: 'Developed and maintained web applications.',
        },
      ],
      education: [
        {
          degree: 'Degree name',
          major: 'Major name',
          university: 'University name',
          location: 'location',
          startDate: 'Start date',
          endDate: 'End date',
          description: 'Your degree detail',
        },
      ],
      certifications: [
        { name: 'Certified JavaScript Developer', date: '2023-01-01' },
      ],
      skills: [{ name: 'JavaScript', score: 9 }, { name: 'React', score: 8 }],
    };

    return renderer.create(
      <BasicTemplate
        templateData={templateData}
        userData={userData}
        {...props}
      />,
    );
  };

  it('renders without crashing', () => {
    const tree = setup().toJSON();
    expect(tree).toBeTruthy();
  });
});
