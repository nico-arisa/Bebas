package handlers

import (
	dto "dumbmerch/dto/result"
	transactiondto "dumbmerch/dto/transaction"
	"dumbmerch/models"
	"dumbmerch/repository"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

type TransactionHandler struct {
	TransactionRepository repository.TransactionRepository
}

func HandlerTransaction(TransactionRepository repository.TransactionRepository) *TransactionHandler {
	return &TransactionHandler{TransactionRepository}
}

var path_files = "http://localhost:5000/uploads/"

func (h *TransactionHandler) FindTransaction(c echo.Context) error {
	transaction, err := h.TransactionRepository.FindTransaction()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	for i, p := range transaction {
		transaction[i].Attachment = path_files + p.Attachment
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transaction})
}

func (h *TransactionHandler) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	transaction.Attachment = path_file + transaction.Attachment
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transaction})
}

func (h *TransactionHandler) CreateTransaction(c echo.Context) error {
	// request := new(transactiondto.CreateTransactionRequest)
	// if err := c.Bind(request); err != nil {
	// 	return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	// }

	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	counterqty, _ := strconv.Atoi(c.FormValue("counter_qty"))
	// fmt.Println(countryid)
	total, _ := strconv.Atoi(c.FormValue("total"))
	tripid, _ := strconv.Atoi(c.FormValue("trip_id"))
	userdataid, _ := strconv.Atoi(c.FormValue("userdata_id"))

	request := transactiondto.CreateTransactionRequest{
		CounterQty: counterqty,
		Total:      total,
		Status:     c.FormValue("status"),
		Attachment: dataFile,
		TripID:     tripid,
		UserDataID: userdataid,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	transaction := models.Transaction{
		CounterQty: request.CounterQty,
		Total:      request.Total,
		Status:     request.Status,
		Attachment: request.Attachment,
		TripID:     request.TripID,
		UserDataID: int(userId),
	}

	data, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	transaction, _ = h.TransactionRepository.GetTransaction(transaction.ID)

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *TransactionHandler) UpdateTransaction(c echo.Context) error {
	request := new(transactiondto.UpdateTransactionRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.CounterQty != 0 {
		transaction.CounterQty = request.CounterQty
	}
	if request.Total != 0 {
		transaction.Total = request.Total
	}

	if request.Status != "" {
		transaction.Status = request.Status
	}

	if request.Attachment != "" {
		transaction.Attachment = request.Attachment
	}
	if request.TripID != 0 {
		transaction.TripID = request.TripID
	}
	// if request.Trip != "" {
	// 	transaction.Trip = request.Trip
	// }

	data, err := h.TransactionRepository.UpdateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertTransactionResponse(data)})
}

func (h *TransactionHandler) DeleteTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertTransactionResponse(data)})
}

func convertTransactionResponse(u models.Transaction) transactiondto.TransactionResponse {
	return transactiondto.TransactionResponse{
		CounterQty: u.CounterQty,
		Total:      u.Total,
		Status:     u.Status,
		Attachment: u.Attachment,
		TripID:     u.TripID,
		Trip:       u.Trip,
	}
}
