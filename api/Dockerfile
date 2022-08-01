# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: lperson- <lperson-@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/08/01 10:45:03 by lperson-          #+#    #+#              #
#    Updated: 2022/08/01 12:08:59 by lperson-         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

FROM node:latest

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm" ]

CMD ["run", "start:dev"]

EXPOSE 3000
