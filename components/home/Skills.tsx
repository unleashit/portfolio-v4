import * as React from 'react';
import { getSkills } from '../../app/data';
import styles from './about.module.scss';

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
      className={`${styles.skill} ${styles[size]}`}
      style={{ borderLeft: `4px solid ${color}` }}
    >
      {title}
    </div>
  );
}

async function Skills() {
  const skills = await getSkills();

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

  return (
    <>
      <h3>Skills</h3>
      {mappedSkills.map(([title, size, color]) => (
        <Skill key={title} title={title} size={size} color={color} />
      ))}
    </>
  );
}

export default Skills;
