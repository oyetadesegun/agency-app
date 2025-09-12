export function generateOTP(length = 6) {
  let otp = "";
  const chars = "0123456789";
  for (let i = 0; i < length; i++) {
    otp += chars[Math.floor(Math.random() * chars.length)];
  }
  return otp;
}
