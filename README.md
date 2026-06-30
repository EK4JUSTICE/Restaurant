# Restaurant App - Frontend & Backend Setup

## Backend (Django)

1. Install dependencies:
   ```
   cd backend
   .\venv\Scripts\pip.exe install -r requirements.txt  # if exists, otherwise use system packages
   ```

2. Database (MySQL via XAMPP):
   - Ensure XAMPP MySQL is running
   - Database name: `restaurant`

3. Run migrations:
   ```
   .\venv\Scripts\python.exe manage.py migrate
   ```

4. Start server:
   ```
   .\venv\Scripts\python.exe manage.py runserver 0.0.0.0:5000
   ```

## Frontend (React/Vite)

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```

2. Run dev server:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /api/menu` - Returns menu items (id, name, description, price, category, image)
- `POST /api/orders` - Create order (customer, items, total)
- `POST /api/auth/register` - Register user (name, email, password)
- `POST /api/auth/login` - Login user (email, password)

## Default Menu Items

- Margherita Pizza ($12.99) - Mains
- Caesar Salad ($8.99) - Starters  
- Tiramisu ($6.99) - Desserts
- Cola ($2.99) - Drinks