--创建数据库脚本

--创建数据库
CREATE DATABASE seckill;
--使用数据库
use seckill;
--创建秒杀库存表
CREATE TABLE seckill(
`seckill_id`  bigint NOT NULL AUTO_INCREMENT COMMENT '商品库存id',
`name` varchar(120) NOT NULL COMMENT '商品名称',
`number` int NOT NULL COMMENT '库存数量',
`start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '秒杀开始时间',
`end_time` timestamp DEFAULT CURRENT_TIMESTAMP  COMMENT '秒杀结束时间',
`create_time` timestamp NOT NULL DEFAULT  CURRENT_TIMESTAMP COMMENT '创建时间',
PRIMARY KEY (seckill_id),
key idx_start_time(start_time),
key idx_end_time(end_time),
key idx_create_time(create_time)
)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='秒杀库存表';

--初始化数据
insert into
  seckill(name,number,start_time,end_time)
values
  ('1000元秒杀iphone7',100,'2018-4-18 00:00:00','2018-4-19 00:00:00'),
  ('500元秒杀ipad',200,'2018-4-18 00:00:00','2018-4-19 00:00:00'),
  ('100元秒杀note6',300,'2018-4-18 00:00:00','2018-4-19 00:00:00'),
  ('600元秒杀小米6',400,'2018-4-18 00:00:00','2018-4-19 00:00:00');

--秒杀成功明细表
--用户登录认证相关信息
CREATE TABLE success_killed(
`seckill_id` bigint NOT NULL COMMENT '秒杀商品id',
`user_phone` bigint NOT NULL COMMENT '用户手机号',
`state` tinyint NOT NULL COMMENT '状态标识 -1无效 0成功 1已付款',
`create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '创建时间',
PRIMARY KEY (seckill_id,user_phone), /*联合主键*/
key idx_create_time(create_time)
)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='秒杀库存表';



--连接数据库控制台

mysql -uroot -p



