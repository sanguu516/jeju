'use client';

import { Button } from '@/app/components/ui/button';
import { DialogContent, DialogTitle } from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/components/ui/tabs';
import DatePicker from '../ui/datepicker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { DateRange } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { TravelCreateRq } from '@/type/journey';
import { formatDate } from '@/utility/hooks/comnHook';
import { on } from 'events';
import journeyApi from '@/service/journey';
import { ToastAction } from '@/app/components/ui/toast';
import { useToast } from '@/app/components/ui/use-toast';
import tripStore from '@/stores/trip';
import { DatePickerWithRange } from '../ui/datepickerwithrange';

export default function NewJourney() {
  const [tripValue, setTripValue] = useState<TravelCreateRq>({
    tr_title: '',
    tr_relationship: '',
    tr_in: '',
    tr_out: ''
  });
  const { toast } = useToast();
  const router = useRouter();

  const mutateJourney = journeyApi.PostCreateJourney();
  const { isError, error, mutate } = mutateJourney;
  const { setCreateTravelPK } = tripStore();

  const handleDateChange = (newDateRange: any) => {
    setTripValue({
      ...tripValue,
      tr_in: formatDate(newDateRange.from),
      tr_out: formatDate(newDateRange.to)
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTripValue({ ...tripValue, [name]: value });
  };

  const onsubmit = (tripValue: TravelCreateRq) => {
    if (
      tripValue.tr_title === '' ||
      tripValue.tr_relationship === '' ||
      tripValue.tr_in === '' ||
      tripValue.tr_out === ''
    ) {
      return (
        <>
          {toast({
            variant: 'destructive',
            title: '오류',
            description: '작성하지 않은 값이 있습니다.',
            action: <ToastAction altText='Try again'>확인</ToastAction>
          })}
        </>
      );
    } else {
      mutate(tripValue, {
        onSuccess: data => {
          setCreateTravelPK(data.createTravelPK);
          router.replace(`/trip`);
        }
      });
    }
  };
  return (
    <div className='grid gap-4 py-4 pr-5 md:w-[380px] w-full'>
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label htmlFor='name' className='text-right'>
          여정이름
        </Label>
        <Input
          id='name'
          name='tr_title'
          className='col-span-3'
          value={tripValue.tr_title}
          onChange={onChange}
        />
      </div>
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label htmlFor='name' className='text-right'>
          인원
        </Label>
        <Select
          name='tr_relationship'
          value={tripValue.tr_relationship}
          onValueChange={value =>
            setTripValue({ ...tripValue, tr_relationship: value })
          }
        >
          <SelectTrigger className='col-span-3'>
            <SelectValue placeholder='인원' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='혼자'>혼자</SelectItem>
            <SelectItem value='커플'>커플</SelectItem>
            <SelectItem value='가족'>가족</SelectItem>
            <SelectItem value='다인'>다인</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid grid-cols-4 items-center gap-4'>
        <Label htmlFor='username' className='text-right'>
          날짜
        </Label>
        <DatePickerWithRange
          className='col-span-3 w-full'
          onDateChange={handleDateChange}
        />
      </div>
      <div className='flex justify-end'>
        <Button
          className='w-24'
          type='submit'
          onClick={() => onsubmit(tripValue)}
        >
          여정 저장
        </Button>
      </div>
    </div>
  );
}
