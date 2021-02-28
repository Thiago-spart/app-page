/*  Consumo da API
async function getContent() {
	try {
		const response = await fetch('https://')	
		//console.log(response)
		const data = await response.json()
		
		show(data)
	} catch(error) {
		console.error(error);
	}
}

function show(users) {
	[user1, user2, user3]
	let output = ''

	for (let user of users) {
		output += `<li>${user.name}</li>`
	}

	document.querySelector('main').innerHTML = output
}
*/

const Utils = {
  formatDate(date){
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  }
}

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("minha.escola.notification")) || []
  },
  set(notification) {
    localStorage.setItem("minha.escola.notification", JSON.stringify(notification))
  }
}

const Notification = {
	all: Storage.get(),

	add(notification) {
    this.all.push(notification)

    App.reload()
  },
  
  remove(index) {
    this.all.splice(index, 1)
    App.reload()
  }
}

const DOM = {
	container: document.querySelector('#data-table tbody'),
	
	newNotification(notification, index) {
    const tr = document.createElement('tr');
    tr.dataset.index = index;
    console.log(notification)
    tr.innerHTML = this.innerHTMLNotification(notification, index);
    this.container.appendChild(tr)
  },

	innerHTMLNotification(notification, index) {
		const { title, date, important } = notification
    console.log(notification)
		const check = notification.important != '' ? "Importante" : ""  
		const html = `
    <td>1</td>
    <td>${date}</td>
    <td>${title}</td>
    <td>${check}</td>
    <td class="text-danger">
      <button class="btn btn-outline-danger btn-sm">
        <i onclick="Notification.remove(${index})" class="material-icons">close</i>
      </button>
    </td>
    `
		
    return html
	},

	clearNotification() {
    DOM.container.innerHTML = ""
  }
}

const Form = {
	title: document.querySelector('input#title'),
  important: document.querySelector('input#important'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      title: this.title.value,
      important: this.important.value,
      date: this.date.value,
    }
  },

  validateFields() {
    const { title, date } = this.getValues();

    if(title.trim() === "" || date.trim() === "") {
      throw new Error("Preencha os campos necessarios")
    }
  },

  formatValues() {
    let { title, date, important } = this.getValues()

    date = Utils.formatDate(date)

    return {
      title, 
      date, 
      important
    }
    
  },

  clearFields() {
    this.title.value = "";
    this.important.value = "";
    this.date.value = "";
  },

  submit(event) {
    
    event.preventDefault()

    try {
      this.validateFields()
      const notification = this.formatValues()
      Notification.add(notification)

      this.clearFields()
      
    } catch (error) {
      alert(error.message)
    }
  }
}

const App = {
  init() {
    Notification.all.forEach((t, index) => {
      DOM.newNotification(t, index)
    })
    Storage.set(Notification.all)
  },
  reload() {
    DOM.clearNotification();
    this.init();
  }
}

App.init()