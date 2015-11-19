function Team(teamName) {
  this.teamName = teamName;
  this.members = [];
}

function Member(firstName, lastName) {
  this.firstName = firstName;
  this.lastname = lastName;
  this.lastInitial = lastName.charAt(0) + '.';
  this.fullName = firstName + ' ' + lastName;
}

var adia = new Member('Adia', 'Alderson');
var manuel = new Member('Manuel', 'Alvarez');
var chris = new Member('Chris', 'Arnesen');
var amanda = new Member('Amanda', 'Bausch');
var brandi = new Member('Brandi', 'Brown');
var john = new Member('John', 'Crimmings');
var kyra = new Member('Kyra', 'Crowston');
var andrewD = new Member('Andrew', 'Dourgarian');
var moni = new Member('Moni', 'Francesca');
var nicholas = new Member('Nicholas', 'Gill');
var andrewH = new Member('Andrew', 'Harasymiw');
var clayton = new Member('Clayton', 'Hottinger');
var keisha = new Member('Keisha', 'Josephs');
var james = new Member('James', 'Kirwin');
var connor = new Member('Connor', 'Klausing');
var charlotte = new Member('Charlotte', 'Kroening');
var ben = new Member('Ben', 'Margis');
var gwendolyn = new Member('Gwendolyn', 'Paul');
var sam = new Member('Sam', 'Richard');
var derek = new Member('Derek', 'Roche');
var ashley = new Member('Ashley', 'Steele');
var wallace = new Member('Wallace', 'Wylie');

function instantiateMembers() {
  var memberArray = [];

  memberArray.push(adia);
  memberArray.push(manuel);
  memberArray.push(chris);
  memberArray.push(amanda);
  memberArray.push(brandi);
  memberArray.push(john);
  memberArray.push(kyra);
  memberArray.push(andrewD);
  memberArray.push(moni);
  memberArray.push(nicholas);
  memberArray.push(andrewH);
  memberArray.push(clayton);
  memberArray.push(keisha);
  memberArray.push(james);
  memberArray.push(connor);
  memberArray.push(charlotte);
  memberArray.push(ben);
  memberArray.push(gwendolyn);
  memberArray.push(sam);
  memberArray.push(derek);
  memberArray.push(ashley);
  memberArray.push(wallace);

  return memberArray;
}

function instantiateTeam(numTeams) {
  var teamArray = [];

  for(var i = 0; i < numTeams; i++) {
    teamArray[i] = new Team('Team ' + (i));
  }

  return teamArray;
}

// function copyArray(array) {
//   var tempArray = [];
//   array.forEach(function(elem) {
//     tempArray.push();
//   });
//   return tempArray;
// }
//
// function randomizeArray(orderedArray, randomArray) {
//   var randomIndex = Math.floor(orderedArray.length * Math.random());
//
//   //create temporary array
//   var tempArray = copyArray(orderedArray);
//
//
//   randomArray.push(tempArray[randomIndex]);
//
//   return randomArray;
// }

// shuffle the array
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(document).ready(function() {
  var memberArray = instantiateMembers();

  memberArray.forEach(function(elem) {
    $('.alphList').append($('<div class="memberBox">' +
                  '<p class="member">' + elem.fullName + '</p></div>'));
  });

  $('form').on('submit', function(event) {
    try {

      // clear teamContainer
      $('.teamContainer').empty();
      memberArray = instantiateMembers();
      console.log(memberArray);
      var numTeams = $('input[name="numberTeams"]:checked').val();
      console.log(numTeams);
      if (numTeams === undefined) {
        alert('Please select the number of teams');
      }
      console.log(shuffle(memberArray));

      //instantiate the teams and reapply h2 that was cleared
      var teamArray = instantiateTeam(numTeams);
      $('.teamContainer').append('<h2>Teams</h2>');

      //iterate through team array and create a div for each
      teamArray.forEach(function(elem) {
        $('.teamContainer').append($('<div class="team"><h3>' + elem.teamName +
                            '</h3></div>'));
      });

      // assign members to teams
      while(memberArray.length > 0) {
        for(var k = 0; k < teamArray.length; k++) {
          var $memberSelector = $('div.memberBox:contains(' +
                            memberArray[memberArray.length - 1].fullName + ')');
          console.log($memberSelector);
          console.log(memberArray[memberArray.length - 1]);
          // $memberSelector.fadeOut('slow').delay(500);
          teamArray[k].members.push(memberArray.pop());
          var elem = teamArray[k].members[teamArray[k].members.length - 1];

          $('div.team:contains(' + teamArray[k].teamName +
                        ')').append($('<div class="memberBox">' +
                        '<p class="member">' + elem.fullName + '</p></div>'));
          if(memberArray.length === 0) {
            break;
          }

          // $memberSelector.fadeOut('slow').delay(500);
        }
      }

      console.log(teamArray);

    } catch (exception) {
      console.log(exception);
    } finally {
      event.preventDefault();
    }

  });
});
