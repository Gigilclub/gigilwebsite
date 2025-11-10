import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.gift.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Tech gadgets and electronic devices',
        imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Books',
        slug: 'books',
        description: 'Books for all ages and interests',
        imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Clothing, accessories, and style',
        imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Home & Living',
        slug: 'home-living',
        description: 'Home decor and living essentials',
        imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Sports & Outdoors',
        slug: 'sports-outdoors',
        description: 'Gear for active lifestyles',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Toys & Games',
        slug: 'toys-games',
        description: 'Fun for kids and families',
        imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4',
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create sample gifts
  const gifts = await Promise.all([
    // Electronics for tech lovers
    prisma.gift.create({
      data: {
        name: 'Wireless Bluetooth Earbuds',
        description: 'High-quality sound with noise cancellation, perfect for music lovers',
        price: 79.99,
        priceRange: '50-100',
        categoryId: categories[0].id,
        recipientType: 'anyone',
        interests: ['tech', 'music'],
        occasion: ['birthday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
        url: 'https://example.com/earbuds',
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Smart Watch Fitness Tracker',
        description: 'Track your fitness goals with style',
        price: 199.99,
        priceRange: '100-plus',
        categoryId: categories[0].id,
        recipientType: 'anyone',
        interests: ['tech', 'fitness'],
        occasion: ['birthday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4b719223d',
        url: 'https://example.com/smartwatch',
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Portable Phone Charger',
        description: 'Never run out of battery on the go',
        price: 24.99,
        priceRange: 'under-25',
        categoryId: categories[0].id,
        recipientType: 'anyone',
        interests: ['tech', 'travel'],
        occasion: ['any'],
        imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5',
        url: 'https://example.com/charger',
      },
    }),

    // Books
    prisma.gift.create({
      data: {
        name: 'Bestselling Fiction Novel',
        description: 'A captivating story that will keep them turning pages',
        price: 18.99,
        priceRange: 'under-25',
        categoryId: categories[1].id,
        recipientType: 'anyone',
        interests: ['reading'],
        occasion: ['birthday', 'thank-you', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
        url: 'https://example.com/novel',
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Cookbook for Beginners',
        description: 'Easy recipes for aspiring chefs',
        price: 29.99,
        priceRange: '25-50',
        categoryId: categories[1].id,
        recipientType: 'anyone',
        interests: ['food', 'reading'],
        occasion: ['birthday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        url: 'https://example.com/cookbook',
      },
    }),

    // Fashion
    prisma.gift.create({
      data: {
        name: 'Designer Leather Wallet',
        description: 'Elegant and practical leather wallet',
        price: 89.99,
        priceRange: '50-100',
        categoryId: categories[2].id,
        recipientType: 'him',
        interests: ['fashion'],
        occasion: ['birthday', 'anniversary', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
        url: 'https://example.com/wallet',
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Luxury Silk Scarf',
        description: 'Beautiful handcrafted silk scarf',
        price: 65.00,
        priceRange: '50-100',
        categoryId: categories[2].id,
        recipientType: 'her',
        interests: ['fashion', 'arts'],
        occasion: ['birthday', 'anniversary', 'holiday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26',
        url: 'https://example.com/scarf',
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Stylish Sunglasses',
        description: 'Trendy sunglasses with UV protection',
        price: 45.00,
        priceRange: '25-50',
        categoryId: categories[2].id,
        recipientType: 'anyone',
        interests: ['fashion', 'travel'],
        occasion: ['birthday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
        url: 'https://example.com/sunglasses',
      },
    }),

    // Home & Living
    prisma.gift.create({
      data: {
        name: 'Scented Candle Gift Set',
        description: 'Luxury aromatherapy candles for relaxation',
        price: 39.99,
        priceRange: '25-50',
        categoryId: categories[3].id,
        recipientType: 'anyone',
        interests: ['arts'],
        occasion: ['birthday', 'thank-you', 'holiday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1602874801006-458b52d02d9b',
        url: 'https://example.com/candles',
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Premium Coffee Maker',
        description: 'Brew barista-quality coffee at home',
        price: 149.99,
        priceRange: '100-plus',
        categoryId: categories[3].id,
        recipientType: 'anyone',
        interests: ['food'],
        occasion: ['birthday', 'anniversary', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6',
        url: 'https://example.com/coffee-maker',
      },
    }),

    // Sports & Outdoors
    prisma.gift.create({
      data: {
        name: 'Yoga Mat Set',
        description: 'Non-slip yoga mat with carrying strap',
        price: 34.99,
        priceRange: '25-50',
        categoryId: categories[4].id,
        recipientType: 'anyone',
        interests: ['fitness', 'sports'],
        occasion: ['birthday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f',
        url: 'https://example.com/yoga-mat',
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Hiking Backpack',
        description: 'Durable backpack for outdoor adventures',
        price: 79.99,
        priceRange: '50-100',
        categoryId: categories[4].id,
        recipientType: 'anyone',
        interests: ['sports', 'travel'],
        occasion: ['birthday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1622260614153-03223fb72052',
        url: 'https://example.com/backpack',
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Water Bottle with Infuser',
        description: 'Stay hydrated with fruit-infused water',
        price: 19.99,
        priceRange: 'under-25',
        categoryId: categories[4].id,
        recipientType: 'anyone',
        interests: ['fitness', 'sports'],
        occasion: ['any'],
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
        url: 'https://example.com/water-bottle',
      },
    }),

    // Toys & Games
    prisma.gift.create({
      data: {
        name: 'Building Blocks Set',
        description: 'Creative building toy for kids',
        price: 44.99,
        priceRange: '25-50',
        categoryId: categories[5].id,
        recipientType: 'kids',
        interests: ['arts', 'gaming'],
        occasion: ['birthday', 'holiday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b',
        url: 'https://example.com/building-blocks',
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Board Game Collection',
        description: 'Family-friendly board games for all ages',
        price: 59.99,
        priceRange: '50-100',
        categoryId: categories[5].id,
        recipientType: 'anyone',
        interests: ['gaming'],
        occasion: ['birthday', 'holiday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015',
        url: 'https://example.com/board-games',
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Art Supplies Kit',
        description: 'Complete art set for young artists',
        price: 32.99,
        priceRange: '25-50',
        categoryId: categories[5].id,
        recipientType: 'kids',
        interests: ['arts'],
        occasion: ['birthday', 'holiday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634',
        url: 'https://example.com/art-kit',
      },
    }),

    // Teen-specific gifts
    prisma.gift.create({
      data: {
        name: 'Gaming Mouse and Pad',
        description: 'RGB gaming mouse with precision pad',
        price: 49.99,
        priceRange: '25-50',
        categoryId: categories[0].id,
        recipientType: 'teen',
        interests: ['gaming', 'tech'],
        occasion: ['birthday', 'holiday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc',
        url: 'https://example.com/gaming-mouse',
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Trendy Backpack',
        description: 'Stylish school backpack with laptop compartment',
        price: 54.99,
        priceRange: '50-100',
        categoryId: categories[2].id,
        recipientType: 'teen',
        interests: ['fashion'],
        occasion: ['birthday', 'any'],
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
        url: 'https://example.com/backpack-teen',
      },
    }),
  ]);

  console.log(`✅ Created ${gifts.length} gifts`);
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
