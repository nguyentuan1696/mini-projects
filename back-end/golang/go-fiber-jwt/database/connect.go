package database

import (
	"fmt"
	"strconv"

	"github.com/jinzhu/gorm"

	"github.com/nguyentuan1696/go-fiber-jwt/config"
	"github.com/nguyentuan1696/go-fiber-jwt/model"
)

func ConnectDB() {
	var err error
	p := config.Config("DB_PORT")
	// convert port type string to port type int
	port, err := strconv.ParseUint(p, 10, 32)

	DB, err = gorm.Open("postgres", fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", config.Config("DB_NAME"), port, config.Config("DB_USER"), config.Config("DB_PASSWORD"), config.Config("DB_NAME")))

	if err != nil {
		panic("Failed to connect database")
	}

}
