//Export module với module.exports
//Import module với require function
const express = require("express");

//Sử dụng thư viện cors để trao đổi dữ liruj cheis từ client đến server 
const cors = require("cors");

//Import file api-error
const ApiError = require("./app/api-error");

//Gọi thư viện express và sử dụng nó
const app = express();

//Import router
const contactsRouter = require("./app/routes/contact.route");

//Sử dụng cors
app.use(cors());
//Sử dụng express.json
app.use(express.json());
//Các route quản lý liên hệ sẽ được dùng khi đường dẫn bắt đầu là /api/contacts.
app.use("/api/contacts", contactsRouter);

//handle 404 reponse
app.use((req, res, next) => {
    //Code ở đây sẽ chạy khi không có route được định nghĩa nào
    //khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

//define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    //Middleware xử lý lỗi tập trung
    //Trong các đoạn code xử lý ở các route, gọi next(eror)
    //Sẽ chuyển vể middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.get("/",(req, res) => {
    res.json({message: "Welcone to contact book application."});
});

module.exports = app;