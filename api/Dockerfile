# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: lvirgini <lvirgini@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/08/01 10:45:03 by lperson-          #+#    #+#              #
#    Updated: 2022/08/01 21:15:03 by lvirgini         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

FROM node:latest

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

# RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

RUN chown -R node /usr/src/app/node_modules

USER node


ENTRYPOINT [ "npm" ]

CMD ["run", "start:dev"]

EXPOSE 3000
