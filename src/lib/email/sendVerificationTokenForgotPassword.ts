import nodemailer from "nodemailer";
// =====================================================
export const sendVerificationTokenForgotPassword = async (
  email: string,
  verificationToken: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const link = `${process.env.DOMAIN}/reset-password/${verificationToken}`
    const transporter = nodemailer.createTransport({
      secure: true,
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });
    await transporter.sendMail({
      from: '"لُقطة" <maro.vip53@gmail.com>',
      to: email,
      subject: "أهلا بك في لُفطة - تغيير كلمة السر",
      html: `
  <div style="font-family: Arial; background:#f4f4f4; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#fff; padding:20px; border-radius:10px; text-align:center;">

      <h2 style="color:#111;">أهلاً بك في لُفطة 👋</h2>

      <p style="font-size:16px; color:#555;">
       لتغيير كلمة السر الخاصه بك أنقر على الرابط في الأسفل
      </p>
      <a href="${link}"
         style="display:inline-block; padding:12px 25px; margin-top:15px;
         background:#000; color:#fff; text-decoration:none; border-radius:8px;">
       تغيير كلمة السر
      </a>

      <p style="margin-top:20px; font-size:12px; color:#888;">
        لو لم تطلب هذا الرابط يمكنك تجاهله.
      </p>

    </div>
  </div>
`,
    });
    return {success:true,message:"تم إرسال رابط التحقق إلى بريدك"}
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء إرسال رابط التحقق الخاص بك",
    };
  }
};
