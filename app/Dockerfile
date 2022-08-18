# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: lperson- <lperson-@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/08/01 10:45:03 by lperson-          #+#    #+#              #
#    Updated: 2022/08/18 13:38:01 by lperson-         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

FROM node:latest

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

ENTRYPOINT [ "npm" ]

CMD ["run", "dev", "--", "-o"]

EXPOSE 8000