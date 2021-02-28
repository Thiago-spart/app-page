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

const Subjects = {
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
	
	newSubjects(item, index) {
    const tr = document.createElement('tr');
    tr.dataset.index = index;
    tr.innerHTML = this.innerHTMLSubjects(item, index);
    this.container.appendChild(tr)
  },

	innerHTMLSubjects(item, index) {
		const { subjectCode, subject } = item  
		const html = `
    <td>${subject}</td>
    <td>${subjectCode}</td>
    <td class="text-danger">
      <button class="btn btn-outline-danger btn-sm">
        <i onclick="Subjects.remove(${index})" class="material-icons">close</i>
      </button>
    </td>`
		
    return html
	},

	clearSubjects() {
    DOM.container.innerHTML = ""
  }
}

const Form = {
  subject: document.querySelector('input#subject'),
	subjectCode: document.querySelector('input#subjectCode'),

  getValues() {
    return {
      subject: this.subject.value,
      subjectCode: this.subjectCode.value,
    }
  },

  validateFields() {
    const { subject, subjectCode } = this.getValues();

    if(subject.trim() === "" || subjectCode.trim() === "") {
      throw new Error("Preencha os campos necessários")
    }
  },

  formatValues() {
    let { subject, subjectCode } = this.getValues()

    return {
      subject, 
      subjectCode
    }
    
  },

  clearFields() {
    this.subject.value = ""
    this.subjectCode.value = ""
  },

  submit(event) {
    
    event.preventDefault()

    try {
      this.validateFields()
      const item = this.formatValues()
      Subjects.add(item)

      this.clearFields()
      
    } catch (error) {
      alert(error.message)
    }
  }
}
/*ClassRoom*/

const App = {
  init() {
    Subjects.all.forEach((t, index) => {
      DOM.newSubjects(t, index)
    })
    Storage.set(Subjects.all)
  },
  reload() {
    DOM.clearSubjects()
    this.init()
  }
}


App.init()