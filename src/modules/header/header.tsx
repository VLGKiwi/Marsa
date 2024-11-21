import { FC } from 'react'
import { LanguageLinks, TelegramLink, Wrapper } from '@/ui'
import classNames from 'classnames'

import styles from './header.module.scss'
import { HeaderProps } from './header.types'
import Logo from './logo'

const Header: FC<HeaderProps> = ({ className }) => {
  const headerClassName = classNames(styles.root, className)
  return (
    <header className={headerClassName}>
      <Wrapper className={styles.wrapper}>
        <TelegramLink />
        <Logo />
        <LanguageLinks />
      </Wrapper>
    </header>
  )
}

export default Header
