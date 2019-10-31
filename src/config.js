export const MAX_DECIMAL = 15; // js自动取整会为16位小数
export const MAX_EXP = 21;

const CONFIG = {
  SAFE_RANGE_ERROR: false, // 超出安全范围时是否需要抛出异常
  SAFE_RANGE_WARNING: true // 超出安全范围时是否打印warning
};

export default CONFIG;
