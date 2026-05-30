'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './BottomNavigation.css';

type NavigationItem = {
  label: string;
  href: string;
  icon: string;
  activeIcon: string;
};

const navigationItems: NavigationItem[] = [
  {
    label: '홈',
    href: '/',
    icon: '/icons/icn_home_24px.svg',
    activeIcon: '/icons/icn_home_active_24px.svg',
  },
  {
    label: '상품 찾기',
    href: '/products',
    icon: '/icons/icn_product_24px.svg',
    activeIcon: '/icons/icn_product_active_24px.svg',
  },
  {
    label: '마이페이지',
    href: '/my',
    icon: '/icons/icn_user_24px.svg',
    activeIcon: '/icons/icn_user_active_24px.svg',
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(href);
}

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.navigation} aria-label="하단 내비게이션">
      {navigationItems.map((item) => {
        const isActive = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[styles.item, isActive ? styles.activeItem : ''].join(' ')}
            aria-current={isActive ? 'page' : undefined}
          >
            <img
              src={isActive ? item.activeIcon : item.icon}
              alt=""
              className={styles.icon}
              aria-hidden="true"
            />
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}