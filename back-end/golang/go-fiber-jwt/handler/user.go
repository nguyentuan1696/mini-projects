package handler

import (
	"strconv"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"

	"github.com/nguyentuan1696/go-fiber-jwt/database"
	"github.com/nguyentuan1696/go-fiber-jwt/model"
)

// hash passworda from plain text
func hashedPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func validToken(t *jwt.Token, id string) bool {
	n, err := strconv.Atoi(id)

	if err != nil {
		return false
	}

	claims := t.Claims.(jwt.MapClaims)
	uid := int(claims["user_id"].(float64))

	return uid == n
}

func validUser(id string, p string) bool {
	db := database.DB
	var user model.User
	db.First(&user, id)
	if user.Username == "" {
		return false
	}

	if !CheckPasswordHash(p, user.Password) {
		return false
	}

	return true
}

// Get a user

func GetUser(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	var user model.User
	db.Find(&user, id)
	if(user.Username == "") {
		return c.Status(404).JSON(fiber.Map{
			"status": "error",
			"message": "No user found with ID",
			"data": nil,
		})
	}

	return c.JSON(fiber.Map{
		"status": "success",
		"message": "Product found",
		"data": user,
	})
}

func CreateUser(c *fiber.Ctx) error {
	type NewUser struct {
		Username string `json: "username"`
		Email string `json: "email"`
	}

	db := database.DB
	user := new(model.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "Review your input",
			"data": err,
		})
	}
	hash, err := hashedPassword(user.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "Couldn't hash password",
			"data": err,
		})
	}

	user.Password = hash
	if err := db.Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "Couldn't create user",
			"data": err,
		})
	}
	newUser := NewUser{
		Email : user.Email,
		Username: user.Username,
	}

	return c.JSON(fiber.Map{
		"status": "success",
		"message": "Created user",
		"data": newUser,
	})
}

func UpdateUser(c *fiber.Ctx) error {
	type UpdateUserInput struct {
		Names string `json: "names"`
	}

	var uui UpdateUserInput
	if err := c.BodyParser(&uui); err != nil {
		return c.Status(500).JSON(fiber.Map{
		"status": "error",
		"message": "Review your input",
		"data": err,
		})
	}

	id := c.Params("id")
	token := c.Locals("user").(*jwt.Token)
	

	if !validToken(token, id) {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "Invalid token",
			"data": nil,
		})
	}

	db := database.DB
	var user model.User

	db.First(&user, id)
	user.Names = uui.Names
	db.Save(&user)

	return c.Status(200).JSON(fiber.Map{
		"status": "success",
		"message": "user successfully updated",
		"data": user,
	})

}