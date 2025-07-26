document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const gender = document.getElementById('gender').value;
      const password = document.getElementById('password').value;

      if (gender !== 'Masculino') {
        alert('Apenas homens podem se registrar.');
        return;
      }

      if (localStorage.getItem(email)) {
        alert('E-mail já registrado.');
        return;
      }

      const user = { name, email, password };
      localStorage.setItem(email, JSON.stringify(user));
      alert('Registrado com sucesso! Faça o login.');
      window.location.href = 'login.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      const userData = localStorage.getItem(email);
      if (!userData) {
        alert('Usuário não encontrado.');
        return;
      }

      const user = JSON.parse(userData);
      if (user.password === password) {
        alert('Login bem-sucedido!');
        window.location.href = 'area-privada.html';
      } else {
        alert('Senha incorreta.');
      }
    });
  }
});
