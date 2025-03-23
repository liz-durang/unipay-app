const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Habilitar CORS para el frontend
app.use(cors());

// Configurar el proxy para Stack Auth
const stackAuthProxy = createProxyMiddleware({
    target: 'https://api.stack-auth.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    },
    onProxyReq: (proxyReq, req, res) => {
        // Agregar headers necesarios
        proxyReq.setHeader('X-Project-ID', '99e67cc2-3c70-47e4-a29c-a87a9f0e774a');
        proxyReq.setHeader('X-Client-Key', 'sk_test_12345');
        
        if (req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },
    onProxyRes: (proxyRes, req, res) => {
        // Modificar headers de respuesta
        proxyRes.headers['access-control-allow-origin'] = '*';
        proxyRes.headers['access-control-allow-methods'] = 'GET,HEAD,PUT,PATCH,POST,DELETE';
        proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Authorization, X-Project-ID, X-Client-Key';
    }
});

// Usar el proxy para todas las rutas /api
app.use('/api', stackAuthProxy);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
}); 