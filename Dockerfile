# Stage 1 : Build package
FROM node:10-alpine as builder

WORKDIR /project_folder

# copy the package.json to install dependencies
COPY . .

# cnstall the dependencies and make the folder
RUN rm -rf node_modules build && \
    npm install && \
    npm run build


# Stage 2 : configure & run ngnix
FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /project_folder/build /usr/share/nginx/html

EXPOSE 80

# pass -g deamon off option to log on foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]