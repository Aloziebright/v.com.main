// DOM Elements
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const cameraBtn = document.getElementById('camera-btn');
const cameraPreview = document.getElementById('camera-preview');
const cameraFeed = document.getElementById('camera-feed');
const captureBtn = document.getElementById('capture-btn');
const cancelCameraBtn = document.getElementById('cancel-camera-btn');
const loading = document.getElementById('loading');
const resultsSection = document.getElementById('results-section');
const resultsCount = document.getElementById('results-count');
const productGrid = document.getElementById('product-grid');

// Sample product data
const sampleProducts = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        price: "$79.99",
        rating: "★★★★☆",
        store: "Amazon",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        title: "Smartphone with Triple Camera",
        price: "$699.99",
        rating: "★★★★★",
        store: "Best Buy",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        title: "Running Shoes - Men's",
        price: "$129.99",
        rating: "★★★★☆",
        store: "Nike",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        title: "Stainless Steel Water Bottle",
        price: "$24.99",
        rating: "★★★★★",
        store: "Hydro Flask",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 5,
        title: "Wireless Charging Pad",
        price: "$39.99",
        rating: "★★★☆☆",
        store: "Apple",
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 6,
        title: "Laptop Backpack",
        price: "$49.99",
        rating: "★★★★☆",
        store: "Target",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 7,
        title: "Smart Watch",
        price: "$199.99",
        rating: "★★★★★",
        store: "Samsung",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 8,
        title: "Coffee Maker",
        price: "$89.99",
        rating: "★★★★☆",
        store: "Williams Sonoma",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
];

// Event Listeners
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', handleFileUpload);

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = '#f0f7ff';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.backgroundColor = '';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = '';
    
    if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        handleFileUpload();
    }
});

cameraBtn.addEventListener('click', startCamera);
captureBtn.addEventListener('click', captureImage);
cancelCameraBtn.addEventListener('click', stopCamera);

// Functions
function handleFileUpload() {
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        if (file.type.match('image.*')) {
            simulateSearch();
        } else {
            alert('Please select an image file (JPG, PNG, or WebP).');
        }
    }
}

function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                cameraFeed.srcObject = stream;
                cameraPreview.style.display = 'block';
            })
            .catch(error => {
                console.error('Camera error:', error);
                alert('Unable to access camera. Please check permissions.');
            });
    } else {
        alert('Your browser does not support camera access.');
    }
}

function stopCamera() {
    if (cameraFeed.srcObject) {
        const tracks = cameraFeed.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        cameraFeed.srcObject = null;
    }
    cameraPreview.style.display = 'none';
}

function captureImage() {
    // In a real implementation, we would capture the image from the camera
    // For this demo, we'll simulate the process
    stopCamera();
    simulateSearch();
}

function simulateSearch() {
    // Show loading indicator
    loading.style.display = 'block';
    resultsSection.style.display = 'none';
    
    // Simulate API call delay
    setTimeout(() => {
        // Hide loading indicator
        loading.style.display = 'none';
        
        // Display results
        displayResults(sampleProducts);
        resultsSection.style.display = 'block';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

function displayResults(products) {
    // Clear previous results
    productGrid.innerHTML = '';
    
    // Update results count
    resultsCount.textContent = `${products.length} products found`;
    
    // Create product cards
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price}</p>
                <p class="product-rating">${product.rating}</p>
                <p class="product-store">Available at ${product.store}</p>
                <a href="#" class="product-link">View Product</a>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Additional utility functions for a real implementation
function processImageForSearch(imageData) {
    // In a real implementation, this would:
    // 1. Send image to Google Lens API
    // 2. Process the response
    // 3. Return matching products
    
    console.log('Processing image for search...');
    return sampleProducts; // Return sample data for demo
}

function handleGoogleLensResponse(response) {
    // This would process the actual Google Lens API response
    // and extract product information
    
    console.log('Processing Google Lens response...');
    return response.products || [];
}