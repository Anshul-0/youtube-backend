// Another approach to handle async errors in express route handlers rather than try-catch in each route

const asyncHandler = (requestHandler) => {
   return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err));
    }
};


export {asyncHandler};



// Alternative approach: 

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req,res,next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message: error.message || "Internal Server Error"
//         })
//     }
// }