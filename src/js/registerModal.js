document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("visited")) {
      const modal = document.getElementById("registration-modal");
      const closeButton = modal.querySelector(".close");
      const registerButton = modal.querySelector("#register-button");
  
      modal.style.display = "block";
  
      closeButton.addEventListener("click", function () {
        modal.style.display = "none";
  
        localStorage.setItem("visited", "true");
      });
  
      registerButton.addEventListener("click", function () {
        modal.style.display = "none";
  
        localStorage.setItem("visited", "true");
  
        window.location.href = "login.html";
      });
    }
  });
  
  