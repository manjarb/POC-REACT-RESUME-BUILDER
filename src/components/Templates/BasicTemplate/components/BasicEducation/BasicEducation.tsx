import { useMemo } from 'react';
import { IUserEducation } from '../../../../../common/constants';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import HRLine from '../../../components/HRLine/HRLine';

interface IBasicEducationProps {
  baseFontSize: number;
  titleColor: string;
  educations: IUserEducation[];
}

export default function BasicEducation({ baseFontSize, titleColor, educations }: IBasicEducationProps) {
  const pageStyle = useMemo(() => {
    return StyleSheet.create({
      title: {
        fontSize: `${baseFontSize * 1.25}px`,
      },
      box: {
        marginBottom: '12px',
      },
      subtitle: {
        fontSize: `${baseFontSize * 1.15}px`,
      },
      subtitleColor: {
        fontSize: `${baseFontSize * 1.15}px`,
        color: titleColor,
        fontWeight: 'bold',
      },
      smallText: {
        fontSize: `${baseFontSize * 0.8}px`,
      },
      subtitleBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '5px',
        alignItems: 'center',
      },
      textWrapper: {
        flex: 1,
        marginRight: '5px',
      },
    });
  }, [baseFontSize, titleColor]);

  const EducationBox = ({
    degree,
    major,
    endDate,
    university,
    location,
  }: Omit<IUserEducation, 'startDate'>) => {
    return (
      <View>
        <View style={pageStyle.subtitleBox}>
          <View style={pageStyle.textWrapper}>
            <Text style={pageStyle.subtitle}>
              {degree} in {major}
            </Text>
          </View>
          <Text style={pageStyle.smallText}>{endDate}</Text>
        </View>
        <View style={pageStyle.subtitleBox}>
          <Text style={pageStyle.subtitleColor}>{university}</Text>
          <Text style={pageStyle.smallText}>{location}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={pageStyle.title}>Education</Text>
      <HRLine />
      {educations.map(
        ({ degree, major, university, endDate, location, description, school }) => (
          <View key={`${degree}-${major}`} style={pageStyle.box}>
            <EducationBox
              degree={degree}
              major={major}
              university={university || school}
              endDate={endDate}
              location={location}
              description={description}
            />
          </View>
        ),
      )}
    </View>
  );
}
