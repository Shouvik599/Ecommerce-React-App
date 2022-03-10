const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeautures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { stringify } = require("nodemon/lib/utils");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 10;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeautures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(201).json({
    success: true,
    products,
    productCount,
  });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  await product.remove();
  res.status(200).json({
    succes: true,
    message: "Prodcut deleted succesfully",
  });
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    succes: true,
    product,
  });
});

//Create new review or update review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  
  const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
  
  if (isReviewed) {
    product.review.forEach(rev => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating,
        rev.comment = comment
      }
    });
  }
  else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }



  let avg = 0;
  product.ratings = product.reviews.forEach(rev => {
    avg += rev.rating;
  })
  product.ratings = avg / product.reviews.length;
  
  await product.save({ validateBeforeSave: false });
  
  res.status(200).json({
    success: true
  });
});


//get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true
  });
});

//delete review
exports.deletetReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(rev => rev._id.toString() != req.query.id.toString());

  let avg = 0;
  reviews.forEach(rev => {
    avg += rev.rating;
  });
  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;
  await product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  
    res.status(200).json({
      success: true
    });

});