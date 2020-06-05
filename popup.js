let navActive, navFitment, navPreferences, navProfile, content
document.addEventListener("DOMContentLoaded", function(event) {
    navActive = document.querySelector(".nav-active");
    navFitment = document.querySelector("#nav-fitment");
    navPreferences = document.querySelector("#nav-preferences");
    navProfile = document.querySelector("#nav-profile");
    content = document.querySelector("#content");
    // Add click listeners to navigation
    navFitment.addEventListener("click", NavFitmentOnClick)
    navPreferences.addEventListener("click", NavPreferencesOnClick)
    navProfile.addEventListener("click", NavProfileOnClick)
  });

  function  NavFitmentOnClick() {
    navActive.classList.remove("nav-active")
    navFitment.classList.add("nav-active")
    navActive = navFitment
    content.innerHTML = `<b>Fitment<b>`
  }

  function  NavPreferencesOnClick() {
    navActive.classList.remove("nav-active")
    navPreferences.classList.add("nav-active")
    navActive = navPreferences
    content.innerHTML = `<b>Preferences<b>`
  }

  function  NavProfileOnClick() {
    navActive.classList.remove("nav-active")
    navProfile.classList.add("nav-active")
    navActive = navProfile
    content.innerHTML = `<b>Profile<b>`
  }