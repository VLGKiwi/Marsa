import { FC } from 'react'
import classNames from 'classnames'

import styles from './buildimLightning.module.scss'
import { BuildimLightningProps } from './buildimLightning.types'

const BuildimLightning: FC<BuildimLightningProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default BuildimLightning
