import { FC } from 'react'
import classNames from 'classnames'

import styles from './instagramLink.module.scss'
import { InstagramLinkProps } from './instagramLink.types'

import Icon from '@icons/instagram.svg';

const InstagramLink: FC<InstagramLinkProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <a href="https://www.instagram.com/marsa_team" className={styles.link}>
        <Icon className={styles.link__item} width={40} />
      </a>
    </div>
  )
}

export default InstagramLink
