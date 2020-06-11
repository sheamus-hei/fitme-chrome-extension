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
    content.innerHTML = `<div class="profile">
    <h3>Profile</h3>
    <form>
        <div>
            <label>Size:</label>
            <select name="size">
                <option value="xs">xs</option>
                <option value="s">s</option>
                <option value="m">m</option>
                <option value="l">l</option>
                <option value="xl">xl</option>
                <option value="xxl">xxl</option>
            </select>
        </div>
        <div>
            <label>Height:</label>
            <input type="number" value="0" name="heightFt">'<input type="number" name="heightIn" value="0">" or <input type="number" name="heightCm" value="0">cm
        </div>
        <div>
            <label>Weight:</label>
            <input type="number" name="weightLbs" value="0">lbs or <input type="number" name="weightKgs" value="0">kgs
        </div>
        <div>
            <label>Waist:</label>
            <input type="number" name="waistIn" value="0">" or <input type="number" name="waistCm" value="0">cm
        </div>
        <div>
            <label>Fit:</label>
            <select name="size">
                <option value="slim">slim</option>
                <option value="fitted">fitted</option>
                <option value="loose">loose</option>
            </select>
        </div>
        <div>
            <label>Min. Star Rating:</label>
            <select name="size">
                <option value="oneStar">★</option>
                <option value="twoStar">★★</option>
                <option value="threeStar">★★★</option>
                <option value="fourStar">★★★★</option>
                <option value="fiveStar">★★★★★</option>
            </select>
        </div>
    </form>
</div>`
  }