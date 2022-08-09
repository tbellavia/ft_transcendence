# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: lvirgini <lvirgini@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/08/01 12:47:39 by lvirgini          #+#    #+#              #
#    Updated: 2022/08/01 22:51:05 by lvirgini         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# ----------------- #
#	  VARIABLES		#
# ----------------- #

DOCKER_COMPOSE 	= docker-compose

# ----------------- #
#	  FUNCTIONS		#
# ----------------- #

all:	build up

build:
		$(DOCKER_COMPOSE) build
		@echo "\n\033[36;1m\033[4;5mDOCKER BUILD : DONE\033[0m\n"

up:
	$(DOCKER_COMPOSE) up -d

down:	
	$(DOCKER_COMPOSE) down

config:
	$(DOCKER_COMPOSE) config


# ----------------- #
# 		CLEAN		#
# ----------------- #

rm:
		docker rm -f $$(docker ps -a -q)
		
rmi:
		docker rmi -f $$(docker images -a -q)

rm_volume:
		docker volume rm $$(docker volume ls -q)

rm_network:
		docker rm $$(docker network ls -q)

clean:
	$(DOCKER_COMPOSE) down -v --rmi all --remove-orphans

fclean: clean
		./cleaner.sh


re: 	fclean all



.PHONY: all setup build up down rm rmi rm_volume clean fclean re