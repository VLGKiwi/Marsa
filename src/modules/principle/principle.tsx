import { FC } from 'react'
import classNames from 'classnames'

import styles from './principle.module.scss'
import { PrincipleProps } from './principle.types'
import { PrincipleCards } from '@/components';
import { GradientBlur, TitleGradient } from '@/ui';

const principles = [
  { number: 1, title: 'Результат важнее процесса', description: 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum' }, { number: 2, title: 'Результат важнее процесса', description: 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum' },  { number: 3, title: 'Результат важнее процесса', description: 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum' },
];

const Principle: FC<PrincipleProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <GradientBlur className={styles.gradient} />
      <h2 className={styles.title}><TitleGradient text="Наши принципы" /></h2>
      <PrincipleCards className="custom-class" cards={principles} />
    </div>
  )
}

export default Principle
