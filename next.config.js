/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "links.papareact.com", // main pics
      "platform-lookaside.fbsbx.com",
      "firebasestorage.googleapis.com", // faceBook
      "avatars.githubusercontent.com", // gitHub,
      "sun1.userapi.com", // VK
      "lh3.googleusercontent.com", // Google
    ]
  }
}
