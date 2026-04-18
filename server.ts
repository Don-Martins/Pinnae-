import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API BRIDGE (Mimics Laravel API) ---

  // Mock database state (initially from mockData.ts)
  // In a real scenario, this would be your MySQL db, 
  // but here it handles the "Network Error" by providing real responses.
  
  app.post('/api/login', (req, res) => {
    const { email } = req.body;
    res.json({
      access_token: 'demo-token-' + Date.now(),
      token_type: 'Bearer',
      user: {
        id: 1,
        name: email.split('@')[0],
        email: email,
        role: email.includes('admin') ? 'admin' : (email.includes('seller') ? 'seller' : 'buyer'),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      }
    });
  });

  app.get('/api/products', (req, res) => {
    // This would match your ProductController.php logic
    res.json({
      data: [
        { id: 1, name: 'Arduino Uno R4 WiFi', slug: 'arduino-uno-r4', price: 38.50, category: { name: 'Microcontrollers' }, image_url: 'https://picsum.photos/seed/uno/600/600', rating: 4.9, reviews_count: 120, stock: 50 },
        { id: 2, name: 'Ultrasonic Sensor HC-SR04', slug: 'ultrasonic-sensor', price: 4.99, category: { name: 'Sensors' }, image_url: 'https://picsum.photos/seed/sensor/600/600', rating: 4.7, reviews_count: 85, stock: 200 },
        { id: 3, name: 'Mini Servo SG90', slug: 'mini-servo', price: 3.50, category: { name: 'Actuators' }, image_url: 'https://picsum.photos/seed/servo/600/600', rating: 4.5, reviews_count: 45, stock: 500 }
      ]
    });
  });

  app.get('/api/categories', (req, res) => {
    res.json([
      { id: 1, name: 'Microcontrollers', slug: 'microcontrollers', products_count: 15 },
      { id: 2, name: 'Sensors', slug: 'sensors', products_count: 32 },
      { id: 3, name: 'Actuators', slug: 'actuators', products_count: 12 }
    ]);
  });

  app.get('/api/projects', (req, res) => {
    res.json([
      {
        id: 1,
        title: 'Smart Plant Monitor',
        slug: 'smart-plant-monitor',
        description: 'Build an automated plant watering alert system.',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        difficulty: 'Beginner',
        time_estimate: '2 Hours',
        image_url: 'https://picsum.photos/seed/plant/800/600',
        bundle_id: 1,
        components: [
          { id: 1, name: 'Arduino Uno R4 WiFi' },
          { id: 2, name: 'Ultrasonic Sensor HC-SR04' }
        ]
      }
    ]);
  });

  app.get('/api/cart', (req, res) => {
    res.json({ cart: { items: [] }, total: 0 });
  });

  app.post('/api/cart/add-product', (req, res) => {
    res.json({ message: 'Added to cart', cart: { items: [] } });
  });

  app.put('/api/cart/items/:id', (req, res) => {
    res.json({ message: 'Updated quantity' });
  });

  app.delete('/api/cart/items/:id', (req, res) => {
    res.json({ message: 'Removed item' });
  });

  app.post('/api/cart/clear', (req, res) => {
    res.json({ message: 'Cart cleared' });
  });

  app.post('/api/logout', (req, res) => {
    res.json({ message: 'Logged out' });
  });

  app.get('/api/me', (req, res) => {
    res.json({ id: 1, name: 'Demo User', role: 'buyer' });
  });

  // --- VITE MIDDLEWARE ---
  
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pinnacle Tech Market running at http://localhost:${PORT}`);
    console.log(`API Bridge active at http://localhost:${PORT}/api`);
  });
}

startServer();
