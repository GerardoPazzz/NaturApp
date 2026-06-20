# NaturApp 🌿

Aplicación móvil de productos naturales desarrollada con **Expo** y **React Native**, siguiendo una **Arquitectura en Capas** combinada con el patrón **MVVM**.

## Arquitectura del Proyecto

```
NaturApp/
├── app/                    # Navegación (Expo Router - File-based routing)
│   ├── _layout.js          # Root Layout con providers globales
│   ├── index.js            # Redirige a /home
│   ├── (tabs)/             # Navegación por tabs
│   │   ├── _layout.js      # Configuración de tabs
│   │   ├── home.js         # Pantalla principal (productos)
│   │   ├── cart.js         # Carrito de compras
│   │   ├── orders.js       # Historial de pedidos
│   │   └── profile.js      # Perfil y preferencias
│   └── product/[id].js     # Detalle de producto
├── src/
│   ├── models/             # 📦 CAPA MODELO (Dominio)
│   │   ├── Product.js       # Entidad Producto
│   │   ├── CartItem.js      # Entidad Item del Carrito
│   │   └── Order.js         # Entidad Pedido
│   ├── services/           # 💾 CAPA DE DATOS (Persistencia)
│   │   ├── databaseService.js   # SQLite (datos locales estructurados)
│   │   ├── storageService.js    # AsyncStorage (datos simples)
│   │   └── apiService.js        # API REST (datos remotos)
│   ├── viewmodels/         # ⚙️ CAPA LÓGICA (ViewModel)
│   │   ├── useProducts.js   # Lógica de productos
│   │   ├── useCart.js       # Lógica del carrito
│   │   ├── useOrders.js     # Lógica de pedidos
│   │   └── useProfile.js    # Lógica de perfil
│   ├── context/            # 🔄 ESTADO GLOBAL (React Context)
│   │   ├── CartContext.js   # Carrito compartido
│   │   ├── OrdersContext.js # Pedidos compartidos
│   │   └── ThemeContext.js  # Tema claro/oscuro
│   └── components/         # 🎨 COMPONENTES REUTILIZABLES
│       ├── ProductCard.js   # Tarjeta de producto
│       ├── CartItemRow.js   # Fila del carrito
│       └── CategoryChip.js  # Chip de categoría
```

## Patrón MVVM Adaptado

### Modelo (Domain Layer)
Representa las entidades del negocio. Define la estructura de datos y la lógica intrinsic de cada entidad.
- `Product.js` - Producto con métodos como `getFormattedPrice()`, `isAvailable()`
- `CartItem.js` - Item del carrito con método `getSubtotal()`
- `Order.js` - Pedido con método `getStatusColor()`, `getFormattedDate()`

### ViewModel (Business Logic Layer)
Custom Hooks de React que encapsulan:
- Estado de la vista
- Lógica de negocio y validaciones
- Coordinación entre servicios de datos
- Transformación de datos (JSON → Entidades)

### View (Presentation Layer)
Pantallas y componentes que:
- Usan ViewModels para obtener datos
- No conocen detalles de persistencia
- Renderizan UI basándose en el estado del ViewModel

## Persistencia de Datos

| Servicio       | Tecnología      | Uso                          |
|----------------|-----------------|------------------------------|
| `databaseService` | SQLite         | Carrito, favoritos (CRUD)   |
| `storageService`  | AsyncStorage    | Token, preferencias, perfil  |
| `apiService`      | REST API        | Productos, pedidos (futuro)  |

## Contextos Globales

- **CartContext**: Estado del carrito compartido entre Home, Cart y ProductDetail
- **OrdersContext**: Pedidos compartidos para actualización en tiempo real
- **ThemeContext**: Tema claro/oscuro aplicado a toda la app

## Ejecutar el Proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# O usar Expo Go en tu dispositivo móvil
```

## Estructura de Carpetas Explicada

| Carpeta           | Responsabilidad                          |
|-------------------|------------------------------------------|
| `app/`            | Navegación y pantallas (Expo Router)    |
| `src/models/`     | Entidades de dominio (Product, Cart, Order) |
| `src/services/`   | Acceso a datos (SQLite, AsyncStorage, API) |
| `src/viewmodels/` | Hooks con lógica de negocio              |
| `src/context/`    | Estado global compartido                 |
| `src/components/` | Componentes UI reutilizables             |

## Tecnologias

- **Expo SDK 56** - Framework
- **Expo Router** - Navegación file-based
- **Expo SQLite** - Base de datos local
- **AsyncStorage** - Almacenamiento simple
- **React Native** - UI Framework
