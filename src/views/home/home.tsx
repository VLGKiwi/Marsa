import { FC } from 'react'
import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'
import { Button } from '@/ui'
import { Traffic } from '@/modules/traffic'
import { Introduce } from '@/modules/introduce'

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Introduce />
      <Button size='sm'>ВАКАНСИИ</Button>
      <Traffic />
    </main>
  )
}

export default Home
