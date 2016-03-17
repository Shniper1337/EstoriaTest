function Player(username, lvl, exp, expNeeded, nextLevel, gold, hp, atk, def, spd) {
  var self = this;
  this.username = username;
  this.lvl = lvl;
  this.exp = exp;
  this.nextLevel = nextLevel;
  this.expNeeded = expNeeded;
  this.gold = gold;
  this.fullLife = hp;
  this.hp = hp;
  this.atk = atk;
  this.def = def;
  this.spd = spd;
}

// ***********************************************************************************
var player = null;

function setPlayer(){
  player = new Player(prompt("What is your username?"), 1, 0, 10, 10, 0, 10, 2, 1, 1);
  localStorage.setItem("player", JSON.stringify(Player));
}

function getPlayer(){
  player = JSON.parse(localStorage.getItem("player"));
}

// HERE IS WHERE YOU EITHER CREATE AND SAVE THEPLAYER
// OR GO GET THE PREVIOUSLY SAVED PLAYER
if(!player){
   // Save
   getPlayer();
} else {
   // Get
   setPlayer();
}
// ***********************************************************************************

if ($('body').attr("id") == "Home") {

  $('#user').text(player.username).addClass('playerName').data('player', self);
  $('#username').text("Username: " + player.username);
  $('#lvl').text("Level: " + player.lvl);
  $('#exp').text("Experience: " + player.exp);
  $('#expNeeded').text("Experience Needed: " + player.expNeeded);
  $('#gold').text("Gold: " + player.gold);
  $('#hp').text("HP: " + player.fullLife);
  $('#attack').text("Attack: " + player.atk);
  $('#defense').text("Defense: " + player.def);
  $('#speed').text("Speed: " + player.spd);
  $('#nextLevel').text("Next Level: " + player.nextLevel);
}

playerEl = $('.playerName');
player = playerEl.data('player');


function Monster(name, exp, gold, hp, atk, def, spd) {

  var self = this;
	this.name = name;
	this.exp = exp;
  this.gold = gold;
  this.fullLife = hp;
  this.hp = hp;
  this.atk = atk;
  this.def = def;
  this.spd = spd;
  // Method definition
  this.implement = function() {
  	var monsterList = document.getElementById('monsterList');
    var opt = document.createElement('OPTION'); // Creating option
    opt.innerText = this.name; // Setting innertText attribute
    $(opt).data('monster', self);
    if(opt.val() > 0){
    	monsterList.appendChild(opt); // appending option to select element
}
  };
  this.len = this.name.length;
  this.playerDamage = 0;
  this.playerDam = function () {
  	if(player.atk <= this.def) {
    	self.playerDamage = player.atk - 1;
      return self.playerDamage;
    }
    else {
  	self.playerDamage = Math.round((player.atk - self.def) * (2 - Math.random()));
    return self.playerDamage;
    }
  };
  this.monsterDamage = 0;
  this.monsterDam = function() {
      if(this.atk <= player.def) {
          self.monsterDamage = monster.atk - 1;
          return self.monsterDamage;
      }
    else {
        self.monsterDamage = Math.round((self.atk - player.def) * (2 - Math.random()));
        return self.monsterDamage;
    }
  };
  // Method execution
  this.implement();
}

$('#help').click(function() {
	$('#intro').empty();
	$('#intro').text("Thank you traveler. Please visit the Battle tab to get started");
	$('#newsh1').text("News:");
	$('#help').hide();
	$('#noHelp').hide();
	var newli = function(innertext) {
		var newsli = $('#news').append("<li>- " + innertext + "</li>");
	};
	newli("Created new battle system");
	newli("Began to make home page");
	newli("Created webpage structure");
});

var fly = new Monster("fly", 1, 1, 5, 2, 1, 1);
var mouse = new Monster("mouse", 2, 3, 10, 2, 1, 2);
var rat = new Monster("rat", 4, 5, 20, 4, 2, 2);
var rabidChihuahua = new Monster("chihuahua", 6, 8, 35, 6, 1, 4);
var bulldog = new Monster("bulldog", 10, 14, 60, 10, 4, 1);
var wolf = new Monster("Wolf", 15, 18, 65, 12, 3, 6);
var vampie = new Monster("Vampire", 20, 23, 100, 12, 5, 4);
var werewolf = new Monster("Werewolf", 25, 29, 100, 14, 3, 9);
var giantSlime = new Monster("Giant Slime", 31, 38, 200, 7, 15, 1);
var babyDragon = new Monster("Baby Dragon", 39, 50, 150, 16, 9, 5);
var orc = new Monster("Orc", 50, 64, 220, 10, 12, 4);
var succubi = new Monster("Succubi", 61, 80, 190, 21, 8, 12);
var elderDragon = new Monster("Elder Dragon", 75, 100, 300, 21, 15, 8);
var sanaan = new Monster("Sanaan", 150, 500, 500, 55, 45, 30);


$('#battleButton').click(function() {
	//playerDam();
    var round = 0;
    monsterEl = $('#monsterList option:selected');
    monster = monsterEl.data('monster');
  $('#dam').empty();
  $('#monsterdam').empty();
  while(monster.hp > 0 && player.hp > 0 && round < 20) {
      $('#monsterdam').append("</p>The " + $('#monsterList').val() + " has hit you for " + monster.monsterDam() + " damage</p>");
      player.hp -= monster.monsterDam();
  	$('#dam').append("</p>You have hit the " + $('#monsterList').val() + " for " + monster.playerDam() + " damage</p>");
    monster.hp -= monster.playerDam();
    round +=1;
        if(round >=20) {
            $('#monsterdam').append("</p>The battle has timed out</p>");
            $('#dam').append("</p>The battle has timed out</p>");
        }
  }
  if(monster.hp <= 0){
  $('#dam').append("<p>You have defeated the " + $('#monsterList').val() + ", you have received " + monster.exp + " experience and " + monster.gold + " gold!</p>");
    monster.hp = monster.fullLife;
    player.hp = player.fullLife;
    player.exp += monster.exp;
    player.gold += monster.gold;
    player.nextLevel -= monster.exp;
    player.implement();
    if(player.exp >= player.expNeeded) {
        lvlUp();
    }
}
if(player.hp <= 0){
$('#monsterdam').append("<p>The " + $('#monsterList').val() + " has defeated you!</p>");
  monster.hp = monster.fullLife;
  player.hp = player.fullLife;
}
});

var lvlUp = function() {
    player.expNeeded += player.expNeeded + player.lvl * player.lvl;
    player.nextLevel = player.expNeeded - player.exp;
    player.fullLife += player.lvl * 5 + (2 * player.lvl);
    player.lvl += 1;
    player.atk += 1;
    player.def += 1;
    player.spd += 1;
};

$('#monsterList').on('change', function() {

  if ($('option:selected', this).text().length > 8) {
    $('select').css({
      "font-size": "14px"
    });
    $('select option').css({
      "font-size": "14px"
    });
    if($('option:selected', this).text().length > 12) {
         $('select').css({
           "font-size": "12px"
         });
         $('select option').css({
           "font-size": "14px"
         });
     }
}
   else {

    $('select').css({
      "font-size": "18px"
    });
    $('select option').css({
      "font-size": "14px"
    });

  }

}).trigger('change');
