import { View } from '@react-pdf/renderer';
import { ColorCode } from '../../../../common/constants';

interface IHRLineProps {
  color?: ColorCode
}

export default function HRLine({ color = ColorCode.BLACK }: IHRLineProps) {
  return (
    <View
      style={{
        width: '100%',
        height: '1px',
        borderBottom: `1px solid ${color}`,
        marginTop: '5px',
        marginBottom: '5px',
      }}
    ></View>
  );
}
