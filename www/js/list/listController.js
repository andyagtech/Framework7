define(["app", "js/contactModel","js/list/listView"], function(app, Contact, ListView) {

	/**
	 * Bindings array. Bind DOM event to some handler function in controller
	 * @type {*[]}
	 */
	var bindings = [{
		element: '.contact-add-link',
		event: 'click',
		handler: openAddPopup
	}, {
		element: '.list-panel-all',
		event: 'click',
		handler: showAll
	}, {
		element: '.list-panel-favorites',
		event: 'click',
		handler: showFavorites
	}
	];

	var state = {
		isFavorite: false
	};

    function init() {
		var contacts = loadContacts();
		ListView.render({
			bindings: bindings,
			model: contacts
		});
	}

	function openAddPopup() {
		app.router.load('contactEdit', { 'isFavorite': state.isFavorite });
	}

	function showAll() {
		state.isFavorite = false;
		var contacts = loadContacts();
		ListView.reRender({ model: contacts, header: "Contacts" });
	}

	function showFavorites() {
		state.isFavorite = true;
		var contacts = loadContacts({ isFavorite: true });
		ListView.reRender({ model: contacts, header: "Favorites" });
	}

	function loadContacts(filter) {
		var f7Contacts = localStorage.getItem("f7Contacts");
		var contacts = f7Contacts ? JSON.parse(f7Contacts) : tempInitializeStorage();
		if (filter) {
			contacts = _.filter(contacts, filter);
		}
		contacts.sort(contactSort);
		contacts = _.groupBy(contacts, function(contact) { return contact.firstName.charAt(0); });
		contacts = _.toArray(_.mapValues(contacts, function(value, key) { return { 'letter': key, 'list': value }; }));
		return contacts;
	}

	function tempInitializeStorage() {
		var contacts = [
			new Contact({  
      "id":"8be5eec6-3345-42ed-e3a6-eda1ac1709ed",
      "picId":1,
      "createdOn":"2014-07-28T06:27:01.865Z",
      "firstName":"Andy",
      "lastName":"Barr",
      "company":"Systino Mellon",
      "phone":"+1.425.829.7011",
      "email":"el.andy.barr@gmail.com",
      "city":"Redmond",
      "isFavorite":true
   }),
			new Contact({  
      "id":"d74329c0-003e-44fe-e2b1-d66a76c2b875",
      "picId":5,
      "createdOn":"2014-07-28T06:27:01.865Z",
      "firstName":"Taban",
      "lastName":"Cosmos",
      "company":"Whatsonplate",
      "phone":"+",
      "email":"cosmos.taban@gmail.com",
      "city":"Issaquah",
      "isFavorite":true
   }),
			new Contact({  
      "id":"30aca2b0-b416-4359-9742-861087baa988",
      "picId":2,
      "createdOn":"2014-07-28T06:27:01.865Z",
      "firstName":"Matthew",
      "lastName":"Holladay",
      "company":"SpatialSpartika",
      "phone":"713-502-5905",
      "email":"holladay.mw@gmail.com",
      "city":"College Station",
      "isFavorite":true
   }),
			new Contact({  
      "id":"251c836a-39c6-4990-ac43-1bdb8abd19f0",
      "picId":7,
      "createdOn":"2014-07-28T06:27:01.865Z",
      "firstName":"Arya",
      "lastName":"Nazari",
      "company":"Legal Mumblings",
      "phone":"425-283-2792",
      "email":"arya@gmail.com",
      "city":"Kiev",
      "isFavorite":false
   }),
			new Contact({  
      "id":"0d57e31d-fe38-40ec-cd8d-8801f37d79e6",
      "picId":3,
      "createdOn":"2014-07-28T06:27:01.866Z",
      "firstName":"Gili",
      "lastName":"Paz",
      "company":"Tel Hai College",
      "phone":"+380631234570",
      "email":"gili.paz@gmail.com",
      "city":"Tel Hai",
      "isFavorite":false
   }),
			new Contact({  
      "id":"b9eb0c85-32a4-44b0-803c-ac051c9b1548",
      "picId":1,
      "createdOn":"2014-07-28T06:27:01.866Z",
      "firstName":"Nadya",
      "lastName":"Stalinsky",
      "company":"Global Think",
      "phone":"+380631234567",
      "email":"communism4ever@gmail.com",
      "city":"Phoenix",
      "isFavorite":false
   })
		];
		localStorage.setItem("f7Contacts", JSON.stringify(contacts));
		return JSON.parse(localStorage.getItem("f7Contacts"));
	}

	function contactSort(a, b) {
		if (a.firstName > b.firstName) {
			return 1;
		}
		if (a.firstName === b.firstName && a.lastName >= b.lastName) {
			return 1;
		}
		return -1;
	}

    return {
        init: init
    };
});