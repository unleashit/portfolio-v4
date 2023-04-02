import * as React from 'react';
import { getSkills } from '../../app/data';

type SkillProps = {
  title?: string;
  size: 'full' | 'half';
  color: string;
};

type MappedSkills = [
  SkillProps['title'],
  SkillProps['size'],
  SkillProps['color']
][];

function Skill({ title, size, color }: SkillProps) {
  return (
    <div
      className={`skill ${size}`}
      style={{ borderLeft: `4px solid ${color}` }}
    >
      {title}
    </div>
  );
}

async function Skills() {
  console.log('Skills called');

  const skills = await getSkills();

  // skills = skills || [];

  // const {
  //   state: { skills },
  // } = useContext(GlobalContext);

  //const mappedSkillsMemo = React.useMemo<MappedSkills>(() => {
  // if (!skills || skills.length) return [];

  const mappedSkills: MappedSkills = skills.map(({ title }, i) => {
    const colors = [
      '#8781bd',
      '#bd8181',
      '#84bd81',
      '#81afbd',
      '#bd9981',
      '#bdba81',
    ];

    // the first and last skills are full width
    const size = i === 0 || i === skills.length - 1 ? 'full' : 'half';
    // cycle through colors
    const color = colors[i % colors.length];
    return [title, size, color];
  });
  //}, [skills]);

  return (
    <>
      {mappedSkills.map(([title, size, color]) => (
        <Skill key={title} title={title} size={size} color={color} />
      ))}
    </>
  );
}

export default Skills;
