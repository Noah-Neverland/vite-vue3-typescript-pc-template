import Request from '@/utils/http';

export const Test = (params: any) => {
  return Request.get('/api/goods-center/goods/getGoods', params);
};
