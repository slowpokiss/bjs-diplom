'use strict';

const Uform = new UserForm();

Uform.loginFormCallback = function(data) {
  ApiConnector.login(data, response => {
    if (response.success) {
      location.reload();
    } else {
      Uform.setLoginErrorMessage(response.error);
    }
  });
};

Uform.registerFormCallback = function(data) {
  ApiConnector.register(data, response => {
    if (response.success) {
      location.reload();
    } else {
      Uform.setLoginErrorMessage(response.error);
    }
  });
};
