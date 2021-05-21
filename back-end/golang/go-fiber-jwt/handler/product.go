package handler

import (
	"github.com/gofiber/fiber/v2"

	"github.com/nguyentuan1696/go-fiber-jwt/database"
	"github.com/nguyentuan1696/go-fiber-jwt/model"
)

func GetAllProducts(c *fiber.Ctx) error {
	db := database.DB
	var products []model.Product
	db.Find(&products)
	return c.JSON(fiber.Map{"status": "success", "message": "All products", "data": products})
}

func GetProduct(c *fiber.Ctx) error {
	db := database.DB
	id := c.Params("id")
	var product model.Product
	db.Find(&product, id)
	if product.Title == "" {
		return c.Status(404).JSON(fiber.Map{
			"status": "error",
			"message": "No product found with ID",
			"data": nil,
		})
	}
	return c.JSON(fiber.Map{
		"status": "success",
		"message": "Product found",
		"data": product,
	})
}

func CreateProduct(c *fiber.Ctx) error {
	db := database.DB
	product := new(model.Product)
	if err := c.BodyParser(product); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status": "error",
			"message": "counldn't create product",
			"data": err,
		})
	}
	db.Create(&product)
	return c.JSON(fiber.Map{
		"status": "success",
		"message": "Created Product",
		"data": product,v
	})
}

func DeleteProduct(c *fiber.Ctx) error {
	id := c.param("id")
	db := database.DB

	var product models.Product

	db.First(&product, id)
	if product.Title == "" {
		return c.Status(404).JSON(fiber.Map{
			"status": "error",
			"message": "No product found with ID",
			"data": nil
		})
	}
	db.Delete(&product)
	return c.JSON(fiber.Map{
		"status": "success",
		"message": "Product deleted",
		"data": nil,
	})
}