import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import styles from './burgerMenu.module.scss'
import { BurgerMenuProps } from './burgerMenu.types'
import Link from 'next/link'
import { LanguageLinks } from '@/ui'

const BurgerMenu: FC<BurgerMenuProps> = ({
  className
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const rootClassName = classNames(styles.root, className);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth >= 480
  );

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
      const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 480);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <div className={rootClassName}>
      <div className={styles.open__menu}
        onClick={handleMenuToggle}
      ></div>
      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.menu__list}>
          {!isLargeScreen && <LanguageLinks className={styles.language__links} />}
          <Link href={'/'}>Главная</Link>
          <Link href={'/careers'}>Вакансии</Link>
        </div>
        <div className={styles.menu__close} onClick={handleMenuToggle}></div>
      </div>
    </div>
  )
}

export default BurgerMenu
