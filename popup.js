let navActive, navFitment, navPreferences, navProfile, content, currentPreferences
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("Some message log")
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
    content.innerHTML = `<b>Fitment<b>`
  }

  function  NavPreferencesOnClick() {
    navActive.classList.remove("nav-active")
    navPreferences.classList.add("nav-active")
    navActive = navPreferences
    PopulatePreferencesView()
    console.log(currentPreferences.customPreferences)
    console.log(localStorage)
  }

  function PopulatePreferencesView() {
    content.innerHTML = `<b>Preferences<b>`
    content.innerHTML += currentPreferences.customPreferencesAsForm
    content.innerHTML += preferences_add_form
    document.querySelector('#add-keyword-button').addEventListener("click",AddKeyword);
  }

  function AddKeyword() {
    let keyword = document.querySelector("#add-keyword").value
    console.log(keyword)
    currentPreferences.AddItem(new PreferencesItem(false, keyword))
    
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

  let preferences_add_form = (
    `<form>
    <input type="text" name="add-keyword" id="add-keyword" placeholder="Type in keyword(s)">
    <input type="button" value="Add" id="add-keyword-button">
    </form>`
  )

  class Preferences {
    constructor() {
      if (this.HasStorage()) {
        console.log("There's storage")
        // let myArray = []
        // myArray.push(new PreferencesItem(false, `Cotton`))
        // myArray.push(new PreferencesItem(false, `Long`))
        // myArray.push(new PreferencesItem(false, `Short`))
        // console.log(myArray)
        //localStorage.customPreferences = JSON.stringify(myArray)
        //this.ResetValues()
      }
      else {
        console.log("There's no storage")
      }
    }

    AddItem(newItem) {
      let items = (this.customPreferences !== null) ? this.customPreferences : []
      items.push(newItem);
      console.log(items)
      localStorage.customPreferences = JSON.stringify(items)
      PopulatePreferencesView()
    }

    ResetValues() {
      localStorage.customPreferences = null
    }

    HasStorage() {
      return (typeof(Storage) !== "undefined") ? true : false;
    }
    
    get customPreferences() {
      return JSON.parse(localStorage.customPreferences)
    }
    
    get customPreferencesAsForm() {
      return (this.customPreferences !== null) ? this.customPreferences.map(x => 
        `<input type="checkbox" id="${x.name}" name="${x.name}" value="${x.name}"><label for="${x.name}"> ${x.name}</label>`
        ) : null
    }
  }

  class PreferencesItem {
    constructor(activ, name) {
      this.activ = activ
      this.name = name
    }
  }
