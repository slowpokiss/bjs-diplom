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
      moneyMan.setMessage(true, "Баланс успешно пополнен")
    } else {
      moneyMan.setMessage(false, response.error)
    }
  })
} 

moneyMan.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyMan.setMessage(true, "Валюта успешно конвертирована")
    } else {
      moneyMan.setMessage(false, response.error)
    }
  })
}

moneyMan.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyMan.setMessage(true, "Деньги успешно переведены")
    } else {
      moneyMan.setMessage(false, response.error)
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
      moneyMan.setMessage(true, "Новый пользоватль успешно добавлен")
    } else {
      favWid.setMessage(false, response.error);
    }
  })
}

favWid.removeUserCallback = function (id) {
  ApiConnector.removeUserFromFavorites(id, response => {
    if (response.success) {
      favWid.clearTable();
      favWid.fillTable(response.data);
      moneyMan.updateUsersList(response.data);
      moneyMan.setMessage(true, "Пользоватль успешно исключен из списка")
    } else {
      favWid.setMessage(false, response.error);
    }
  })
}