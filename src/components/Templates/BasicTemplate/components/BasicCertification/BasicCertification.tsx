import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { useMemo } from 'react';

import { ColorCode, IUserCertification } from '../../../../../common/constants';
import HRLine from '../../../components/HRLine/HRLine';

interface IBasicCertificationProps {
  baseFontSize: number;
  certifications: IUserCertification[]
}

export default function BasicCertification({ baseFontSize, certifications }: IBasicCertificationProps) {
  const pageStyle = useMemo(() => {
    return StyleSheet.create({
      title: {
        fontSize: `${baseFontSize * 1.25}px`,
      },
      subtitle: {
        marginBottom: '5px',
      },
      smallText: {
        fontSize: `${baseFontSize * 0.8}px`,
      },
      box: {
        marginBottom: '12px',
      },
    });
  }, [baseFontSize]);

  const CertificationBox = ({
    name,
    date,
  }: IUserCertification) => {
    return (
      <View>
        <Text style={pageStyle.subtitle}>{name}</Text>
        <Text style={pageStyle.smallText}>{date}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={pageStyle.title}>Certification</Text>
      <HRLine color={ColorCode.WHITE}/>
      {certifications.map(({ date, name }) => (
        <View key={`${name}-${date}`} style={pageStyle.box}>
          <CertificationBox name={name} date={date} />
        </View>
      ))}
    </View>
  );
}
