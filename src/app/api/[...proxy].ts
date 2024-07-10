import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

const proxy = createProxyMiddleware({
    target: 'https://dev.msklatam.tech',
    changeOrigin: true,
    pathRewrite: { '^/api': '/msk-laravel/public/api' },
});

export default function handler(req, res) {
    proxy(req, res, (result) => {
        if (result instanceof Error) {
            throw result;
        }
        throw new Error(`Request '${req.url}' is not proxied! We should never reach here!`);
    });
}

export const config = {
    api: {
        bodyParser: false,
    },
};