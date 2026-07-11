-- Railway provides the DB

CREATE TABLE IF NOT EXISTS Products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS Orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Order_Items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);

-- Insert dummy data
INSERT INTO Products (name, description, price, stock, image_url) VALUES 
('Laptop Asus ROG', 'High performance gaming laptop', 15000000, 10, 'https://via.placeholder.com/150'),
('MacBook Pro M2', 'Apple M2 chip for creators', 20000000, 5, 'https://via.placeholder.com/150'),
('Mechanical Keyboard', 'RGB Mechanical Keyboard Blue Switch', 500000, 50, 'https://via.placeholder.com/150');
