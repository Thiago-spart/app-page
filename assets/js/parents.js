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

const Parents = {
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

/*Parents*/
const DOM = {
	container: document.querySelector('#data-table tbody'),
	
	newParents(item, index) {
    const tr = document.createElement('tr');
    tr.dataset.index = index;
    tr.innerHTML = this.innerHTMLParents(item, index);
    this.container.appendChild(tr)
  },

	innerHTMLParents(item, index) {
		const { parentsName, parentsTel, childrenNum } = item  
		const html = `
    <td>${parentsTel}</td>
    <td>${parentsName}</td>
    <td>${childrenNum}</td>
    <td class="text-danger">
      <button class="btn btn-outline-danger btn-sm">
        <i onclick="Parents.remove(${index})" class="material-icons">close</i>
      </button>
    </td>`
		
    return html
	},

	clearParents() {
    DOM.container.innerHTML = ""
  }
}

const Form = {
  parentsTel: document.querySelector('input#parentsTel'),
  parentsName: document.querySelector('input#parentsName'),
	childrenNum: document.querySelector('input#childrenNum'),

  getValues() {
    return {
      parentsTel: this.parentsTel.value,
      parentsName: this.parentsName.value,
      childrenNum: this.childrenNum.value,
    }
  },

  validateFields() {
    const { parentsTel, parentsName, childrenNum } = this.getValues();

    if(parentsTel.trim() === "" || parentsName.trim() === "" || childrenNum.trim() === "") {
      throw new Error("Preencha os campos necessários")
    }
  },

  formatValues() {
    let { parentsTel, parentsName, childrenNum } = this.getValues()

    return {
      parentsTel, 
      parentsName,
      childrenNum
    }
    
  },

  clearFields() {
    this.parentsTel.value = ""
    this.parentsName.value = ""
    this.childrenNum.value = ""
  },

  submit(event) {
    
    event.preventDefault()

    try {
      this.validateFields()
      const item = this.formatValues()
      Parents.add(item)

      this.clearFields()
      
    } catch (error) {
      alert(error.message)
    }
  }
}
/*Parents*/

const App = {
  init() {
    Parents.all.forEach((t, index) => {
      DOM.newParents(t, index)
    })
    Storage.set(Parents.all)
  },
  reload() {
    DOM.clearParents()
    this.init()
  }
}


App.init()