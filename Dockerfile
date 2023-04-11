FROM nginx:latest

COPY . /usr/share/nginx/html

COPY cert.pem /etc/nginx/cert.pem
COPY privkey.pem /etc/nginx/privkey.pem

RUN sed -i 's/#listen 443 ssl;/listen 443 ssl;/g' /etc/nginx/conf.d/default.conf
RUN sed -i 's/#ssl_certificate/ssl_certificate/g' /etc/nginx/conf.d/default.conf
RUN sed -i 's/#ssl_certificate_key/ssl_certificate_key/g' /etc/nginx/conf.d/default.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
