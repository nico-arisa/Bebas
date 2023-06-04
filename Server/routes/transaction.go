package routes

import (
	"dumbmerch/handlers"
	"dumbmerch/pkg/middleware"
	"dumbmerch/pkg/mysql"
	"dumbmerch/repository"

	"github.com/labstack/echo/v4"
)

// HandlerDataCountry

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repository.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	e.GET("/transactions", middleware.Auth(h.FindTransaction))
	e.GET("/transaction/:id", middleware.Auth(h.GetTransaction))
	e.POST("/transaction", middleware.Auth(middleware.UploadFile(h.CreateTransaction)))
	e.PATCH("/transaction/:id", h.UpdateTransaction)
	e.DELETE("/transaction/:id", h.DeleteTransaction)
}
