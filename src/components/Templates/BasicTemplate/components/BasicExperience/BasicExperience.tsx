import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { useMemo } from 'react';
import HRLine from '../../../components/HRLine/HRLine';
import { IUserExperience } from '../../../../../common/constants';

interface IBasicExperienceProps {
  baseFontSize: number;
  titleColor: string;
  experiences: IUserExperience[];
}

export default function BasicExperience({
  baseFontSize,
  titleColor,
  experiences,
}: IBasicExperienceProps) {
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

  const ExperienceBox = ({
    title,
    startDate,
    endDate,
    company,
    location,
    description,
  }: IUserExperience) => {
    return (
      <View>
        <View style={pageStyle.subtitleBox}>
          <View style={pageStyle.textWrapper}>
            <Text style={pageStyle.subtitle}>{title}</Text>
          </View>
          <Text style={pageStyle.smallText}>
            {startDate} - {endDate}
          </Text>
        </View>
        <View style={pageStyle.subtitleBox}>
          <Text style={pageStyle.subtitleColor}>{company}</Text>
          <Text style={pageStyle.smallText}>{location}</Text>
        </View>
        <View>
          <Text>{description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={pageStyle.title}>Experience</Text>
      <HRLine />
      {experiences.map(
        ({ title, startDate, endDate, company, location, description }) => (
          <View key={`${title}-${company}`} style={pageStyle.box}>
            <ExperienceBox
              title={title}
              startDate={startDate}
              endDate={endDate}
              company={company}
              location={location}
              description={description}
            />
          </View>
        ),
      )}
    </View>
  );
}
