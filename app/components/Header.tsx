import React from 'react';

import { Link } from '@/components/Link';
import { Container } from '@/components/Container';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import { useRouterState } from '@tanstack/react-router';

export function Header() {
  const navClassName = 'flex items-center gap-4 md:gap-6 lg:gap-12';
  const router = useRouterState();

  return (
    <header className="main-header sticky top-0 z-50 dark:bg-neutral-900 bg-neutral-50 border solid">
      <Container className="">
        <div className="flex justify-between items-center flex-1 gap-6 h-16">
          <div className="flex items-center space-x-8">
            <Link
              className={cn(
                "border-b-4",
                router.location.pathname === '/' ? "border-neutral-950 dark:border-gray-200" : 'border-transparent',
              )}
              href="/"
              aria-label="Home"
            >
              <div className="flex items-center h-9">
                <div className="h-9 w-8 mr-2 relative hidden xs:block">
                  <Logo className="h-8" />
                </div>
                <span className="font-bold">
                Home
              </span>
              </div>
            </Link>

          </div>
          <div className={navClassName}>
            <ThemeSwitch />
          </div>
        </div>
      </Container>
    </header>
  )
}