package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/nguyentuan1696/fullstack/api/auth"
	"github.com/nguyentuan1696/fullstack/api/models"
	"github.com/nguyentuan1696/fullstack/api/responses"
	"github.com/nguyentuan1696/fullstack/api/utils/formaterror"
)

func (server *Server) CreateUser(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.body)
}