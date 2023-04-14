# Utiliza la imagen base de Nginx
FROM nginx

# Copia los archivos de configuración del frontend al contenedor
COPY /ruta/a/tu/codigo/frontend /usr/share/nginx/html

# Expone el puerto 8081 para el frontend
EXPOSE 8081
