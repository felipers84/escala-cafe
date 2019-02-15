docker rm --force nginx-escala-cafe
docker run --name nginx-escala-cafe --restart always -v "$PWD"/docs:/usr/share/nginx/html:ro -d  -p 1979:80 nginx
