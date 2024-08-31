import {
  Document,
  Font,
  Image,
  Page,
  Styles,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { useMemo } from 'react';

import {
  ColorCode,
  FontFamily,
  ITemplateSectionDataDetail,
  IUserData,
  TemplateSection,
} from '../../../common/constants';
import IconBox from '../components/IconBox/IconBox';
import { useTemplateLayout } from '../hooks/useTemplateLayout/useTemplateLayout';

import BasicCertification from './components/BasicCertification/BasicCertification';
import BasicEducation from './components/BasicEducation/BasicEducation';
import BasicExperience from './components/BasicExperience/BasicExperience';
import BasicSkill from './components/BasicSkill/BasicSkill';
import BasicSummary from './components/BasicSummary/BasicSummary';

import EmailIcon from '/assets/icons/email_icon.png';
import LinkIcon from '/assets/icons/link_icon.png';
import LocationIcon from '/assets/icons/location_icon.png';
// import Arial from '../../../assets/fonts/arial/ARIAL.TTF';
// import BoldArial from '../fonts/arial/ARIALBD.TTF';

interface IBasicTemplateProps {
  templateData: ITemplateSectionDataDetail;
  userData: IUserData;
}

Font.register({
  family: FontFamily.ARIAL,
  fonts: [
    { src: '/assets/fonts/arial/ARIAL.TTF' },
    { src: '/assets/fonts/arial/ARIALBD.TTF', fontWeight: 700 },
  ],
});

Font.register({
  family: FontFamily.TIMES_NEW_ROMAN,
  fonts: [
    {
      src: '/assets/fonts/timesNewRoman/Times New Roman.ttf',
    },
    {
      src: '/assets/fonts/timesNewRoman/Times New Roman Bold.ttf',
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: FontFamily.GEORGIA,
  fonts: [
    {
      src: '/assets/fonts/georgia/georgia.ttf',
    },
    {
      src: '/assets/fonts/georgia/georgiab.ttf',
      fontWeight: 700,
    },
  ],
});

export default function BasicTemplate({
  templateData,
  userData,
}: IBasicTemplateProps) {
  const {
    formValue: {
      fontFamily,
      baseFontSize = 14,
      lineSpacing,
      headerTextColor,
      headerPadding = 0,
      rightColumnBgColor,
      headerBackgroundColor,
      titleColor = ColorCode.BLACK,
      watermarkUrl,
    },
    left,
    right,
  } = templateData;
  const {
    firstName,
    lastName,
    experiences,
    email,
    linkedin,
    address,
    description,
    education,
    certifications,
    skills,
  } = userData;
  const { calculateHeaderTitle } = useTemplateLayout();

  const pageStyle = useMemo(() => {
    return StyleSheet.create({
      page: {
        fontFamily,
        fontSize: `${baseFontSize}px`,
        lineHeight: lineSpacing,
        display: 'flex',
      },
      iconWrap: {
        marginRight: '10px',
        marginBottom: '5px',
      },
      container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'stretch',
      },
      leftBox: {
        width: '65%',
        backgroundColor: headerBackgroundColor,
      },
      rightBox: {
        width: '35%',
        backgroundColor: rightColumnBgColor,
        color: ColorCode.WHITE,
      },
      headerTitle: {
        fontSize: calculateHeaderTitle(baseFontSize, 2),
        color: headerTextColor,
        marginBottom: '5px',
      },
      iconContainer: {
        marginTop: '5px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      subtitle: {
        marginBottom: '5px',
      },
      leftContainer: {
        paddingLeft: '40px',
        paddingTop: `${headerPadding}px`,
        paddingBottom: `${headerPadding}px`,
      },
      contentBox: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
      },
      leftContentBox: {
        paddingLeft: '40px',
        width: '65%',
      },
      leftContent: {
        paddingRight: '15px',
      },
      rightContent: {
        paddingLeft: '15px',
      },
      rightContentBox: {
        paddingRight: '40px',
        width: '35%',
        backgroundColor: rightColumnBgColor,
        color: ColorCode.WHITE,
      },
      sectionBox: {
        marginBottom: '15px',
      },
      sectionListBox: {
        marginBottom: '10px',
      },
      watermarkUrl: {
        position: 'absolute',
        top: '30%' /* Move to the center vertically */,
        left: '100' /* Move to the center horizontally */,
        width: '200px',
        opacity: 0.5,
      },
    });
  }, [templateData]);

  const iconFontSize = baseFontSize ? baseFontSize * 0.65 : 14;

  const LeftContent = ({ section }: { section: TemplateSection }) => {
    switch (section) {
    case TemplateSection.DESCRIPTION:
      return (
        <View style={pageStyle.sectionBox}>
          <BasicSummary text={description} baseFontSize={baseFontSize} />
        </View>
      );
    case TemplateSection.EXPERIENCES:
      return (
        <View style={pageStyle.sectionBox}>
          <BasicExperience
            baseFontSize={baseFontSize}
            titleColor={titleColor}
            experiences={experiences}
          />
        </View>
      );
    case TemplateSection.EDUCATION:
      return (
        <View style={pageStyle.sectionListBox}>
          <BasicEducation
            baseFontSize={baseFontSize}
            titleColor={titleColor}
            educations={education}
          />
        </View>
      );
    default:
      break;
    }
    return null;
  };

  const RightContent = ({ section }: { section: TemplateSection }) => {
    switch (section) {
    case TemplateSection.CERTIFICATIONS:
      return (
        <View style={pageStyle.sectionBox}>
          <BasicCertification
            baseFontSize={baseFontSize}
            certifications={certifications}
          />
        </View>
      );
    case TemplateSection.SKILLS:
      return (
        <View style={pageStyle.sectionBox}>
          <BasicSkill baseFontSize={baseFontSize} skills={skills} />
        </View>
      );
    default:
      break;
    }

    return null;
  };

  return (
    <Document>
      <Page style={pageStyle.page}>
        {/* Header Section */}
        <View style={pageStyle.container}>
          <View style={pageStyle.leftBox}>
            <View style={pageStyle.leftContainer}>
              <Text style={pageStyle.headerTitle}>
                {firstName} {lastName}
              </Text>
              {experiences.length > 0 && (
                <Text style={pageStyle.subtitle}>{experiences[0].title}</Text>
              )}
              <View style={pageStyle.iconContainer}>
                <View style={pageStyle.iconWrap}>
                  <IconBox
                    title={email}
                    icon={EmailIcon}
                    fontSize={iconFontSize}
                  />
                </View>

                <View style={pageStyle.iconWrap}>
                  <IconBox
                    title={linkedin}
                    icon={LinkIcon}
                    fontSize={iconFontSize}
                  />
                </View>

                <View style={pageStyle.iconWrap}>
                  <IconBox
                    title={address}
                    icon={LocationIcon}
                    fontSize={iconFontSize}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={pageStyle.rightBox} />
        </View>
        {/* Content Section */}
        <View style={pageStyle.contentBox}>
          {watermarkUrl && (
            <View>
              <Image src={watermarkUrl} style={pageStyle.watermarkUrl} />
            </View>
          )}
          <View style={pageStyle.leftContentBox}>
            <View style={pageStyle.leftContent}>
              {left.map((l) => (
                <LeftContent key={l} section={l as TemplateSection} />
              ))}
            </View>
          </View>
          <View style={pageStyle.rightContentBox}>
            <View style={pageStyle.rightContent}>
              {right.map((r) => (
                <RightContent key={r} section={r as TemplateSection} />
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
