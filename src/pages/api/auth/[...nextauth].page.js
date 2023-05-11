import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {axiosPost} from '@/utils/api'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log('data1', user, account, profile, axiosPost);
      // Gửi yêu cầu POST để lấy thông tin người dùng từ API khác trên backend
      try {
        const response = await axiosPost("get-access-token", {
          code: user.account.id_token,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.NEXTAUTH_URL,
          grant_type: "authorization_code"
        });
        // Xử lý dữ liệu người dùng từ phản hồi
        const userData = response.data;
        user.userData = userData;
        console.log('data2',user, account, profile, response);




        
        return true; // Trả về true để cho phép đăng nhập
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu POST:", error);
        return false; // Trả về false để từ chối đăng nhập
      }
    },
    // Các callback khác...
  },
  secret: "94d25574656a8ee61f1adb9d18435c36",
}

export default (req, res) => NextAuth(req, res, authOptions)
