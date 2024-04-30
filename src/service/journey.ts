import { TravelCreateRq, TravelCreateRs } from '@/type/journey';
import axiosInstance from '../utility/axiosInterceptor';
import { useMutation, useQuery } from '@tanstack/react-query';

const journeyApi = {
  // 여정 생성
  createJourneyFn: async (data: TravelCreateRq): Promise<any> => {
    const res = await axiosInstance.post('/api/travel/insert', data);
    return res.data.body;
  },
  PostCreateJourney: function () {
    return useMutation({ mutationFn: this.createJourneyFn });
  },
  // 여정 조회
  getJourneyFn: async (data?: boolean): Promise<TravelCreateRs[]> => {
    const res = await axiosInstance.get(`/api/mypage/travel?tr_tf=${data}`);
    return res.data.body.travel;
  },
  GetJourney: function (data?: boolean) {
    return useQuery({
      queryKey: ['getjourney'],
      queryFn: () => this.getJourneyFn(data)
    });
  },
  // 여정 삭제
  deleteJourneyFn: async (data: number) => {
    const res = await axiosInstance.delete(`/api/mypage/travel/delete/${data}`);
    return res.data.body;
  },
  DeleteJourney: function () {
    return useMutation({ mutationFn: this.deleteJourneyFn });
  }
};

export default journeyApi;
