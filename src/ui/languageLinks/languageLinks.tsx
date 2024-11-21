import { FC } from 'react'
import classNames from 'classnames'

import styles from './languageLinks.module.scss'
import { LanguageLinksProps } from './languageLinks.types'

const LanguageLinks: FC<LanguageLinksProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <a href="" className={styles.link}>
        en
      </a>
      <a href="" className={styles.link}>
        ru
      </a>
    </div>
  )
}

export default LanguageLinks
