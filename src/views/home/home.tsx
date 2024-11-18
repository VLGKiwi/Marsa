import { FC } from 'react'
import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'
import { Button } from '@/ui'
import { Traffic } from '@/modules/traffic'

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Button size='sm'>ВАКАНСИИ</Button>
      <Traffic />
    </main>
  )
}

export default Home
