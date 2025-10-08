const Product=require('../models/product')


const getproduct=async (req, res) => {
  try {
    const products = await Product.find();
    const baseUrl = process.env.BASE_URL;

    productObj=products.map(p => ({
      ...p.toObject(),
    productImage: `${baseUrl}/images/${p.productImage}`
    }));
    res.json(productObj);
  } catch (error) {
    res.status(500).json({ message: '商品清單讀取失敗', error });
  }
};

const  getproductId=async (req,res)=>{
 try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) 
      return res.status(404).json({ message: '產品不存在' });
    const productObj = product.toObject();
    productObj.productImage = `${baseUrl}/images/${productObj.productImage}`;    
    res.json(productObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
}};

const putproductId= async (req, res) => {
  try {
    const { productId } = req.params;

    const updatedData = {
      productName: req.body.productName,
      productCategories: req.body.productCategories,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productInventory: req.body.productInventory,
      productStatus: req.body.productStatus,
    };

    const updatedProduct = await Product.findOneAndUpdate(
      { productId }, // 使用自訂的 productId 作為條件
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: '找不到商品' });
    }

    res.json({ message: '商品更新成功', product: updatedProduct });
  } catch (error) {
    console.error("更新錯誤", error);
    res.status(500).json({ message: '更新商品失敗', error });
  }
};

const deleteproductId=async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findOneAndDelete({ productId });

    if (!deletedProduct) {
      return res.status(404).json({ message: '商品不存在，無法刪除' });
    }

    res.json({ message: '商品刪除成功', product: deletedProduct });
  } catch (error) {
    console.error('刪除商品失敗', error);
    res.status(500).json({ message: '伺服器錯誤，刪除失敗' });
  }
};


const postproduct =async (req, res) => {
  try {
    const {
      productName,
      productId,
      productBrand,
      productPrice,
      productInventory,
      productCategory,
      productSubCategory,
      productDescription,
      productIsNew,
      productIsSale
    } = req.body;

    const imagePath = req.file ? req.file.filename : null;
     const newProduct = new Product({
      productName,
      productId,
      productBrand,
      productPrice,
      productInventory,
      productCategory,
      productSubCategory,
      productDescription,
      productImage:imagePath,
      productIsNew,
      productIsSale
    });

    await newProduct.save(); // 🔥 寫入 MongoDB

    res.status(201).json({ message: "商品已新增成功", product: newProduct });
  } catch (err) {
    console.error("錯誤：", err);
    res.status(500).json({ message: "新增商品時發生錯誤" });
  }
};


module.exports ={getproduct,getproductId,putproductId,deleteproductId,postproduct};