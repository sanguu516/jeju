'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/components/ui/tabs';
import Product from '@/app/components/trip/Product';
import TripCourse from '@/app/components/trip/TripCourse';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/app/components/ui/drawer';
import Map from '@/app/components/map/Map';
import { Layers3 } from 'lucide-react';
import ShowppingCart from '@/app/components/trip/ShowppingCart';
import tripStore from '@/stores/trip';
import tripApi from '@/service/trip';
import Markers from '@/app/components/map/Markers';
import { getTripRs } from '@/type/trip';

export default function Trip() {
  const [tripList, setTripList] = useState<getTripRs[]>([]);
  const [category, setCategory] = useState<string>('');
  const { createTravelPK } = tripStore();
  const [tabValue, setTabValue] = useState('ProductList');
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);

  const { data } = tripApi.GetTrip(category);

  useEffect(() => {}, [category]);

  const handlerCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  return (
    <div className='flex overflow-hidden w-screen h-screen '>
      <div className='flex-col h-full md:w-1/2 lg:w-1/3 w-1/3 mx-3 md:block hidden'>
        <Tabs
          defaultValue='account'
          className=''
          value={tabValue}
          onValueChange={val => setTabValue(val)}
        >
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='ProductList'>상품 목록</TabsTrigger>
            <TabsTrigger value='tripcourse'>여행 코스</TabsTrigger>
            <TabsTrigger value='poket'>장바구니</TabsTrigger>
          </TabsList>
          <TabsContent value='ProductList'>
            <Product data={data} handlerCategory={handlerCategory} />
          </TabsContent>
          <TabsContent value='tripcourse'>
            <div className=' overflow-scroll  h-[85vh]'>
              <TripCourse />
            </div>
          </TabsContent>
          <TabsContent value='poket'>
            <ShowppingCart />
          </TabsContent>
        </Tabs>
      </div>
      <div className=' h-full md:w-2/3  w-full'>
        <div className=' border md:h-full h-full'>
          <Map setMap={setMap} data={data} />
          <Markers
            data={data}
            map={map}
            setCurrentStore={setCurrentStore}
            currentStore={currentStore}
            category={category}
          />
          <div className='md:hidden block'>
            <Drawer>
              <DrawerTrigger className='absolute bottom-5 right-5 overflow-auto z-10'>
                <div className='rounded-sm bg-yellow-300 w-8 h-8 resize'>
                  <Layers3
                    color='black'
                    className='bg-white rounded-full w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                  />
                </div>
              </DrawerTrigger>
              <DrawerContent className=''>
                <DrawerHeader>
                  <Tabs
                    defaultValue='account'
                    className=''
                    value={tabValue}
                    onValueChange={val => setTabValue(val)}
                  >
                    <TabsList className='grid w-full grid-cols-3'>
                      <TabsTrigger value='ProductList'>상품 목록</TabsTrigger>
                      <TabsTrigger value='tripcourse'>여행 코스</TabsTrigger>
                      <TabsTrigger value='poket'>장바구니</TabsTrigger>
                    </TabsList>
                    <TabsContent value='ProductList'>
                      <div className='h-[500px]'>
                        <Product
                          data={data}
                          handlerCategory={handlerCategory}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value='tripcourse'>
                      <div className='h-[500px] overflow-scroll'>
                        <TripCourse />
                      </div>
                    </TabsContent>
                    <TabsContent value='poket'>
                      <div className='h-[500px]'>
                        <ShowppingCart />
                      </div>
                    </TabsContent>
                  </Tabs>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}
