module.exports = (catchAsync) => (req, res, next) => {
  Promise.resolve(catchAsyc(req, res, next)).catch(next);
};
