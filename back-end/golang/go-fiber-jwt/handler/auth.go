package handler

import (
	"time"

	"github.com/nguyentuan1696/go-fiber-jwt/config"
	"github.com/nguyentuan1696/go-fiber-jwt/database"
	"github.com/nguyentuan1696/go-fiber-jwt/model"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func getUserByEmail(e string) (*model.User, error) {
	db := database.DB

	var user model.User
	
	if err := db.Where(&model.User{Email:e}).Find(&user).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}
	}
	return &user, nil
}
