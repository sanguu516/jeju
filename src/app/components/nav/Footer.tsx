import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JSX, SVGProps } from 'react';

export default function Footer() {
  return (
    <footer className='w-full  py-8 px-4 md:px-6'>
      <div className='container mx-auto flex md:flex-row flex-col items-center justify-center gap-6 md:justify-between'>
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-2'>
            <CodeIcon className='h-4 w-4 text-gray-500 dark:text-gray-400' />
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              Front-end
            </span>
          </div>
          {/* <Link
            className='text-gray-400 hover:text-gray-200 transition-colors'
            href='https://www.instagram.com/sanguu516/'
            target='_blank'
          >
            <InstagramIcon className='h-6 w-6' />
          </Link> */}
          <Link
            className='text-gray-400 hover:text-gray-200 transition-colors'
            href='https://github.com/sanguu516'
            target='_blank'
          >
            <GithubIcon className='h-6 w-6' />
          </Link>
          <DatabaseIcon className='h-4 w-4 ml-3 text-gray-500 dark:text-gray-400' />
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            Back-end
          </span>
          {/* <Link
            className='text-gray-400 hover:text-gray-200 transition-colors'
            href='https://www.instagram.com/sanguu516/'
            target='_blank'
          >
            <InstagramIcon className='h-6 w-6' />
          </Link> */}
          <Link
            className='text-gray-400 hover:text-gray-200 transition-colors'
            href='https://github.com/lkd9125'
            target='_blank'
          >
            <GithubIcon className='h-6 w-6' />
          </Link>

          {/* <Link
            className='text-gray-400 hover:text-gray-200 transition-colors'
            href='mailto:sanguu516@naver.com'
          >
            <MailIcon className='h-6 w-6' />
          </Link>
          <Link
            className='text-gray-400 hover:text-gray-200 transition-colors'
            href='tel:+01044415550'
          >
            <PhoneIcon className='h-6 w-6' />
          </Link> */}
        </div>
        <p className='text-sm text-gray-500'>
          2명의 개발자가 만들었습니다. © 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function GithubIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
      <path d='M9 18c-4.51 2-5-2-7-2' />
    </svg>
  );
}

function CodeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='16 18 22 12 16 6' />
      <polyline points='8 6 2 12 8 18' />
    </svg>
  );
}

function DatabaseIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <ellipse cx='12' cy='5' rx='9' ry='3' />
      <path d='M3 5V19A9 3 0 0 0 21 19V5' />
      <path d='M3 12A9 3 0 0 0 21 12' />
    </svg>
  );
}
