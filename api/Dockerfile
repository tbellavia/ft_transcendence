# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: lperson- <lperson-@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/08/01 10:45:03 by lperson-          #+#    #+#              #
#    Updated: 2022/08/25 13:55:30 by lperson-         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

FROM node:latest

# Can't use this because docker mount volumes as root user :-(
# USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# COPY --chown=node:node ./package*.json ./
COPY ./package*.json ./

RUN npm install

ENTRYPOINT [ "npm" ]

CMD ["run", "start:dev"]

EXPOSE 3000
