package org.seckill.dao;

public interface SuccessKilled {

    /**
     * 插入购买明细，可过滤重复
     * @param successId
     * @param userPhone
     * @return
     */
    int insertSuccessKilled(long successId, long userPhone);

    /**
     * 根据id和userPhone查询SuccessKilled并携带秒杀产品对象实体
     * @param seckillId
     * @param userPhone
     * @return
     */
    SuccessKilled queryByIdWithSeckill(long seckillId, long userPhone);
}
