'use client';

import { FC, useState, useEffect } from 'react';
import { LanguageLinks, TelegramLink, Wrapper } from '@/ui';
import classNames from 'classnames';

import styles from './header.module.scss';
import { HeaderProps } from './header.types';
import Logo from './logo';
import Link from 'next/link';
import { useRouter } from 'next/compat/router';

const Header: FC<HeaderProps> = ({ className }) => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(typeof window !== 'undefined' && window.innerWidth >= 480);
  const router = useRouter();

  useEffect(() => {

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 480);
    };

    window.addEventListener('resize', handleResize);

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const headerClassName = classNames(styles.root, className);

  return (
    <header className={headerClassName}>
      <Wrapper className={styles.wrapper}>
        {/* Отображение TelegramLink для больших экранов */}
        {isLargeScreen && <TelegramLink className={styles.telegram} />}

        {router?.pathname === '/vacancy' && (
          <Link href={'/'}>
            <p style={{color: 'white'}}>О нас</p>
          </Link>
        )}

        <Logo className={styles.logo} />

        <div className={styles.language}>
          {/* Отображение TelegramLink для маленьких экранов */}
          {!isLargeScreen && <TelegramLink className={styles.telegramSmall} />}
          <LanguageLinks className={styles.language__links} />
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
