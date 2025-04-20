# Documentación de Arquitectura - Visor de Municipios

## Estructura de Carpetas

```
municipios-viewer/
├── backend/               # Servidor Python con FastAPI
│   ├── main.py           # API endpoints y lógica del servidor
│   └── requirements.txt   # Dependencias Python
├── src/
│   ├── components/       # Componentes React reutilizables
│   │   ├── filter/      # Componentes de filtrado y búsqueda
│   │   └── results/     # Componentes de visualización de resultados
│   ├── config/          # Configuraciones y constantes
│   ├── lib/             # Utilidades y servicios
│   └── types/           # Definiciones de tipos TypeScript
├── supabase/
│   └── migrations/      # Migraciones de base de datos
└── public/              # Archivos estáticos
```

### Descripción de Carpetas

- `backend/`: Contiene el servidor Python que proporciona endpoints API alternativos para la aplicación.
  - `main.py`: Implementa los endpoints REST usando FastAPI.
  - `requirements.txt`: Lista las dependencias Python necesarias.

- `src/components/`: Componentes React organizados por funcionalidad.
  - `filter/`: Componentes para filtrado y selección de datos.
  - `results/`: Componentes para visualización de resultados y mapas.

- `src/config/`: Archivos de configuración y constantes.
  - Definiciones de determinantes
  - Configuración de la aplicación
  - Constantes del sistema

- `src/lib/`: Utilidades y servicios.
  - Clientes API
  - Utilidades de base de datos
  - Servicios compartidos

- `src/types/`: Definiciones de tipos TypeScript.
  - Interfaces
  - Tipos personalizados
  - Definiciones de base de datos

- `supabase/migrations/`: Scripts SQL para la gestión del esquema de base de datos.

## Diseño

### Arquitectura

La aplicación sigue una arquitectura de capas:

1. **Capa de Presentación**: React + TypeScript
   - Componentes modulares
   - Gestión de estado local
   - Interfaces tipadas

2. **Capa de Servicios**: API REST
   - Endpoints Python (FastAPI)
   - Cliente Supabase
   - Servicios de datos

3. **Capa de Datos**: PostgreSQL + PostGIS
   - Esquema relacional
   - Extensiones espaciales
   - Políticas de seguridad

### Tecnologías Utilizadas

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - OpenLayers (mapas)
  - Lucide React (iconos)

- **Backend**:
  - FastAPI (Python)
  - Supabase
  - PostgreSQL + PostGIS

- **Herramientas de Desarrollo**:
  - Vite
  - ESLint
  - Docker
  - Git

### Diseño de Base de Datos

La base de datos está diseñada para manejar:

1. **Datos Espaciales**:
   - Geometrías de municipios
   - Referencias espaciales
   - Índices geoespaciales

2. **Datos Territoriales**:
   - División territorial
   - Zonas y regiones
   - Determinantes por municipio

3. **Indicadores**:
   - Métricas socioeconómicas
   - Estadísticas territoriales
   - Rankings departamentales y nacionales

### Interfaz de Usuario

La interfaz se divide en tres áreas principales:

1. **Panel de Filtros**:
   - Selección de zona/región
   - Filtros de departamento/municipio
   - Selección de determinantes
   - Opciones de comparación

2. **Visualización de Mapas**:
   - Mapa principal
   - Mapa de comparación
   - Controles de zoom/pan
   - Exportación a PDF

3. **Tabla de Resultados**:
   - Datos tabulares
   - Estadísticas
   - Exportación a Excel

## Implementación

### Componentes Computacionales

1. **Sistema de Filtrado**:
   - Filtros encadenados (zona → departamento → municipio)
   - Selección múltiple de determinantes
   - Comparación entre municipios

2. **Visualización Geoespacial**:
   - Renderizado de polígonos municipales
   - Sistemas de coordenadas
   - Capas de mapas base

3. **Gestión de Datos**:
   - Consultas SQL optimizadas
   - Caché de datos
   - Transformación de geometrías

4. **Exportación de Datos**:
   - Generación de PDF
   - Exportación a Excel
   - Formateo de datos

### Integración de Servicios

1. **API REST**:
   - Endpoints para datos municipales
   - Consultas geoespaciales
   - Indicadores territoriales

2. **Cliente Supabase**:
   - Consultas en tiempo real
   - Gestión de datos
   - Políticas de seguridad

3. **Servicios de Mapas**:
   - OpenLayers
   - OSM (OpenStreetMap)
   - Proyecciones cartográficas

### Requisitos Tecnológicos

1. **Servidor**:
   - Node.js 20+
   - Python 3.9+
   - PostgreSQL 15+
   - PostGIS 3+

2. **Cliente**:
   - Navegador moderno con soporte ES2020+
   - WebGL para renderizado de mapas
   - Soporte para Web Workers

3. **Desarrollo**:
   - Docker y Docker Compose
   - Git
   - npm/pnpm
   - IDE con soporte TypeScript