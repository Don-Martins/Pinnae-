import { Product, Project, Bundle } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Arduino Uno R4 WiFi',
    description: 'The latest Arduino Uno with WiFi and Bluetooth capabilities, featuring a powerful 32-bit microcontroller.',
    price: 38.50,
    category: 'Microcontrollers',
    image: 'https://picsum.photos/seed/arduino/600/600',
    rating: 4.9,
    reviews: 128,
    stock: 45
  },
  {
    id: 'p2',
    name: 'Ultrasonic Distance Sensor',
    description: 'HC-SR04 ultrasonic sensor for non-contact distance measurement from 2cm to 400cm.',
    price: 4.99,
    category: 'Sensors',
    image: 'https://picsum.photos/seed/sensor/600/600',
    rating: 4.7,
    reviews: 85,
    stock: 120
  },
  {
    id: 'p3',
    name: 'Micro Servo Motor SG90',
    description: 'Tiny and lightweight servo motor, perfect for small robotics and RC projects.',
    price: 3.50,
    category: 'Actuators',
    image: 'https://picsum.photos/seed/servo/600/600',
    rating: 4.5,
    reviews: 210,
    stock: 300
  },
  {
    id: 'p4',
    name: 'ESP32 Development Board',
    description: 'Powerful dual-core microcontroller with integrated WiFi and Bluetooth, ideal for IoT projects.',
    price: 8.90,
    category: 'Microcontrollers',
    image: 'https://picsum.photos/seed/esp32/600/600',
    rating: 4.8,
    reviews: 156,
    stock: 80
  },
  {
    id: 'p5',
    name: 'OLED Display 128x64',
    description: '0.96 inch I2C OLED display module, bright and clear for data visualization.',
    price: 6.75,
    category: 'Sensors',
    image: 'https://picsum.photos/seed/oled/600/600',
    rating: 4.6,
    reviews: 92,
    stock: 65
  },
  {
    id: 'p6',
    name: 'LiPo Battery 3.7V 1000mAh',
    description: 'Rechargeable lithium polymer battery for portable electronics projects.',
    price: 12.50,
    category: 'Power',
    image: 'https://picsum.photos/seed/battery/600/600',
    rating: 4.4,
    reviews: 45,
    stock: 30
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    name: 'Smart Plant Monitor',
    description: 'Build a system that monitors soil moisture and alerts you when your plant needs water.',
    image: 'https://picsum.photos/seed/plant/800/600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    difficulty: 'Beginner',
    timeEstimate: '2 Hours',
    bundleId: 'b1',
    components: ['p1', 'p2', 'p5']
  },
  {
    id: 'proj2',
    name: 'Mini Obstacle Avoiding Robot',
    description: 'Create a small robot that uses ultrasonic sensors to navigate around obstacles.',
    image: 'https://picsum.photos/seed/robot/800/600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    difficulty: 'Intermediate',
    timeEstimate: '5 Hours',
    bundleId: 'b2',
    components: ['p4', 'p2', 'p3', 'p6']
  }
];

export const BUNDLES: Bundle[] = [
  {
    id: 'b1',
    name: 'Smart Plant Kit',
    description: 'Everything you need to start monitoring your plants.',
    projectIds: ['proj1'],
    productIds: ['p1', 'p2', 'p5'],
    discountPercentage: 10
  },
  {
    id: 'b2',
    name: 'Robotics Starter Bundle',
    description: 'The core components for building your first autonomous robot.',
    projectIds: ['proj2'],
    productIds: ['p4', 'p2', 'p3', 'p6'],
    discountPercentage: 15
  }
];
