package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
)

const base_url string = "http://localhost:3000/api/v1"

var usernames = [...]string{
	"bbellavi", "mvo-van-",
	"eassouli", "lperson-",
	"lvirgini", "anclarma",
	"agunesli",
}

func create_buffer(username string) *bytes.Buffer {
	data, _ := json.Marshal(map[string]string{"username": username})

	return bytes.NewBuffer(data)
}

func populate_users() {
	create_user_url := fmt.Sprintf("%s/users", base_url)

	for _, username := range usernames {
		_, err := http.Post(create_user_url, "application/json",
			create_buffer(username))

		if err != nil {
			log.Fatalf("Error: %v", err)
		}
		log.Printf("Created user: %s\n", username)
	}
}

func main() {
	opt_users := flag.Bool("users", false, "set if users must be populated")

	flag.Parse()
	if *opt_users {
		fmt.Println("Populating users...")
		populate_users()
	}
}
