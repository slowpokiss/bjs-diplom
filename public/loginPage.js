'use strict';

const Uform = new UserForm();

Uform.loginFormCallback = function(data) {
  ApiConnector.login(data, response => {
    if (response.success) {
      location.reload();
    } else {
      alert(response.error);
    }
  });
};