function Person (name, birthYear, birthCity, birthState, spouse, currResiding) {
  this.name = name;
  this.birthYear = birthYear;
  var year = new Date();
  this.age = year.getFullYear() - birthYear;
  this.birthCity = birthCity;
  this.birthState = birthState;
  this.spouse = spouse;
  this.maritalStatus = this.spouse === undefined ? "" : "Married";
  this.schoolsAttended = 0;
  this.currResiding = currResiding;
  this.numChildren = 0;
  this.interests = [];
}

Person.prototype = {
  addKid: function (name, birthYear, gender, whereLiving) {
    this.numChildren++;
    this["child" + this.numChildren] = {
      name: name,
      birthYear: birthYear,
      age: new Date().getFullYear() - birthYear,
      gender: gender,
      whereLiving: whereLiving
    };
  },
  addSchool: function (school, gradYear, concentration, degree) {
    this.schoolsAttended++;
    this["school" + this.schoolsAttended] = {
      school: school,
      gradYear: gradYear,
      concentration: concentration,
      degree: degree
    };
  },

  addInterest: function (interest) {
    this.interests.push(interest);
  },

  logPerson: function () {
    console.log("%cAbout " + steve.name + "\n", "color: #28237C; font-style: bold; font-size: 30px; background-color: #ACA9E0; padding: 2px");
    var whoIs = Object.keys(this);
    var bar = "----------------------------------------------------------------"
    var message = "";
    for (var i = 0; i < whoIs.length; i++) {
      if (typeof this[whoIs[i]] === "object") {
        message += bar + "\n" + whoIs[i] + " - \n";
        if (Array.isArray(this[whoIs[i]]) === true) {
          message += "   " + this[whoIs[i]].toString().replace(/,/g, ', ') + "\n"
        } else {
          var child = Object.keys(this[whoIs[i]]);
          for (var j = 0; j < child.length; j++) {
            message += padRight("   " + child[j].replace(/([A-Z])/g, ' $1') + ":", 20) + this[whoIs[i]][child[j]] + "\n";
          }
        }
      } else {
        message += (padRight(whoIs[i].replace(/([A-Z])/g, ' $1') + ":", 20) + this[whoIs[i]] + "\n");
      }
    }
    return message;
  },

  dispPerson: function () {
    var message = "";
    message += "<h3>About " + steve.name + "</h3>";
    var whoIs = Object.keys(this);
    for (var i = 0; i < whoIs.length; i++) {
      if (typeof this[whoIs[i]] === "object") {
        message += "<h4>" + whoIs[i] + "</h4>";
        if (Array.isArray(this[whoIs[i]]) === true) {
          message += "<p>   " + this[whoIs[i]].toString().replace(/,/g, ', ') + "</p>"
        } else {
          var child = Object.keys(this[whoIs[i]]);
          for (var j = 0; j < child.length; j++) {
            message += "<p>" + child[j].replace(/([A-Z])/g, ' $1') + ": " + this[whoIs[i]][child[j]] + "</p>";
          }
        }
      } else {
        message += "<p>" + whoIs[i].replace(/([A-Z])/g, ' $1') + ": " + this[whoIs[i]] + "</p>";
      }
    }
    return message;
  }
};

function padRight(string, n) {    // right padding string with spaces to a total of n chars
  if (string.length >= n) {
    return string;
  }
  var max = (n - string.length);
  for (var i = 0; i < max; i++) {
    string += " ";
  }
  return string;
};

var steve = new Person("Steve Larsen", 1954, "Sheboygan", "WI", "Ellen Hartnett", "Linden Hills");
steve.addKid("Blakey", 1986, "female", "Berkeley, CA");
steve.addKid("Peter", 1988, "male", "St. Paul, MN");
steve.addSchool("Macalester College", 1976, "Studio Arts", "BA");
steve.addSchool("Brown Institute", 1980, "Computer Programming", "Certificate");
steve.addSchool("Carlson School of Business, University of Minnesota", 1988, "Information Technology", "MBA");
steve.addSchool("Prime Digital Academy", 2017, "JavaScript", "Certificate (hopefully)");
steve.addInterest("Travel");
steve.addInterest("Photography");
steve.addInterest("Film");
steve.addInterest("Cooking");
steve.addInterest("Sailing");
steve.addInterest("Guitar");

var msg = steve.logPerson();
console.log(msg);

document.getElementById("person").innerHTML = steve.dispPerson();
