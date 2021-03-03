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

const Students = {
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
	
	newStudents(item, index) {
    const tr = document.createElement('tr');
    tr.dataset.index = index;
    tr.innerHTML = this.innerHTMLStudents(item, index);
    this.container.appendChild(tr)
  },

	innerHTMLStudents(item, index) {
		const { studentName, studentLogin, studentClassRoom } = item  
		const html = `
    <td>${studentLogin}</td>
    <td>${studentName}</td>
    <td>${studentClassRoom}</td>
    <td class="text-danger">
      <button class="btn btn-outline-danger btn-sm">
        <i onclick="Students.remove(${index})" class="material-icons">close</i>
      </button>
    </td>`
		
    return html
	},

	clearStudents() {
    DOM.container.innerHTML = ""
  }
}

const Form = {
  studentLogin: document.querySelector('input#studentLogin'),
	studentName: document.querySelector('input#studentName'),
  studentClassRoom: document.querySelector('input#studentClassRoom'),
  
  getValues() {
    return {
      studentLogin: this.studentLogin.value,
      studentName: this.studentName.value,
      studentClassRoom: this.studentClassRoom.value,
    }
  },

  validateFields() {
    const { studentLogin, studentName, studentClassRoom } = this.getValues();

    if(studentLogin.trim() === "" || studentName.trim() === "" || studentClassRoom.trim() === "") {
      throw new Error("Preencha os campos necessários")
    }
  },

  formatValues() {
    let { studentLogin, studentName, studentClassRoom } = this.getValues()

    return {
      studentLogin, 
      studentName, 
      studentClassRoom
    }
    
  },

  clearFields() {
    this.studentLogin.value = ""
    this.studentName.value = ""
    this.studentClassRoom.value = ""
  },

  submit(event) {
    
    event.preventDefault()

    try {
      this.validateFields()
      const item = this.formatValues()
      Students.add(item)

      this.clearFields()
      
    } catch (error) {
      alert(error.message)
    }
  }
}
/*ClassRoom*/

const App = {
  init() {
    Students.all.forEach((t, index) => {
      DOM.newStudents(t, index)
    })
    Storage.set(Students.all)
  },
  reload() {
    DOM.clearStudents()
    this.init()
  }
}


App.init()