import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { useMemo } from 'react';

import HRLine from '../../../components/HRLine/HRLine';


interface IBasicSummaryProps {
  text: string
  baseFontSize: number;
}

export default function BasicSummary({ text, baseFontSize }: IBasicSummaryProps) {
  const pageStyle = useMemo(() => {
    return StyleSheet.create({
      title: {
        fontSize: `${baseFontSize * 1.5}px`,
      },
    });
  }, [baseFontSize]);

  return (
    <View>
      <Text style={pageStyle.title}>Summary</Text>
      <HRLine />
      <Text>{text}</Text>
    </View>
  );
}
