package models

// url = {your_host}/api/v1/users
// mehtod = GET
// response body =
// ### 2. Delete Users
// >**url** = {your_host}/api/v1/user/{id_user}
// **method** = DELETE
// **response body** =

// >```json
// data: {
//   "id" : 1
// }

type Trip struct {
	ID             int             `json:"id"`
	Title          string          `json:"title" gorm:"varchar(255)"`
	CountryID      int             `json:"country_id"`
	Country        CountryResponse `json:"country" gorm:"foreignKey:CountryID"`
	Acomodation    string          `json:"acomodation" gorm:"varchar(255)"`
	Transportation string          `json:"transportation" gorm:"varchar(255)"`
	Eat            string          `json:"eat" gorm:"varchar(255)"`
	Day            int             `json:"day"`
	Night          int             `json:"night"`
	DateTrip       string          `json:"dateTrip" gorm:"varchar(255)"`
	Price          int             `json:"price"`
	Quota          int             `json:"quota"`
	Description    string          `json:"description" gorm:"varchar(255)"`
	Image          string          `json:"image" gorm:"varchar(255)"`
}

type TripResponse struct {
	Phone   string `json:"phone"`
	Gender  string `json:"gender"`
	Address string `json:"address"`
	UserID  int    `json:"-"`
}

func (TripResponse) TableName() string {
	return "trips"
}
