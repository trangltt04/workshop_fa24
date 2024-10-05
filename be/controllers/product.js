import Product from "../models/product.js";

// Hàm để thêm một sản phẩm mới
export const createProduct = async (req, res) => {
  try {
    const { name, productAttributes } = req.body;

    // Kiểm tra xem sản phẩm với tên này đã tồn tại chưa
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({
        message: "San pham da ton tai",
      });
    }

    // Tìm các thuộc tính sản phẩm dựa trên danh sách ID
    const attributes = await Attribute.find({
      _id: { $in: productAttributes },
    });
    // Kiểm tra xem tất cả các thuộc tính có tồn tại không
    if (attributes.length !== productAttributes.length) {
      return res.status(400).json({
        message: "Mot hoac nhieu thuoc tinh khong tim thay",
      });
    }
    // Tạo sản phẩm mới với dữ liệu từ request body
    const product = await Product.create(req.body);
    // Trả về phản hồi thành công với mã trạng thái 201 và dữ liệu sản phẩm mới
    res.status(201).json(product);
  } catch (error) {
    // Xử lý lỗi và trả về phản hồi lỗi với mã trạng thái 400
    res.status(400).json({ message: error.message });
  }
};

// Lấy danh sách sản phẩm với phân trang
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const products = await Product.paginate({}, options);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
