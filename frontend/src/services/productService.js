import axios from 'axios';

// Backend API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Sample product categories with comparison data
export const productCategories = {
  smartphones: {
    products: [
      {
        id: 1,
        name: "iPhone 14 Pro Max",
        description: "Apple's flagship smartphone with A16 Bionic chip, 48MP camera system, and Dynamic Island. Features all-day battery life and a stunning Super Retina XDR display.",
        imageUrl: "https://m.media-amazon.com/images/I/71yzJoE7WlL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/61nzPMNY8zL._SX679_.jpg"],
        price: {
          flipkart: 129900,
          amazon: 129999
        },
        links: {
          flipkart: "https://www.flipkart.com/apple-iphone-14-pro-max-deep-purple-128-gb/p/itm5256789f5980a",
          amazon: "https://www.amazon.in/Apple-iPhone-Pro-Max-128GB/dp/B0BDJ7P6NG"
        },
        specs: {
          ram: "6GB",
          storage: "128GB",
          display: "6.7-inch Super Retina XDR",
          processor: "A16 Bionic",
          camera: "48MP + 12MP + 12MP"
        }
      },
      {
        id: 2,
        name: "Samsung Galaxy S23 Ultra",
        description: "Samsung's premium flagship with S Pen support, 200MP camera, Snapdragon 8 Gen 2 processor, and a massive 5000mAh battery for extended use.",
        imageUrl: "https://m.media-amazon.com/images/I/61VfL-aiToL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71Tt5Ru+lpL._SX679_.jpg"],
        price: {
          flipkart: 124999,
          amazon: 124999
        },
        links: {
          flipkart: "https://www.flipkart.com/samsung-galaxy-s23-ultra-5g-green-256-gb/p/itm5e02a1ea3e19c",
          amazon: "https://www.amazon.in/Samsung-Galaxy-Ultra-Cream-Storage/dp/B0BZCR4TWZ"
        },
        specs: {
          ram: "12GB",
          storage: "256GB",
          display: "6.8-inch Dynamic AMOLED 2X",
          processor: "Snapdragon 8 Gen 2",
          camera: "200MP + 12MP + 10MP + 10MP"
        }
      },
      {
        id: 3,
        name: "Google Pixel 7 Pro",
        description: "Google's flagship phone with Tensor G2 chip, exceptional camera capabilities, clean Android experience, and robust AI features for smart photography.",
        imageUrl: "https://m.media-amazon.com/images/I/71PM5gRQj6L._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/61uOQq5riOL._SX679_.jpg"],
        price: {
          flipkart: 79999,
          amazon: 77999
        },
        links: {
          flipkart: "https://www.flipkart.com/google-pixel-7-pro-hazel-128-gb/p/itm8f5c869fca3d5",
          amazon: "https://www.amazon.in/Google-Pixel-Pro-Hazel-Storage/dp/B0BCRBH4Z2"
        },
        specs: {
          ram: "12GB",
          storage: "128GB",
          display: "6.7-inch QHD+ LTPO OLED",
          processor: "Google Tensor G2",
          camera: "50MP + 48MP + 12MP"
        }
      },
      {
        id: 4,
        name: "OnePlus 11 5G",
        description: "Flagship performance with Snapdragon 8 Gen 2, Hasselblad camera system, and 100W fast charging. Features 120Hz AMOLED display and OxygenOS for smooth operation.",
        imageUrl: "https://m.media-amazon.com/images/I/61amb0CfMGL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71oEKkEidNL._SX679_.jpg"],
        price: {
          flipkart: 61999,
          amazon: 61999
        },
        links: {
          flipkart: "https://www.flipkart.com/oneplus-11-5g-eternal-green-256-gb/p/itm9d1e56fedb8fc",
          amazon: "https://www.amazon.in/OnePlus-Eternal-Green-256GB-Storage/dp/B0BSNP46QZ"
        },
        specs: {
          ram: "16GB",
          storage: "256GB",
          display: "6.7-inch 120Hz AMOLED",
          processor: "Snapdragon 8 Gen 2",
          camera: "50MP + 48MP + 32MP"
        }
      },
      {
        id: 5,
        name: "Xiaomi 13 Pro",
        description: "Premium smartphone with Leica optics, Snapdragon 8 Gen 2, ceramic build, and 120W HyperCharge. Features a 50MP triple camera system for professional photography.",
        imageUrl: "https://m.media-amazon.com/images/I/515TBk-iJ8L._SX569_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/61CX1noQ8SL._SX569_.jpg"],
        price: {
          flipkart: 79999,
          amazon: 79999
        },
        links: {
          flipkart: "https://www.flipkart.com/xiaomi-13-pro-ceramic-black-256-gb/p/itm3f30d92d7f407",
          amazon: "https://www.amazon.in/Xiaomi-Ceramic-Black-Storage-Processor/dp/B0BXWM7NWL"
        },
        specs: {
          ram: "12GB",
          storage: "256GB",
          display: "6.73-inch WQHD+ E6 AMOLED",
          processor: "Snapdragon 8 Gen 2",
          camera: "50MP + 50MP + 50MP (Leica)"
        }
      },
      {
        id: 6,
        name: "iPhone 13 Pro",
        description: "Previous-generation Apple flagship with A15 Bionic chip, excellent camera system, and Super Retina XDR display with ProMotion technology.",
        imageUrl: "https://m.media-amazon.com/images/I/61jLiCovxVL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71NVgHZZJ9L._SX679_.jpg"],
        price: {
          flipkart: 109900,
          amazon: 107999
        },
        links: {
          flipkart: "https://www.flipkart.com/apple-iphone-13-pro-graphite-256-gb/p/itm47e5c4dce64ea",
          amazon: "https://www.amazon.in/Apple-iPhone-13-Pro-256GB/dp/B09G9HD6PD"
        },
        specs: {
          ram: "6GB",
          storage: "256GB",
          display: "6.1-inch Super Retina XDR with ProMotion",
          processor: "A15 Bionic",
          camera: "12MP + 12MP + 12MP"
        }
      },
      {
        id: 7,
        name: "iPhone 12",
        description: "Feature-packed iPhone with A14 Bionic chip, excellent dual-camera system, and OLED display at a more affordable price point.",
        imageUrl: "https://m.media-amazon.com/images/I/71hIfcIPyxS._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71MHTD3uL4L._SX679_.jpg"],
        price: {
          flipkart: 59999,
          amazon: 58499
        },
        links: {
          flipkart: "https://www.flipkart.com/apple-iphone-12-black-128-gb/p/itm64683d5c8e20a",
          amazon: "https://www.amazon.in/New-Apple-iPhone-12-128GB/dp/B08L5TNJHG"
        },
        specs: {
          ram: "4GB",
          storage: "128GB",
          display: "6.1-inch Super Retina XDR",
          processor: "A14 Bionic",
          camera: "12MP + 12MP"
        }
      },
      {
        id: 8,
        name: "iPhone SE (2022)",
        description: "Budget-friendly iPhone with powerful A15 Bionic chip, compact design with TouchID, and excellent camera for the price.",
        imageUrl: "https://m.media-amazon.com/images/I/61TOWf11+jL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71qvak229GL._SX679_.jpg"],
        price: {
          flipkart: 43900,
          amazon: 41999
        },
        links: {
          flipkart: "https://www.flipkart.com/apple-iphone-se-black-128-gb/p/itmfc6a7091eb20b",
          amazon: "https://www.amazon.in/Apple-iPhone-SE-128GB-Midnight/dp/B09V4JGHSS"
        },
        specs: {
          ram: "4GB",
          storage: "128GB",
          display: "4.7-inch Retina HD",
          processor: "A15 Bionic",
          camera: "12MP"
        }
      },
      {
        id: 9,
        name: "iPhone 14",
        description: "Latest iPhone model with A15 Bionic chip, upgraded camera system with improved low-light performance, and enhanced battery life.",
        imageUrl: "https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/81WrPdgc6PL._SX679_.jpg"],
        price: {
          flipkart: 79900,
          amazon: 77999
        },
        links: {
          flipkart: "https://www.flipkart.com/apple-iphone-14-midnight-128-gb/p/itm9e6293c322a84",
          amazon: "https://www.amazon.in/Apple-iPhone-14-128GB-Midnight/dp/B0BDJ7P6NG"
        },
        specs: {
          ram: "6GB",
          storage: "128GB",
          display: "6.1-inch Super Retina XDR",
          processor: "A15 Bionic",
          camera: "12MP + 12MP"
        }
      },
      {
        id: 10,
        name: "iPhone 14 Plus",
        description: "Larger iPhone 14 variant with 6.7-inch display, all-day battery life, and the same powerful features as the standard iPhone 14.",
        imageUrl: "https://m.media-amazon.com/images/I/61BGE6iu4AL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71MfoRx+G4L._SX679_.jpg"],
        price: {
          flipkart: 89900,
          amazon: 87499
        },
        links: {
          flipkart: "https://www.flipkart.com/apple-iphone-14-plus-blue-128-gb/p/itm24a7f343b2c22",
          amazon: "https://www.amazon.in/Apple-iPhone-14-Plus-128GB/dp/B0BDJH2GH4"
        },
        specs: {
          ram: "6GB",
          storage: "128GB",
          display: "6.7-inch Super Retina XDR",
          processor: "A15 Bionic",
          camera: "12MP + 12MP"
        }
      }
    ]
  },
  laptops: {
    products: [
      {
        id: 1,
        name: "MacBook Air M2",
        description: "Apple MacBook Air with M2 chip, redesigned chassis, and improved performance. Features a 13.6-inch Liquid Retina display and up to 18 hours of battery life.",
        imageUrl: "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71vFKBpKakL._SX679_.jpg"],
        price: {
          flipkart: 114900,
          amazon: 114990
        },
        links: {
          flipkart: "https://www.flipkart.com/apple-2022-macbook-air-m2-8-core-8-core-gpu-8gb-256gb-ssd-mac-os-monterey-mly33hn-a/p/itm56c466af4f12b",
          amazon: "https://www.amazon.in/Apple-MacBook-Laptop-8-core-256GB/dp/B0B3BMLLRQ"
        },
        specs: {
          processor: "Apple M2",
          ram: "8GB",
          storage: "256GB SSD",
          display: "13.6-inch Liquid Retina",
          graphics: "8-core GPU"
        }
      },
      {
        id: 2,
        name: "Dell XPS 13",
        description: "Ultra-thin and light premium laptop with InfinityEdge display, 12th Gen Intel Core processors, and exceptional build quality.",
        imageUrl: "https://m.media-amazon.com/images/I/71m-xBzIFWL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71RbA+iFLbL._SX679_.jpg"],
        price: {
          flipkart: 149990,
          amazon: 146990
        },
        links: {
          flipkart: "https://www.flipkart.com/dell-xps-13-core-i7-12th-gen-16-gb-512-gb-ssd-windows-11-home-thin-light-laptop/p/itm98ab042fa3ea7",
          amazon: "https://www.amazon.in/Dell-i7-1250U-Display-Fingerprint-Recognition/dp/B0B7MMZNG3"
        },
        specs: {
          processor: "Intel Core i7-1260P",
          ram: "16GB",
          storage: "512GB SSD",
          display: "13.4-inch 3.5K OLED",
          graphics: "Intel Iris Xe"
        }
      },
      {
        id: 3,
        name: "HP Spectre x360",
        description: "Premium 2-in-1 convertible laptop with gem-cut design, vivid OLED display, and excellent performance for creative professionals.",
        imageUrl: "https://m.media-amazon.com/images/I/71RaAt97bML._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71hwl0S+URL._SX679_.jpg"],
        price: {
          flipkart: 159990,
          amazon: 156990
        },
        links: {
          flipkart: "https://www.flipkart.com/hp-spectre-x360-core-i7-12th-gen-16-gb-1-tb-ssd-windows-11-home-13-5-ef0053tu-2-1-laptop/p/itm2a1b79ff61a9c",
          amazon: "https://www.amazon.in/HP-Touchscreen-Graphics-Fingerprint-14-ea1538TU/dp/B0BDHZ4N3W"
        },
        specs: {
          processor: "Intel Core i7-1255U",
          ram: "16GB",
          storage: "1TB SSD",
          display: "13.5-inch 3K2K OLED",
          graphics: "Intel Iris Xe"
        }
      }
    ]
  },
  tvs: {
    products: [
      {
        id: 1,
        name: "Samsung Crystal 4K",
        description: "55-inch Crystal 4K UHD Smart TV with HDR support, PurColor technology, and adaptive sound. Features a sleek design and smart TV capabilities.",
        imageUrl: "https://m.media-amazon.com/images/I/71wU8wJRN8L._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71Wee3SmkUL._SX679_.jpg"],
        price: {
          flipkart: 45990,
          amazon: 45999
        },
        links: {
          flipkart: "https://www.flipkart.com/samsung-crystal-4k-138-cm-55-inch-ultra-hd-4k-led-smart-tizen-tv-2023-edition/p/itm41c3bf2e5937c",
          amazon: "https://www.amazon.in/Samsung-Crystal-inches-Ultra-UA55AUE65AKXXL/dp/B0B16KD737"
        },
        specs: {
          resolution: "4K UHD",
          size: "55 inch",
          smartFeatures: "Tizen OS",
          connectivity: "3 HDMI, 1 USB",
          audio: "20W output"
        }
      },
      {
        id: 2,
        name: "LG C2 OLED",
        description: "Premium OLED TV with perfect blacks, incredible contrast, and Dolby Vision IQ. Features HDMI 2.1 for gaming and WebOS for smart capabilities.",
        imageUrl: "https://m.media-amazon.com/images/I/81JXgWbxdDL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/813rbbWmUSL._SX679_.jpg"],
        price: {
          flipkart: 129990,
          amazon: 126999
        },
        links: {
          flipkart: "https://www.flipkart.com/lg-139-cm-55-inch-oled-ultra-hd-4k-smart-webos-tv-2022-edition/p/itmd4bca233b4f0d",
          amazon: "https://www.amazon.in/LG-inches-Ultra-Smart-OLED55C2PSC/dp/B0B3LZNF2M"
        },
        specs: {
          resolution: "4K UHD",
          size: "55 inch",
          smartFeatures: "WebOS 22",
          connectivity: "4 HDMI 2.1, 3 USB",
          audio: "40W with Dolby Atmos"
        }
      }
    ]
  },
  cameras: {
    products: [
      {
        id: 1,
        name: "Sony Alpha A7 IV",
        description: "Full-frame mirrorless camera with 33MP sensor, 4K60p video recording, and advanced autofocus with real-time tracking.",
        imageUrl: "https://m.media-amazon.com/images/I/71LO+KvAX2L._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71rlYpiZDfL._SX679_.jpg"],
        price: {
          flipkart: 241990,
          amazon: 239990
        },
        links: {
          flipkart: "https://www.flipkart.com/sony-alpha-full-frame-ilce-7m4-mirrorless-camera-body-only/p/itm0da76a432146c",
          amazon: "https://www.amazon.in/Sony-Alpha-ILCE-7M4-Full-Frame-Mirrorless/dp/B09JZT6YPS"
        },
        specs: {
          sensorType: "Full-frame Exmor R CMOS",
          resolution: "33MP",
          iso: "100-51200 (expandable to 50-204800)",
          videoResolution: "4K 60p",
          battery: "Up to 580 shots"
        }
      },
      {
        id: 2,
        name: "Canon EOS R6",
        description: "Professional full-frame mirrorless camera with incredible low-light performance, in-body stabilization, and advanced autofocus.",
        imageUrl: "https://m.media-amazon.com/images/I/61TD+HLGQTL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71h3o4jEBTL._SX679_.jpg"],
        price: {
          flipkart: 215990,
          amazon: 214990
        },
        links: {
          flipkart: "https://www.flipkart.com/canon-eos-r6-mirrorless-camera-body-only/p/itm7a010c5033ad3",
          amazon: "https://www.amazon.in/Canon-EOS-R6-Mirrorless-Camera/dp/B08BVT9CK1"
        },
        specs: {
          sensorType: "Full-frame CMOS",
          resolution: "20.1MP",
          iso: "100-102400 (expandable to 204800)",
          videoResolution: "4K 60p",
          battery: "Up to 510 shots"
        }
      }
    ]
  },
  headphones: {
    products: [
      {
        id: 1,
        name: "Sony WH-1000XM5",
        description: "Premium wireless noise-cancelling headphones with industry-leading ANC, exceptional sound quality, and up to 30 hours of battery life.",
        imageUrl: "https://m.media-amazon.com/images/I/61+btxzpfDL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71xgMyDl8hL._SX679_.jpg"],
        price: {
          flipkart: 34990,
          amazon: 33990
        },
        links: {
          flipkart: "https://www.flipkart.com/sony-wh-1000xm5-bluetooth-headset/p/itmefd1c6c3b80bb",
          amazon: "https://www.amazon.in/Sony-WH-1000XM5-Cancelling-Wireless-Headphones/dp/B09XS7JWHH"
        },
        specs: {
          type: "Over-ear",
          batteryLife: "30 hours with ANC",
          connectivity: "Bluetooth 5.2, 3.5mm",
          noiseCancel: "Yes, Adaptive",
          multipoint: "Yes, 2 devices"
        }
      },
      {
        id: 2,
        name: "Apple AirPods Pro 2",
        description: "Premium wireless earbuds with active noise cancellation, spatial audio, and adaptive transparency mode. Features improved battery life and touch controls.",
        imageUrl: "https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71bhWgQK-cL._SX679_.jpg"],
        price: {
          flipkart: 26990,
          amazon: 25990
        },
        links: {
          flipkart: "https://www.flipkart.com/apple-airpods-pro-2nd-generation-anc-bluetooth-headset/p/itm4fb11c4d8492e",
          amazon: "https://www.amazon.in/Apple-AirPods-Pro-2nd-Generation/dp/B0BDKD8DVD"
        },
        specs: {
          type: "In-ear",
          batteryLife: "6 hours (30 with case)",
          connectivity: "Bluetooth 5.3",
          noiseCancel: "Yes, Active",
          waterResistant: "IPX4"
        }
      }
    ]
  },
  watches: {
    products: [
      {
        id: 1,
        name: "Apple Watch Series 8",
        description: "Advanced smartwatch with health monitoring features, always-on display, and seamless integration with iPhone. Includes ECG, blood oxygen, and temperature sensing.",
        imageUrl: "https://m.media-amazon.com/images/I/71XMTLtZZ5L._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/716uvJSZ64L._SX679_.jpg"],
        price: {
          flipkart: 45990,
          amazon: 44999
        },
        links: {
          flipkart: "https://www.flipkart.com/apple-watch-series-8-gps-45-mm-midnight-aluminium-case-sport-band-smartwatch/p/itm3ecd601b1e83a",
          amazon: "https://www.amazon.in/Apple-Watch-Series-GPS-45mm/dp/B0BDJS9Y9X"
        },
        specs: {
          display: "Always-On Retina",
          connectivity: "GPS + Cellular",
          sensors: "ECG, Blood Oxygen, Temperature",
          waterResistant: "50m",
          batteryLife: "Up to 18 hours"
        }
      },
      {
        id: 2,
        name: "Samsung Galaxy Watch 5 Pro",
        description: "Premium smartwatch with a durable titanium design, advanced health features, and multi-day battery life. Perfect for fitness enthusiasts and outdoor activities.",
        imageUrl: "https://m.media-amazon.com/images/I/61xQ14jIsAL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/715xquzaAoL._SX679_.jpg"],
        price: {
          flipkart: 44999,
          amazon: 42999
        },
        links: {
          flipkart: "https://www.flipkart.com/samsung-galaxy-watch5-pro-black-titanium-45-mm-bluetooth-only-smartwatch/p/itm7a6a7e8cc86fb",
          amazon: "https://www.amazon.in/Samsung-Galaxy-Watch5-Titanium-Bluetooth/dp/B0B973LZZT"
        },
        specs: {
          display: "1.4-inch Super AMOLED",
          connectivity: "Bluetooth, LTE",
          sensors: "BioActive Sensor, Temperature",
          waterResistant: "5ATM + IP68",
          batteryLife: "Up to 80 hours"
        }
      }
    ]
  },
  gaming: {
    products: [
      {
        id: 1,
        name: "PlayStation 5",
        description: "Next-generation gaming console with ultra-high-speed SSD, ray tracing, 4K gaming, and immersive DualSense controller with haptic feedback.",
        imageUrl: "https://m.media-amazon.com/images/I/51mWHXY8hyL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/61Irs4uzPuL._SX679_.jpg"],
        price: {
          flipkart: 54990,
          amazon: 53990
        },
        links: {
          flipkart: "https://www.flipkart.com/sony-playstation-5-cfi-1208a01r-825-gb-astro-s-playroom/p/itme40e8d562a809",
          amazon: "https://www.amazon.in/PlayStation-5-Console-CFI-1208A01R/dp/B0BSNHFVH1"
        },
        specs: {
          cpu: "AMD Zen 2 (8 cores)",
          gpu: "AMD RDNA 2 (10.28 TFLOPS)",
          storage: "825GB SSD",
          resolution: "Up to 4K 120Hz",
          features: "Ray Tracing, 3D Audio"
        }
      },
      {
        id: 2,
        name: "Xbox Series X",
        description: "Microsoft's most powerful console with 12 teraflops of processing power, quick resume, 4K gaming at up to 120fps, and backward compatibility.",
        imageUrl: "https://m.media-amazon.com/images/I/61-jjE67uiL._SX679_.jpg",
        additionalImages: ["https://m.media-amazon.com/images/I/71NBQ2a52CL._SX679_.jpg"],
        price: {
          flipkart: 52990,
          amazon: 51990
        },
        links: {
          flipkart: "https://www.flipkart.com/xbox-series-x-1-tb/p/itm5a644f2175ead",
          amazon: "https://www.amazon.in/Xbox-Series-X/dp/B08J7QX1N1"
        },
        specs: {
          cpu: "AMD Zen 2 (8 cores)",
          gpu: "AMD RDNA 2 (12 TFLOPS)",
          storage: "1TB SSD",
          resolution: "Up to 4K 120Hz",
          features: "Quick Resume, Ray Tracing"
        }
      }
    ]
  }
};

