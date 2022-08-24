# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: lperson- <lperson-@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/08/01 10:45:03 by lperson-          #+#    #+#              #
#    Updated: 2022/08/17 13:20:38 by lperson-         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

FROM node:latest

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node ./package*.json ./

RUN npm install

ENTRYPOINT [ "npm" ]

CMD ["run", "start:dev"]

EXPOSE 3000
