import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';
import Cookies from "js-cookie";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const apiHost = process.env.apiHost;
      try {
        const response = await axios.post(`${apiHost}/api/login/google`, {
          access_token: account?.access_token,
        });
        const newData = response.data.Payload
        newData.access_token = response.data.RawData
        // Xử lý dữ liệu người dùng từ phản hồi
        // Lưu dữ liệu vào cookie
        Cookies.set("user", newData, { expires: 7 }); // expires: số ngày tồn tại của cookie (7 ngày trong ví dụ này)

        // if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        //   // Sử dụng localStorage ở đây
        //   localStorage.setItem("user", JSON.stringify(newData));
        //   const storedValue = localStorage.getItem('key');
        // } else {
        //   // Xử lý khi không có localStorage
        //   console.log('localStorage is not available');
        // }
        console.log('data2', response, apiHost, newData);
        return Promise.resolve(true); // Cho phép đăng nhập thành công
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu POST:", error);
        return Promise.reject(new Error("Đăng nhập không thành công")); // Từ chối đăng nhập
      }
    },
    // Các callback khác...
  },
  secret: "94d25574656a8ee61f1adb9d18435c36",
};

export default (req, res) => NextAuth(req, res, authOptions);
