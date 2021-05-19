package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
)

var db *sql.DB

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "fiber_demo"
)

type Employee struct {
	ID     string `json: "id"`
	Name   string `json: "name"`
	Salary string `json: "salary"`
	Age    string `json: "age"`
}
type employees struct {
	Employees []Employee `json:"employees"`
}

func Connect() error {
	var err error
	db, err = sql.Open("postgres", fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname))
	if err != nil {
		return err
	}

	if err = db.Ping(); err != nil {
		return err
	}

	return nil
}


func Main() {
	// Connect with database
	if err := Connect(); err != nil {
		log.Fatal(err)
	}

	app := fiber.New()
	app.Get("/employee", func(c *fiber.Ctx) error {
		// Select all Employee(s) from database
		rows, err  := db.Query("SELECT id, name, salary, age FROM employees order by id")
		if err != nil {
			return c.Status(500).SendString(err.Error())
		}

		defer rows.Close()
		result := Employee{}

		for rows.Next() {
			employee := Employee{}
			if err := rows.Scan(&employee.Id, &employee.Name, &employee.Salary, &employee.Age); err != nil {
				return err
			}
		}
	})
}