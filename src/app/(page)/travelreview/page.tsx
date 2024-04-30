'use client';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/app/components/ui/card';
import { useRouter } from 'next/navigation';

import { ChevronRightIcon, StarIcon, ChevronLeftIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import mypageApi from '@/service/mypage';
import { Avatar, AvatarImage } from '@/app/components/ui/avatar';
export default function TravelReview() {
  const { data } = mypageApi.GetTravelReview();

  const router = useRouter();
  return (
    <div className='md:px-36 px-4 md:py-20 py-14 space-y-6 md:space-y-8'>
      <div className='space-y-2'>
        <div className='flex flex-col'>
          <h1 className='md:text-3xl text-2xl font-bold tracking-tight'>
            여행 리뷰
          </h1>
          <p className='text-gray-500 dark:text-gray-400'>
            여행 리뷰를 아래에서 찾아보세요.
          </p>
        </div>
      </div>
      <div className='w-full grid items-start min-h-screen gap-4  md:gap-8'>
        <div className=' grid md:grid-cols-3 grid-cols-1 gap-3'>
          {data?.map((item: any, index: number) => (
            <motion.div
              key={index}
              className=''
              onClick={() => {
                router.push(`/reviewInfo/${item.b_pk_num}`);
              }}
              whileTap={{ scale: 0.9 }} // 클릭하는 동안 요소의 크기를 90%로 줄입니다.
            >
              <Card>
                <CardHeader className='flex items-start pb-4'>
                  <div className='flex items-center gap-4 mr-auto'>
                    <Avatar className='w-12 h-12'>
                      <AvatarImage alt='Avatar' src={'/56692-O8P89L-432.jpg'} />
                    </Avatar>
                    <div className='flex flex-col w-full'>
                      <h3 className='md:text-base text-sm font-semibold overflow-hidden text-overflow-ellipsis whitespace-wrap text-start'>
                        {item.b_title}
                      </h3>
                      <p className='text-xs text-gray-500 dark:text-gray-400 text-start'>
                        {item.b_fk_id}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-1 pt-2  text-sm'>
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < item?.b_star
                            ? 'fill-accent text-yellow-500'
                            : 'fill-accent stroke-muted-foreground '
                        }`}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-gray-500 dark:text-gray-400 px-6 pb-5 text-start'>
                    {item.b_contents}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
