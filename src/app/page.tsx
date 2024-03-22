'use client';
import { Button } from '@/components/ui/button';
import Image, { ImageLoaderProps } from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Journey from '@/components/journey';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  ChevronRightIcon,
  StarIcon,
  ChevronLeftIcon,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import Accommodation from '@/components/product/Accommodation';
import TripReview from '@/components/tripreview/TripReview';
import mainApi from '@/service/home';
import Restaurant from '@/components/product/Restaurant';
import { formatDate } from '@/utility/hooks/comnHook';
import useUserIdStore from '@/stores/auth';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import mypageApi from '@/service/mypage';
import { imgLoader } from '@/utility/utils/imgLoader';
import MainLoading from '@/components/loading/MainLoading';
import FaqDetail from '@/components/faq/FaqDetail';
import { set } from 'date-fns';

export default function Home() {
  const router = useRouter();

  const { isLogin, setIsLogin } = useUserIdStore();
  const { toast } = useToast();
  const { data: bestData, isFetching: bestFetching } = mainApi.GetMainProduct();
  const { data: EvnetData, isFetching: eventFetching } = mainApi.GetMainEvent();
  const { data: NoticeData, isFetching: noticeFetching } =
    mainApi.GetMainNotice();
  const { data: ReviewData, isFetching: reviewFetching } = mainApi.GetReview();
  const [isFaqId, setIsFaqId] = useState(0);

  const [isId, setIsId] = useState(0);
  const [productValue, setProductValue] = useState({
    pk: 0,
    category: ''
  });
  return (
    <main className='flex flex-col p-3 justify-between md:p-20 '>
      <div className='grid w-full place-items-center bg-cover bg-center  md:text-3xl text-base gap-5'>
        <div className='z-0 flex flex-col md:items-center md:justify-center gap-4 p-1 md:flex-row-reverse'>
          <Image
            loader={({ src, width, quality }: ImageLoaderProps) =>
              imgLoader({ src, width, quality })
            }
            src={'/56692-O8P89L-432.jpg'}
            alt='Image'
            className='object-cover rounded-lg shadow-2xl'
            width={300}
            height={200}
          />
          <div className='md:text-3xl font-bold flex flex-col md:p-6 px-3 gap-3 '>
            제주도의 모든 여행코스를 한눈에 보고,
            <br />
            나만의 여행코스를 짤 수 있는 여행 플랫폼입니다.
            {isLogin ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size='lg' className='md:w-40 w-32'>
                    여행 코스 짜러가기
                  </Button>
                </DialogTrigger>
                <Journey />
              </Dialog>
            ) : (
              <Button
                size='lg'
                className='md:w-40 w-32'
                onClick={() => {
                  toast({
                    title: '로그인이 필요합니다.',
                    description: '로그인 후 이용해주세요.',
                    action: <ToastAction altText='Try again'>확인</ToastAction>
                  });
                }}
              >
                여행 코스 짜러가기
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className='mt-24 text-2xl md:text-3xl font-bold'>
        지금 인기있는 상품
      </div>
      {bestFetching ? (
        <MainLoading />
      ) : (
        <Carousel
          opts={{
            align: 'start'
          }}
          className='w-full  mt-5'
        >
          <CarouselContent>
            {bestData?.map((data, index) => (
              <CarouselItem
                key={index}
                className='md:basis-1/3 basis-1/2 lg:basis-1/4'
              >
                <Dialog>
                  <DialogTrigger>
                    <div className='p-1'>
                      <motion.div
                        key={index}
                        className=''
                        onClick={() =>
                          setProductValue({
                            pk: data.c_pk_cnum as any,
                            category: data.c_category
                          })
                        }
                        whileTap={{ scale: 0.9 }}
                      >
                        <Card className='w-full h-full  '>
                          <CardContent className='flex items-start justify-center p-3 group'>
                            <div className='relative md:w-[100%] md:h-[258px] lg:w-[100%] lg:h-[257px] w-[100%] h-[173px]'>
                              <Image
                                loader={({
                                  src,
                                  width,
                                  quality
                                }: ImageLoaderProps) =>
                                  imgLoader({ src, width, quality })
                                }
                                src={`http://14.6.54.241:8080/download/${data.c_img}`}
                                alt='Image'
                                className='rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform duration-500'
                                layout='fill'
                                objectFit='cover'
                                // height={200}
                                // width={300}
                              />
                            </div>
                          </CardContent>
                          <div className='flex flex-col gap-2 items-start px-5 py-1 bg-opacity-80 h-36'>
                            <div className='flex gap-1'>
                              <Badge>BEST</Badge>
                              <Badge variant={'outline'}>
                                {data.c_category}
                              </Badge>
                            </div>
                            <div className='text-left md:w-[180px] w-[140px] md:text-2xl text-base font-bold whitespace-nowrap overflow-hidden overflow-ellipsis'>
                              {data.c_name}
                            </div>
                            <div className='flex gap-1 items-center'>
                              <MapPin size={14} />
                              <div className=' md:text-base text-sm md:w-[180px] w-[140px] whitespace-nowrap overflow-hidden overflow-ellipsis'>
                                {data.c_addr}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </div>
                  </DialogTrigger>
                  <Accommodation pkValue={productValue} />
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
      <div className='mt-24 text-2xl md:text-3xl font-bold'>
        지금 인기있는 관광지
      </div>
      {eventFetching ? (
        <MainLoading />
      ) : (
        <Carousel
          opts={{
            align: 'start'
          }}
          className='w-full  mt-5'
        >
          <CarouselContent>
            {EvnetData?.map((data: any, index) => (
              <CarouselItem
                key={index}
                className='md:basis-1/3 basis-1/2 lg:basis-1/4'
              >
                <Dialog>
                  <DialogTrigger>
                    <div className='p-1'>
                      <motion.div
                        key={index}
                        className=''
                        whileTap={{ scale: 0.9 }}
                      >
                        <Card className='w-full h-full  '>
                          <CardContent className='flex  items-start justify-center p-3  group'>
                            <div className='relative md:w-[100%] md:h-[258px] lg:w-[100%] lg:h-[257px] w-[100%] h-[173px]'>
                              <Image
                                loader={({
                                  src,
                                  width,
                                  quality
                                }: ImageLoaderProps) =>
                                  imgLoader({ src, width, quality })
                                }
                                src={
                                  data.e_img
                                    ? `http://14.6.54.241:8080/download/${data.e_img}`
                                    : `http://14.6.54.241:8080/download/${data.s_img}`
                                }
                                alt='Image'
                                className='rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform duration-500'
                                layout='fill'
                                objectFit='cover'
                              />
                            </div>
                          </CardContent>
                          <div className='flex flex-col gap-2 items-start px-5 py-1  bg-opacity-80'>
                            <div className='flex gap-1'>
                              <Badge>BEST</Badge>

                              <Badge variant={'outline'}>
                                {data.e_pk_enum ? '이벤트' : '레저'}
                              </Badge>
                            </div>

                            <div className='text-left md:w-[180px] w-[140px] md:text-2xl text-base font-bold whitespace-nowrap overflow-hidden overflow-ellipsis'>
                              {data.e_title ?? data.s_tittle}
                            </div>
                            <div className='flex gap-1 items-center'>
                              <MapPin size={14} />
                              <div className='text-left md:text-base text-sm md:w-[180px] w-[140px] whitespace-nowrap overflow-hidden overflow-ellipsis'>
                                {data.e_addr ?? data.s_addr}
                              </div>
                            </div>
                            <div className='text-xs h-[48px] overflow-hidden overflow-ellipsis'>
                              {data.e_info ?? data.s_info}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </div>
                  </DialogTrigger>
                  <Restaurant pkValue={productValue} />
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
      <div className='w-full grid items-start min-h-screen gap-4  md:gap-8'>
        <div className='space-y-2'>
          <div className='mt-24 text-2xl md:text-3xl font-bold'>여행 후기</div>
          <p className='text-gray-500 dark:text-gray-400'>
            {ReviewData?.length}개의 새로운 후기가 있습니다.
          </p>
          <Badge className='text-sm' onClick={() => router.push('/faq')}>
            더보기
            <ChevronRightIcon size={20} />
          </Badge>
        </div>
        <div className=' grid md:grid-cols-3 grid-cols-1 gap-3'>
          {ReviewData?.map((item, index) => (
            <Dialog key={index}>
              <DialogTrigger>
                <motion.div
                  onClick={() => setIsId(item.b_pk_num)}
                  key={index}
                  className=''
                  whileTap={{ scale: 0.9 }} // 클릭하는 동안 요소의 크기를 90%로 줄입니다.
                >
                  <Card>
                    <CardHeader className='flex items-start pb-4'>
                      <div className='flex items-center gap-4 mr-auto'>
                        <Avatar className='w-12 h-12'>
                          <AvatarImage
                            alt='Avatar'
                            src={'/56692-O8P89L-432.jpg'}
                          />
                        </Avatar>
                        <div className='flex flex-col w-full'>
                          <h3 className='md:text-base text-sm font-semibold overflow-hidden text-overflow-ellipsis whitespace-wrap'>
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
              </DialogTrigger>
              <TripReview id={isId} />
            </Dialog>
          ))}
        </div>
        <div className='space-y-2'>
          <div className='mt-24 text-2xl md:text-3xl font-bold'>공지사항</div>
          <p className='text-gray-500 dark:text-gray-400'>
            {NoticeData?.length}개의 새로운 공지사항이 있습니다.
          </p>
          <Badge className='text-sm' onClick={() => router.push('/notice')}>
            더보기
            <ChevronRightIcon size={20} />
          </Badge>
        </div>
        <div className=' grid md:grid-cols-2 grid-cols-1 gap-3'>
          {NoticeData?.map((data: any, index: number) => (
            <>
              <Dialog>
                <DialogTrigger>
                  <motion.div
                    key={index}
                    onClick={() => setIsFaqId(data.n_pk_num)}
                    className=''
                    whileTap={{ scale: 0.9 }} // 클릭하는 동안 요소의 크기를 90%로 줄입니다.
                  >
                    <Card className='p-5' key={index}>
                      <CardContent className='flex flex-col'>
                        <h3 className='text-xl font-semibold text-left'>
                          {data.n_title}
                        </h3>

                        <div className='text-xs'>
                          <p className='text-gray-500 text-left dark:text-gray-400 flex py-2'>
                            {formatDate(data.n_date)}
                            <ChevronLeftIcon className='w-4 h-4 transform rotate-180' />
                          </p>
                        </div>

                        <p className='text-sm text-gray-500 text-left dark:text-gray-400'>
                          {data.n_contents}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </DialogTrigger>
                <FaqDetail id={isFaqId} />
              </Dialog>
            </>
          ))}
        </div>
      </div>
    </main>
  );
}
