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
  },
  checkBox(box) {
    return box !== "" ? "Importante" : ""
  }
}

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("minha.escola.notification")) || []
  },
  set(item) {
    localStorage.setItem("minha.escola.notification", JSON.stringify(item))
  }
}

const ClassRoom = {
	all: Storage.get(),

	add(item) {
    this.all.push(item)

    App.reload()
  },
  
  remove(index) {
    this.all.splice(index, 1)
    App.reload()
  }
}

/*ClassRoom*/
const DOM = {
	container: document.querySelector('#data-table tbody'),
	
	newClassRoom(item, index) {
    const tr = document.createElement('tr');
    tr.dataset.index = index;
    tr.innerHTML = this.innerHTMLClassRoom(item, index);
    this.container.appendChild(tr)
  },

	innerHTMLClassRoom(item, index) {
		const { classRoomId, classRoomName } = item  
		const html = `
    <td>${classRoomId}</td>
    <td>${classRoomName}</td>
    <td class="text-danger">
      <button class="btn btn-outline-danger btn-sm">
        <i onclick="ClassRoom.remove(${index})" class="material-icons">close</i>
      </button>
    </td>`
		
    return html
	},

	clearClassRoom() {
    DOM.container.innerHTML = ""
  }
}

const Form = {
	classRoomId: document.querySelector('input#classRoomId'),
  classRoomName: document.querySelector('input#classRoomName'),
  
  getValues() {
    return {
      classRoomId: this.classRoomId.value,
      classRoomName: this.classRoomName.value,
    }
  },

  validateFields() {
    const { classRoomId, classRoomName } = this.getValues();

    if(classRoomId.trim() === "" || classRoomName.trim() === "") {
      throw new Error("Preencha os campos necessários")
    }
  },

  formatValues() {
    let { classRoomId, classRoomName } = this.getValues()

    return {
      classRoomId, 
      classRoomName
    }
    
  },

  clearFields() {
    this.classRoomId.value = ""
    this.classRoomName.value = ""
  },

  submit(event) {
    
    event.preventDefault()

    try {
      this.validateFields()
      const item = this.formatValues()
      ClassRoom.add(item)

      this.clearFields()
      
    } catch (error) {
      alert(error.message)
    }
  }
}
/*ClassRoom*/

const App = {
  init() {
    ClassRoom.all.forEach((t, index) => {
      DOM.newClassRoom(t, index)
    })
    Storage.set(ClassRoom.all)
  },
  reload() {
    DOM.clearClassRoom()
    this.init()
  }
}


App.init()