/**
 * License: NPL-KK
 * File: seed.js
 * Seed Dummy Coal Products into MongoDB
 */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Product = require('./models/Product');

dotenv.config();

const dummyProducts = [
  {
    name: 'Coal GAR 3400 (Low Calorie Eco)',
    calorie: 'GAR 3400 / NAR 3100',
    origin: 'Kalimantan Selatan (Satui)',
    description: 'Batu bara Sub-Bituminous kalori rendah ekonomis ideal untuk boiler pembangkit listrik (PLTU) skala sedang. Pembakaran efisien dengan sisa abu minimal.',
    priceEstimate: 'US$ 42 - 48 / Ton (FOB Barge)',
    isActive: true
  },
  {
    name: 'Coal GAR 3800 (Sub-Bituminous Industrial)',
    calorie: 'GAR 3800 / NAR 3500',
    origin: 'Kalimantan Selatan (Asam Asam)',
    description: 'Spesifikasi terfavorit industri tekstil & pabrik kertas lokal. Memiliki kandungan sulfur rendah (<0.4%) dan stabilitas temperatur pembakaran yang konsisten.',
    priceEstimate: 'US$ 48 - 56 / Ton (FOB Barge)',
    isActive: true
  },
  {
    name: 'Coal GAR 4200 (Medium Calorie Export Grade)',
    calorie: 'GAR 4200 / NAR 3900',
    origin: 'Kalimantan Timur (Mahakam)',
    description: 'Spesifikasi ekspor paling populer untuk pasar China, India, dan Vietnam. Cocok untuk industri semen, energi termal, dan manufaktur berat.',
    priceEstimate: 'US$ 62 - 70 / Ton (FOB Vessel)',
    isActive: true
  },
  {
    name: 'Coal GAR 4700 (Mid-High Calorie Thermal)',
    calorie: 'GAR 4700 / NAR 4400',
    origin: 'Kalimantan Timur (Sangatta)',
    description: 'Batu bara energi menengah-tinggi dengan Hardgrove Grindability Index (HGI) ideal 50-55. Sangat mudah digiling untuk pulverizer PLTU modern.',
    priceEstimate: 'US$ 72 - 80 / Ton (FOB Vessel)',
    isActive: true
  },
  {
    name: 'Coal GAR 5000 (Medium High Calorie Metallurgy)',
    calorie: 'GAR 5000 / NAR 4700',
    origin: 'Sumatra Selatan (Muara Enim)',
    description: 'Batu bara energi tinggi asal Sumatra dengan nilai kalor tinggi dan Inherent Moisture rendah. Cocok untuk industri peleburan logam & semen.',
    priceEstimate: 'US$ 78 - 88 / Ton (FOB Vessel)',
    isActive: true
  },
  {
    name: 'Coal GAR 5800 (High Calorie Bituminous)',
    calorie: 'GAR 5800 / NAR 5500',
    origin: 'Kalimantan Tengah (Barito)',
    description: 'Batu bara kualitas Bituminous premium bernilai energi tinggi. Kandungan air (TM) di bawah 14% dengan volatile matter seimbang.',
    priceEstimate: 'US$ 95 - 105 / Ton (FOB Vessel)',
    isActive: true
  },
  {
    name: 'Coal GAR 6500 (Super Premium Anthracite Grade)',
    calorie: 'GAR 6500 / NAR 6200',
    origin: 'Kalimantan Timur (Berau)',
    description: 'Batu bara Bituminous super premium untuk ekspor Jepang, Korea Selatan, dan Eropa. Kandungan ash terendah (<5%) dan energi panas maksimal.',
    priceEstimate: 'US$ 120 - 135 / Ton (FOB Vessel)',
    isActive: true
  }
];

async function seedDB() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/coal_db';
    console.log('[SEED] Connecting to MongoDB...', uri);
    await mongoose.connect(uri);

    console.log('[SEED] Clearing existing products...');
    await Product.deleteMany({});

    console.log('[SEED] Inserting dummy products...');
    const inserted = await Product.insertMany(dummyProducts);
    console.log(`[SEED] Success! Inserted ${inserted.length} dummy coal products.`);
    process.exit(0);
  } catch (err) {
    console.error('[SEED] Error seeding database:', err.message);
    process.exit(1);
  }
}

seedDB();
