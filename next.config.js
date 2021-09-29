/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
