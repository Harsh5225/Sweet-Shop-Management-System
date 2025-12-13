
// acts as wrapper
// Run this function. If it succeeds, great. If it fails (throws an error), 
// automatically pass that error to Express
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

// It saves you from writing try/catch blocks
// in every single controller function.