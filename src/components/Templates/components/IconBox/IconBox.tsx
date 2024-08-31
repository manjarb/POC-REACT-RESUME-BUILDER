import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';

interface IIconBoxProps {
  title: string;
  icon: string;
  fontSize?: number
}

const pageStyle = StyleSheet.create({
  iconBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: '5px',
    width: '12px',
  },
});

export default function IconBox({ title, icon, fontSize = 14 }: IIconBoxProps) {
  return (
    <View style={pageStyle.iconBox}>
      <Image style={pageStyle.icon} src={icon} />
      <Text style={{ fontSize: `${fontSize}px` }}>{title}</Text>
    </View>
  );
}
