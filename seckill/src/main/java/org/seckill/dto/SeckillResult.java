package org.seckill.dto;

//封装json数据结果，将所有的ajax请求返回类型，全部封装成json数据
//泛型SeckillResult<T>可以为SeckillResult<Exposer>也可以为SeckillResult<SeckillExecution>

public class SeckillResult<T> {

    private boolean success; //标识，判断是否请求成功

    private T data;  //泛型类型的数据

    private String error;  //错误信息

    //如果success是true则有数据
    public SeckillResult(boolean success, T data) {
        this.success = success;
        this.data = data;
    }
    //如果success是false则传递错误信息
    public SeckillResult(boolean success, String error) {
        this.success = success;
        this.error = error;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
