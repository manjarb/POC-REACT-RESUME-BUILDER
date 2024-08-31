import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { useMemo } from 'react';

import { ColorCode, IUserSkill } from '../../../../../common/constants';
import HRLine from '../../../components/HRLine/HRLine';

interface IBasicSkillProps {
  baseFontSize: number;
  skills: IUserSkill[]
}

export default function BasicSkill({ baseFontSize, skills }: IBasicSkillProps) {
  const pageStyle = useMemo(() => {
    return StyleSheet.create({
      title: {
        fontSize: `${baseFontSize * 1.25}px`,
      },
      subtitle: {
        marginBottom: '3px',
      },
    });
  }, [baseFontSize]);

  const SkillBox = ({ name }: Pick<IUserSkill, 'name'>) => {
    return (
      <View>
        <Text style={pageStyle.subtitle}>{name}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={pageStyle.title}>Skill</Text>
      <HRLine color={ColorCode.WHITE}/>
      {skills.map(({ name }) => <SkillBox key={name} name={name} />)}
    </View>
  );
}
