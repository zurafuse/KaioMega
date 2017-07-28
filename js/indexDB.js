function loadGame()
{
	// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
	
	// Open (or create) the database
	var open = indexedDB.open("kaioDatabase", 1);
	
	// Create the schema
	open.onupgradeneeded = function() {
		var db = open.result;
		var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
	};
	
	open.onsuccess = function() {
		// Start a new transaction
		var db = open.result;
		var tx = db.transaction("MyObjectStore", "readwrite");
		var store = tx.objectStore("MyObjectStore");
	
	if (kaiomega.newGame == true)
	{
		// Add some data
	store.put({id: 0, name: "Player", xp: 0});
	store.put({id: 1, name: "KaeLeigh", xp: 35});
	store.put({id: 2, name: "Kaio", xp: 35});
	store.put({id: 3, name: "Global", mula: 0});	
	}
	else
	{   
		// Query the data
		var getUser = store.get(0);
		var getGlobal = store.get(3);
	
		getUser.onsuccess = function() {
			kaioPlayer.name = getUser.result.name;
			kaioPlayer.xp = getUser.result.xp;
		};
		
		getGlobal.onsuccess = function() {
			kaiomega.money = getGlobal.result.mula;
		}
	}
	
	
		// Close the db when the transaction is done
		tx.oncomplete = function() {
			db.close();
		};
		console.log(open.result);
	}
}

//Save game data to the database
function saveGame()
{
		// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
	
	// Open (or create) the database
	var open = indexedDB.open("kaioDatabase", 1);
	
	// Create the schema
	open.onupgradeneeded = function() {
		var db = open.result;
		var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
	};
	
	open.onsuccess = function() {
		// Start a new transaction
		var db = open.result;
		var tx = db.transaction("MyObjectStore", "readwrite");
		var store = tx.objectStore("MyObjectStore");

		// Add some data
		store.put({id: 0, name: kaioPlayer.name, xp: kaioPlayer.xp});
		store.put({id: 3, name: "Global", mula: kaiomega.money}); 	
	
	
		// Close the db when the transaction is done
		tx.oncomplete = function() {
			db.close();
		};
		console.log(open.result);
	}
  
}