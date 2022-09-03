# 1. 拉取 node 镜像来打包 React 项目
FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY tsconfig.json ./
COPY public public/
COPY src src/
RUN npm run build

# 2. 创建并运行 NginX 服务器，并且把打包好的文件复制粘贴到服务器文件夹中
FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]