/**
 * Get product details by category and ID
 */
export const getProductDetails = (category, productId) => {
  return new Promise((resolve, reject) => {
    try {
      const categoryData = productCategories[category];
      if (categoryData) {
        const product = categoryData.products.find(p => p.id === parseInt(productId));
        if (product) {
          // Try to get real-time price data from backend
          getRealTimePrices(product)
            .then(enhancedProduct => {
              resolve(enhancedProduct);
            })
            .catch(error => {
              console.warn("Could not get real-time prices:", error);
              resolve(product); // Return original product if real-time prices fail
            });
        } else {
          reject(new Error("Product not found"));
        }
      } else {
        reject(new Error("Category not found"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Get all products in a category
 */
export const getCategoryProducts = (category) => {
  return new Promise((resolve, reject) => {
    try {
      const categoryData = productCategories[category];
      if (categoryData) {
        // Try to get real-time price data for all products in category
        Promise.all(
          categoryData.products.map(product => getRealTimePrices(product))
        )
          .then(enhancedProducts => {
            const enhancedCategory = {
              ...categoryData,
              products: enhancedProducts.filter(Boolean) // Filter out any nulls
            };
            resolve(enhancedCategory);
          })
          .catch(error => {
            console.warn("Could not get real-time prices for category:", error);
            resolve(categoryData); // Return original data if real-time prices fail
          });
      } else {
        reject(new Error("Category not found"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Get price comparison for a specific product
 */
export const getPriceComparison = (category, productId) => {
  return new Promise((resolve, reject) => {
    try {
      const categoryData = productCategories[category];
      if (categoryData) {
        const product = categoryData.products.find(p => p.id === parseInt(productId));
        if (product) {
          // Try to get real-time price data
          getRealTimePrices(product)
            .then(enhancedProduct => {
              // Extract price comparison data
              const priceComparison = {
                productName: enhancedProduct.name,
                prices: {
                  amazon: enhancedProduct.realTimePrices?.amazon || enhancedProduct.price.amazon,
                  flipkart: enhancedProduct.realTimePrices?.flipkart || enhancedProduct.price.flipkart,
                  walmart: enhancedProduct.realTimePrices?.walmart,
                  bestBuy: enhancedProduct.realTimePrices?.bestBuy
                },
                formattedPrices: {
                  amazon: enhancedProduct.formattedPrices?.amazon || `₹${enhancedProduct.price.amazon}`,
                  flipkart: enhancedProduct.formattedPrices?.flipkart || `₹${enhancedProduct.price.flipkart}`,
                  walmart: enhancedProduct.formattedPrices?.walmart,
                  bestBuy: enhancedProduct.formattedPrices?.bestBuy
                },
                lastUpdated: enhancedProduct.priceLastUpdated || new Date().toISOString()
              };
              
              // Find the best deal
              const prices = Object.entries(priceComparison.prices)
                .filter(([_, price]) => price !== undefined)
                .map(([retailer, price]) => ({ retailer, price }));
              
              if (prices.length > 0) {
                // Sort by price (lowest first)
                const bestDeal = prices.sort((a, b) => a.price - b.price)[0];
                priceComparison.bestDeal = {
                  retailer: bestDeal.retailer,
                  price: bestDeal.price,
                  formattedPrice: priceComparison.formattedPrices[bestDeal.retailer]
                };
              }
              
              resolve(priceComparison);
            })
            .catch(error => {
              console.warn("Could not get real-time price comparison:", error);
              
              // Fallback to static data
              const priceComparison = {
                productName: product.name,
                prices: product.price,
                formattedPrices: {
                  amazon: `₹${product.price.amazon}`,
                  flipkart: `₹${product.price.flipkart}`
                },
                bestDeal: product.price.amazon <= product.price.flipkart 
                  ? { retailer: 'amazon', price: product.price.amazon, formattedPrice: `₹${product.price.amazon}` }
                  : { retailer: 'flipkart', price: product.price.flipkart, formattedPrice: `₹${product.price.flipkart}` }
              };
              
              resolve(priceComparison);
            });
        } else {
          reject(new Error("Product not found"));
        }
      } else {
        reject(new Error("Category not found"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Get purchase links for a specific product
 */
export const getProductLinks = (category, productId) => {
  return new Promise((resolve, reject) => {
    try {
      const categoryData = productCategories[category];
      if (categoryData) {
        const product = categoryData.products.find(p => p.id === parseInt(productId));
        if (product) {
          resolve(product.links);
        } else {
          reject(new Error("Product not found"));
        }
      } else {
        reject(new Error("Category not found"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Get all available categories
 */
export const getAllCategories = () => {
  return new Promise((resolve) => {
    const categories = Object.keys(productCategories).map(key => {
      return {
        id: key,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        imageUrl: productCategories[key].products[0]?.imageUrl || 'default-category.jpg',
        productCount: productCategories[key].products.length
      };
    });
    resolve(categories);
  });
};

/**
 * Search for products based on a query
 * @param {string} query - The search query
 * @returns {Array} - Array of matching products with additional metadata
 */
export const searchProducts = (query) => {
  return new Promise((resolve) => {
    query = query.toLowerCase();
    let results = [];
    
    Object.keys(productCategories).forEach(category => {
      const matchingProducts = productCategories[category].products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query)
      );
      
      results = [
        ...results,
        ...matchingProducts.map(product => ({
          ...product,
          category
        }))
      ];
    });
    
    // Try to get real-time prices for search results
    Promise.all(
      results.map(product => getRealTimePrices(product))
    )
      .then(enhancedProducts => {
        resolve(enhancedProducts.filter(Boolean)); // Filter out any nulls
      })
      .catch(error => {
        console.warn("Could not get real-time prices for search results:", error);
        resolve(results); // Return original results if real-time prices fail
      });
  });
};

/**
 * Helper function to fetch real-time prices from backend
 * @param {Object} product - Product object
 * @returns {Promise<Object>} - Enhanced product with real-time prices
 */
async function getRealTimePrices(product) {
  try {
    // Only proceed if we have a valid product
    if (!product || !product.id) {
      return product;
    }
    
    // Build retailer URLs if not present
    const amazonUrl = product.links?.amazon || null;
    const flipkartUrl = product.links?.flipkart || null;
    const relianceDigitalUrl = product.links?.relianceDigital || null;
    const cromaUrl = product.links?.croma || null;
    
    // Skip if no retail links available
    if (!amazonUrl && !flipkartUrl && !relianceDigitalUrl && !cromaUrl) {
      return product;
    }
    
    // Call our backend API to get the real-time prices
    const response = await axios.post(`${API_BASE_URL}/products/real-time-prices`, {
      productId: product.id,
      productName: product.name,
      retailers: {
        amazon: amazonUrl,
        flipkart: flipkartUrl,
        relianceDigital: relianceDigitalUrl,
        croma: cromaUrl
      }
    });
    
    if (response.data && response.data.success) {
      // Extract the real-time pricing data
      const { prices, timestamp } = response.data;
      
      // Create formatted prices
      const formattedPrices = {};
      if (prices.amazon) formattedPrices.amazon = prices.amazon.formattedPrice;
      if (prices.flipkart) formattedPrices.flipkart = prices.flipkart.formattedPrice;
      if (prices.relianceDigital) formattedPrices.relianceDigital = prices.relianceDigital.formattedPrice;
      if (prices.croma) formattedPrices.croma = prices.croma.formattedPrice;
      
      // Create numeric prices
      const realTimePrices = {};
      if (prices.amazon) realTimePrices.amazon = prices.amazon.price;
      if (prices.flipkart) realTimePrices.flipkart = prices.flipkart.price;
      if (prices.relianceDigital) realTimePrices.relianceDigital = prices.relianceDigital.price;
      if (prices.croma) realTimePrices.croma = prices.croma.price;
      
      // Return enhanced product with real-time prices
      return {
        ...product,
        realTimePrices,
        formattedPrices,
        priceLastUpdated: timestamp
      };
    }
    
    return product;
  } catch (error) {
    console.error("Error fetching real-time prices:", error);
    return product;
  }
} 