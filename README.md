
# Portal del Bosque - Visualizador Inmobiliario Interactivo

Este es un visualizador interactivo prémium diseñado para la inmobiliaria **Portal del Bosque**. Permite a los clientes y agentes inmobiliarios explorar el residencial completo a través de una interfaz de tres pasos inmersiva y fluida.

## Características Clave

1. **Mapa del Residencial Interactivo (Vista Aérea)**:
   - Vista aérea con polígonos interactivos que representan los bloques del residencial.
   - Pines de torres optimizados y discretos para evitar la sobrecarga visual.
   - Al pasar el cursor por encima de una torre, se ilumina el edificio completo y se despliega un panel HUD flotante con un resumen dinámico (apartamentos totales, número de disponibles, reservados, no disponibles y el rango de precios en USD).

2. **Vista de Elevación 2D por Torre (Vista Lateral)**:
   - Al hacer clic en una torre, el sistema muestra su **fachada técnica lateral** en SVG interactivo.
   - La **Torre B** dibuja su diseño particular con un loft de doble altura que abarca los primeros dos niveles y un penthouse de lujo con plunge pool y pérgolas en la terraza.
   - Cada nivel de apartamento incluye un punto indicador de estado con colores dinámicos:
     - 🟢 **Disponible**
     - 🟡 **Reservado**
     - ⚪ **No disponible**
   - Panel HUD para previsualizar los detalles específicos de cada nivel y su ficha técnica.

3. **Plano de Distribución 2D (Vista Superior)**:
   - Distribución arquitectónica de tipo CAD de cada apartamento (Garden, Loft, Family, Penthouse).
   - Hotspots interactivos en las estancias para visualizar fotos reales y descripciones del interior.
   - Formulario de contacto directo e integrado para solicitar información específica de la unidad.

## Ejecución Local

**Requisitos previos:** Node.js (v18+)

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```
3. Construir para producción:
   ```bash
   npm run build
   ```

