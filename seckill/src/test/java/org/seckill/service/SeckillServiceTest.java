package org.seckill.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.seckill.dto.Exposer;
import org.seckill.dto.SeckillExecution;
import org.seckill.entity.Seckill;
import org.seckill.exception.RepeatKillException;
import org.seckill.exception.SeckillCloseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml",
        "classpath:spring/spring-service.xml"})
public class SeckillServiceTest {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private SeckillService seckillService;

    @Test
    public void getSeckillList() throws Exception {
        List<Seckill> list = seckillService.getSeckillList();
        logger.info("list={}",list);
    }

    @Test
    public void getById() throws Exception {
        long id = 1000;
        Seckill seckill = seckillService.getById(id);
        logger.info("seckill={}",seckill);
    }

    @Test
    public void exportSeckillUrl() throws Exception {
        long id = 1000;
        Exposer exposer = seckillService.exportSeckillUrl(id);
        logger.info("exposer={}",exposer);
    }

    @Test
    public void executeSeckill() throws Exception {

        long id = 1000;
        long phone = 17808315995L;
        String md5 = "230022e27024f44f805f7c802822412f";   //需要用到testExportSeckillUrl得到的md5

        try {
            SeckillExecution excution = seckillService.executeSeckill(id, phone, md5);
            logger.info("excution={}",excution);

        } catch (RepeatKillException e) {
            logger.error(e.getMessage());
        }catch (SeckillCloseException e) {
            logger.error(e.getMessage());


        }
    }

    //完整逻辑代码测试，注意可重复执行
    @Test
    public void testSeckillLogic() throws Exception {
        long id = 1000;
        Exposer exposer = seckillService.exportSeckillUrl(id);
        if(exposer.isExposed()) {
            logger.info("exposer={}",exposer);
            long phone = 17808315996L;
            String md5 = "230022e27024f44f805f7c802822412f";
            try {
                SeckillExecution excution = seckillService.executeSeckill(id, phone, md5);
                logger.info("excution={}",excution);

            } catch (RepeatKillException e) {
                logger.error(e.getMessage());
            }catch (SeckillCloseException e) {
                logger.error(e.getMessage());
            }
        }else {
            //秒杀未开启
            logger.warn("exposer={}",exposer);
        }
    }


}