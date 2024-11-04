const nextConfig = {
    // (Optional) Export as a standalone site
    // See https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
    output: 'standalone', // Feel free to modify/remove this option

    // Indicate that these packages should not be bundled by webpack
    experimental: {
        serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    },


    images: {
        domains: ['drive.google.com',
            'github.com',
            'raw.githubusercontent.com'
        ],

    },

    async headers() {
        return [
            {
                // matching all API routes
                source: "/api",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
};

module.exports = nextConfig;