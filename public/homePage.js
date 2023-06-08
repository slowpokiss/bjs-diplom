'use strict';

const lgBtn = new LogoutButton();
const rtBoard = new RatesBoard();
const moneyMan = new MoneyManager();
const favWid = new FavoritesWidget();

lgBtn.action = function() {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
    }
  }) 
}

ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data)
  }
}) 

function getExchange() {
  ApiConnector.getStocks(response => {
    if (response.success) {
      rtBoard.clearTable();
      rtBoard.fillTable(response.data);
    }
  })

};

getExchange();

setInterval(() => {
  getExchange();
}, 60000);

moneyMan.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    } else {
      moneyMan.setMessage(response, response.error)
    }
  })
} 

moneyMan.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    } else {
      moneyMan.setMessage(response, response.error)
    }
  })
}

moneyMan.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    } else {
      moneyMan.setMessage(response, response.error)
    }
  })
}


ApiConnector.getFavorites(response => {
  if (response.success) {
    favWid.clearTable();
    favWid.fillTable(response.data);
    moneyMan.updateUsersList(response.data);
  }
})

favWid.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favWid.clearTable();
      favWid.fillTable(response.data);
      moneyMan.updateUsersList(response.data);
    } else {
      favWid.setMessage(response, response.error);
    }
  })
}

favWid.removeUserCallback = function (id) {
  ApiConnector.removeUserFromFavorites(id, response => {
    if (response.success) {
      favWid.clearTable();
      favWid.fillTable(response.data);
      moneyMan.updateUsersList(response.data);
    } else {
      favWid.setMessage(response, response.error);
    }
  })
}