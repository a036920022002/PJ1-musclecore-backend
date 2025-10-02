const Counter=require('../models/counter');

/**
 * 通用流水號生成 middleware
 * @param {string} type - 流水號類型，例如 'order', 'member'
 * @param {string} prefix - 前綴，例如 'ORD', 'MEM'
 */

function generateSerialNumber(type, prefix) {
  return async  function(req, res, next) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { _id: type},             // schema 欄位
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true } 
      );

      req.serialNumber = `${prefix}${counter.seq.toString().padStart(6, '0')}`;
      next();
    } catch (err) {
      console.error('生成流水號失敗', err);
      next(err);
    }
  };
}

module.exports = generateSerialNumber;
