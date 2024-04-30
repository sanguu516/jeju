'use client';
import { JSX, SVGProps } from 'react';
import { Button } from '../app/components/ui/button';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900 p-4'>
      <div className='max-w-md text-center space-y-4'>
        <div className='flex items-center justify-center'>
          <AlertTriangleIcon className='w-12 h-12 text-red-500' />
        </div>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50'>
          죄송합니다! 문제가 발생했습니다.
        </h1>
        <p className='text-gray-600 dark:text-gray-400'>
          죄송합니다만, 예기치 않은 오류가 발생했습니다. 나중에 다시 시도하거나
          문제가 지속되는 경우 지원팀에 문의하십시오.
        </p>
        <div>
          <Button
            className='inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300'
            onClick={() => reset()}
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}

function AlertTriangleIcon(
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
      <path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' />
      <path d='M12 9v4' />
      <path d='M12 17h.01' />
    </svg>
  );
}
