import React from 'react';

import { Link } from '~/components/Link';
import { Container } from '~/components/Container';
import { cn } from '~/lib/utils';
import { useRouterState } from '@tanstack/react-router';
import { GithubIcon } from 'lucide-react';

export function Header() {
  const navClassName = 'flex items-center gap-4 md:gap-6 lg:gap-12';
  const router = useRouterState();

  return (
    <header className="main-header top-0 z-50 border solid">
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
                <span className="font-bold">
                  Home
                </span>
              </div>
            </Link>

          </div>
          <div className={navClassName}>
            <a href="https://github.com/akhmadshin/start-perfect-navigation-media" target="_blank">
              <div>
                <GithubIcon className="h-[1.2rem] w-[1.2rem] inline"/>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </header>
  )
}