const nextConfig = {
    // (Optional) Export as a standalone site
    // See https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
    output: 'standalone', // Feel free to modify/remove this option
    
    // Indicate that these packages should not be bundled by webpack
    experimental: {
        serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    },
    
    fs: false,
    images: {
        domains: ['lh3.googleusercontent.com'],
        formats: ["image/webp"],
    },
   
};

module.exports = nextConfig;