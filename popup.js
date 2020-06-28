let profile = {
  size: "M",
  heightFt: "0",
  heightIn: "0",
  heightCm: "0",
  weightLbs: "0",
  weightKgs: "0",
  waistIn: "0",
  waistCm: "0",
  fit: "slim",
  starRating: "4"
}


let navActive, navFitment, navPreferences, navProfile, content, currentPreferences;
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

    currentPreferences = new Preferences()

  });

  function  NavFitmentOnClick() {
    navActive.classList.remove("nav-active")
    navFitment.classList.add("nav-active")
    navActive = navFitment
    content.innerHTML = `<h3>Fitment</h3>`
  }

  function  NavPreferencesOnClick() {
    navActive.classList.remove("nav-active")
    navPreferences.classList.add("nav-active")
    navActive = navPreferences
    PopulatePreferencesView()
  }

  function PopulatePreferencesView() {
    LoadPreferences().then(() => {
      let preferencesForm = currentPreferences.customPreferencesAsForm
      preferencesForm.forEach(element => {
        content.innerHTML += element
      });
      content.innerHTML += preferences_add_form
      document.querySelector('#preferences-add-form').addEventListener("submit", (e) => { 
        e.preventDefault() 
        AddKeyword(e)
        //return false
      })
      document.querySelector('#add-keyword-button').addEventListener("click", e => AddKeyword(e));
      let preferencesHTLM = document.querySelectorAll('input[type="checkbox"]')
      preferencesHTLM.forEach(element => {
        element.addEventListener('change', ToggleActiv)
      })

      // Add click listener to remove button
      preferencesHTML = document.querySelectorAll('input[type="button"]')
      preferencesHTML.forEach(element => {
        element.addEventListener('click', RemovePreference)
      })

    })
  }

  function ToggleActiv(element) {
    currentPreferences.customPreferences.find((p, i) => {
      if (p.name === element.target.name) {
        currentPreferences.ChangeItems(i)
          return true;
      }
    });
  }

  function RemovePreference(element) {
    currentPreferences.customPreferences.find((p, i) => {
      if (p.name === element.target.name) {
        currentPreferences.RemoveItem(i)
        element.target.parentElement.parentElement.remove()
          return true;
      }
    });
  }

  function AddKeyword(e) {
    e.preventDefault()
    let keyword = document.querySelector("#add-keyword").value
    currentPreferences.AddItem(new PreferencesItem(true, keyword))
  }
  
  function setProfileDisplay() {
    let starRating = "";
    for (let i = 0; i < parseInt(profile.starRating); i++) {
      starRating = starRating + "★"
    }
    let profileContent =`<div class="profile">
    <h3>Profile</h3>
    <p>Size: ${profile.size}</p>
    <p>Height: ${profile.heightFt}'${profile.heightIn}" or ${profile.heightCm} cm</p>
    <p>Weight: ${profile.weightLbs} lbs or ${profile.weightKgs} kg</p>
    <p>Waist: ${profile.waistIn}" or ${profile.waistCm} cm </p>
    <p>Fit: ${profile.fit}</p>
    <p>Min. Star Rating: ${starRating}</p>
    <button id="edit-profile">Edit Profile</button>
</div>`;
    content.innerHTML = profileContent;
    editProfile = document.getElementById("edit-profile");
    editProfile.addEventListener("click", EditProfileOnClick);
  }

  function NavProfileOnClick() {
    navActive.classList.remove("nav-active")
    navProfile.classList.add("nav-active")
    navActive = navProfile
    setProfileDisplay();
  }

  function EditProfileOnClick() {
    content.innerHTML = `<div class="profile">
    <h3>Profile</h3>
    <form id="profile-form">
        <div>
            <label>Size:</label>
            <select name="size" class="profile-field">
                <option ${profile.size == "XS" ? "selected":""} value="XS">XS</option>
                <option ${profile.size == "S" ? "selected":""} value="S">S</option>
                <option ${profile.size == "M" ? "selected":""} value="M">M</option>
                <option ${profile.size == "L" ? "selected":""} value="L">L</option>
                <option ${profile.size == "XL" ? "selected":""} value="XL">XL</option>
                <option ${profile.size == "XXL"? "selected":""} value="XXL">XXL</option>
            </select>
        </div>
        <div>
            <label>Height:</label>
            <input type="number" value=${profile.heightFt} name="heightFt" class="profile-field">'
            <input type="number" name="heightIn" value=${profile.heightIn} class="profile-field">" or <input type="number" name="heightCm" value=${profile.heightCm}  class="profile-field">cm
        </div>
        <div>
            <label>Weight:</label>
            <input type="number" name="weightLbs" value=${profile.weightLbs} class="profile-field">lbs or 
            <input type="number" name="weightKgs" value=${profile.weightKgs} class="profile-field">kgs
        </div>
        <div>
            <label>Waist:</label>
            <input type="number" name="waistIn" value=${profile.waistIn} class="profile-field">" or 
            <input type="number" name="waistCm" value=${profile.waistCm} class="profile-field">cm
        </div>
        <div>
            <label>Fit:</label>
            <select name="fit" class="profile-field">
                <option ${profile.fit == "slim" ? "selected":""} value="slim">slim</option>
                <option ${profile.fit == "fitted" ? "selected":""} value="fitted">fitted</option>
                <option ${profile.fit == "loose" ? "selected":""} value="loose">loose</option>
            </select>
        </div>
        <div>
            <label>Min. Star Rating:</label>
            <select name="starRating" class="profile-field">
                <option ${profile.starRating == "1" ? "selected":""} value="1">★</option>
                <option ${profile.starRating == "2" ? "selected":""} value="2">★★</option>
                <option ${profile.starRating == "3" ? "selected":""} value="3">★★★</option>
                <option ${profile.starRating == "4" ? "selected":""} value="4">★★★★</option>
                <option ${profile.starRating == "5" ? "selected":""} value="5">★★★★★</option>
            </select>
          <br />
          <input type="submit" value="Save changes">
        </div>
    </form>
</div>`
    let profileForm = document.getElementById("profile-form");
    profileForm.addEventListener("submit", e => ProfileHandleSubmit(e));
  }

  function ProfileHandleSubmit(e) {
    e.preventDefault();
    profileFields = document.querySelectorAll(".profile-field")
    profileFields.forEach(field => {
      profile[field.name] = field.value;
    })
    setProfileDisplay();
  }

  let preferences_add_form = (
    `<form id="preferences-add-form">
    <input type="text" name="add-keyword" id="add-keyword" placeholder="Type in keyword(s)">
    <input type="button" value="Add" id="add-keyword-button">
    </form>`
  )

  class Preferences {
    constructor() {
      // if (this.HasStorage()) {
      //   // console.log("There's storage")
      // }
      // else {
      //   // console.log("There's no storage")
      // }
    }

    AddItem(newItem) {
      let items = (this.customPreferences !== null) ? this.customPreferences : []

      if (items.filter(item => item.name === newItem.name).length === 0) {
        items.push(newItem);
        this.Save(items)
        PopulatePreferencesView()
      }
    }

    ResetValues() {
      localStorage.customPreferences = null
    }

    HasStorage() {
      return (typeof(Storage) !== "undefined") ? true : false;
    }

    ChangeItems(index) {
      let items = (this.customPreferences !== null) ? this.customPreferences : []
      items[index].activ = !items[index].activ
      this.Save(items)
    }

    RemoveItem(index) {
      let items = (this.customPreferences !== null) ? this.customPreferences : []
      items.splice(index,1)
      this.Save(items)
    }

    Save(items) {
      localStorage.customPreferences = JSON.stringify(items)
    }
    
    get customPreferences() {
      return JSON.parse(localStorage.customPreferences)
    }
    
    get customPreferencesAsForm() {
      return (this.customPreferences !== null) ? this.customPreferences.map(x => 
        `<span class="preference"><input type="checkbox" id="${x.name}" name="${x.name}" value="${x.name}" ${(x.activ) ? "checked" : ""}><label for="${x.name}"> ${x.name}</label><span class="hide"><input type="button" name="${x.name}" value="remove" class="remove-preference-button" /></span></span>`
        ) : null
    }
  }

  class PreferencesItem {
    constructor(activ, name) {
      this.activ = activ
      this.name = name
    }
  }

  async function LoadPreferences() {
    let url = 'preferences.html'
    content.innerHTML = await (await fetch(url)).text();
  }