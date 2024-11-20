import { FC } from 'react'
import { LanguageLinks, TelegramLink, Wrapper } from '@/ui'

import styles from './footer.module.scss'

const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <Wrapper className={styles.wrapper}>
        <div className={styles.info}>
          <a target="_blank">
            Вакансии
          </a>
          <a target="_blank">
            Политика конфиденциальности
          </a>
        </div>
        <div className={styles.links}>
          <TelegramLink />
          <LanguageLinks />
        </div>
      </Wrapper>
    </footer>
  )
}

export default Footer
