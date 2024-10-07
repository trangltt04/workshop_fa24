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

    // // Tìm các thuộc tính sản phẩm dựa trên danh sách ID
    // const attributes = await Attribute.find({
    //   _id: { $in: productAttributes },
    // });
    // // Kiểm tra xem tất cả các thuộc tính có tồn tại không
    // if (attributes.length !== productAttributes.length) {
    //   return res.status(400).json({
    //     message: "Mot hoac nhieu thuoc tinh khong tim thay",
    //   });
    // }
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

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params; // lấy ID sản phẩm từ URL params
    const { _embed } = req.query; // lấy thông tin các trường cần populate từ query params
    let query = Product.findById(id); // Tạp query để tìm sản phẩm theo ID

    // Nếu có yêu cầu populate các trường liên quan
    if (_embed) {
      const embed = _embed.split(","); // tách các trường cần populate thành mảng
      embed.forEach((embed) => {
        query = query.populate(embed); // Thêm các trường cần populate vào query
      });
    }

    const product = await query.exec(); // Thực thi query để lấy thông tin sản phẩm
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm " }); // trả về lỗi nếu không tìm thấy sản phẩm
    }
    res.status(200).json(product); // trả về thông tin sản phẩm nếu tìm thấy
  } catch (error) {
    res.status(500).json({ message: error.message }); // Xử lý lỗi và trả về phản hồi lỗi
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // lấy ID sản phẩm từ URL params
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // trả về sản phẩm mới sau khi cập nhật
      runValidators: true, // chạy các validators đã định nghĩa trong schema
    });
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm nào" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // lấy ID sản phẩm từ URL params
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm nào" });
    }
    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
