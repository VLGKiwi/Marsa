'use client'
import { FC } from 'react'
import classNames from 'classnames'

import styles from './languageLinks.module.scss'
import { LanguageLinksProps } from './languageLinks.types'
import { useRouter } from 'next/navigation'

const LanguageLinks: FC<LanguageLinksProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  const router = useRouter();

  const switchLanguage = (newLocale: string) => {
    // Меняет язык, обновляя маршрут
    router.push(`/${newLocale}`);
  };

  return (
    <div className={rootClassName}>
      <button onClick={() => switchLanguage('en')} className={styles.link}>
        en
      </button>
      <button onClick={() => switchLanguage('ru')} className={styles.link}>
        ru
      </button>
    </div>
  )
}

export default LanguageLinks
