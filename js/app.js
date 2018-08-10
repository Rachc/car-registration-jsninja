(function(DOM) {
  'use strict';

  /*
    A loja de carros será nosso desafio final. Na aula anterior, você fez a parte
    do cadastro dos carros. Agora nós vamos começar a deixar ele com cara de
    projeto mesmo.

    Crie um novo repositório na sua conta do GitHub, com o nome do seu projeto.

    Na hora de criar, o GitHub te dá a opção de criar o repositório com um
    README. Use essa opção.

    Após criar o repositório, clone ele na sua máquina.

    Crie uma nova branch chamada `challenge-30`, e copie tudo o que foi feito no
    desafio da aula anterior para esse novo repositório, nessa branch
    `challenge-30`.

    Adicione um arquivo na raiz desse novo repositório chamado `.gitignore`.
    O conteúdeo desse arquivo deve ser somente as duas linhas abaixo:

    node_modules
    npm-debug.log

    Faça as melhorias que você achar que são necessárias no seu código, removendo
    duplicações, deixando-o o mais legível possível, e então suba essa alteração
    para o repositório do seu projeto.

    Envie um pull request da branch `challenge-30` para a `master` e cole aqui
    nesse arquivo, dentro do `console.log`, o link para o pull request no seu
    projeto.
  */

  function app(){
    var ajax = new XMLHttpRequest()

    var $companyName = new DOM('[data-js="companyName"]')
    var $companyNumber = new DOM('[data-js="companyNumber"]')

    var $inputImage = new DOM('[data-js="inputImage"]')
    var $inputBrand = new DOM('[data-js="inputBrand"]')
    var $inputYear = new DOM('[data-js="inputYear"]')
    var $inputPlate = new DOM('[data-js="inputPlate"]')
    var $inputColor = new DOM('[data-js="inputColor"]')
    var $registerBtn = new DOM('[data-js="registerBtn"]')

    var $tableContent = new DOM('[data-js="content"]')
    var $errorDiv = new DOM('[data-js="errors"]')

    function getCompanyData() {
      ajax.open('GET', 'company.json');
      ajax.send();
      ajax.addEventListener('readystatechange', handleStateChange);
    }

    function handleStateChange () {
      if (ajax.readyState === 4 && ajax.status === 200) {
        var companyData = JSON.parse(ajax.responseText);
        $companyName.get()[0].textContent = companyData.name;
        $companyNumber.get()[0].textContent = companyData.phone;
      }
    }

    function registerCar(e){
      e.preventDefault()
      clearErrorMessages()
      if (validate()){
        renderCars()
        clearInputs()
      } else {
        renderErrorMessages()
      }
    }

    function getFormData(){
      return {
        image: $inputImage.get()[0].value,
        brand: $inputBrand.get()[0].value,
        year: $inputYear.get()[0].value,
        plate: $inputPlate.get()[0].value,
        color: $inputColor.get()[0].value,
      }
    }

    function clearInputs(){
      $inputImage.get()[0].value = ''
      $inputBrand.get()[0].value = ''
      $inputYear.get()[0].value = ''
      $inputPlate.get()[0].value = ''
      $inputColor.get()[0].value = ''
    }

    function renderCars(){
      var values = getFormData()
      var fragment = document.createDocumentFragment()
      var tr = document.createElement('tr')

      var tdImage = document.createElement('td')
      var tdBrand = document.createElement('td')
      var tdYear = document.createElement('td')
      var tdPlate = document.createElement('td')
      var tdColor = document.createElement('td')

      var img = document.createElement('img')
      var brandTxt = document.createTextNode(values.brand)
      var yearTxt = document.createTextNode(values.year)
      var plateTxt = document.createTextNode(values.plate)
      var colorTxt = document.createTextNode(values.color)

      img.src = values.image

      tdImage.appendChild(img)
      tdBrand.appendChild(brandTxt)
      tdYear.appendChild(yearTxt)
      tdPlate.appendChild(plateTxt)
      tdColor.appendChild(colorTxt)

      tr.appendChild(tdImage)
      tr.appendChild(tdBrand)
      tr.appendChild(tdYear)
      tr.appendChild(tdPlate)
      tr.appendChild(tdColor)
      
      fragment.appendChild(tr)
      $tableContent.get()[0].appendChild(fragment)
    }

    var validate = function validate(){
      return validatePlate() && validateYear() && validateUrl()
    }
    
    var validateUrl = function validateUrl(url){
      var regex = /^http(s?):\/\/(\S+)\.(jpg|png|gif)$/i
      return regex.test($inputImage.get()[0].value)
    }

    var validateYear = function validateYear(){
      var regex = /(19|20)\d\d/
      return regex.test($inputYear.get()[0].value)
    }

    var validatePlate = function validatePlate(){
      var regex = /\D{3}-\d{4}/i
      return regex.test($inputPlate.get()[0].value)
    }

    var getErrorMessages = function getErrorMessages(){
      var errorMessages = []

      if (!validatePlate())
        errorMessages.push('A placa deve estar no formato aaa-1111')

      if (!validateYear())
        errorMessages.push('Digite um ano válido')

      if (!validateUrl())
        errorMessages.push('o endereço deve começar com http ou https e os formatos aceitos são jpg, png e gif')

      return errorMessages
    }

    var renderErrorMessages = function renderErrorMessages(){
      var errors = getErrorMessages()
      var fragment = document.createDocumentFragment()
      var ul = document.createElement('ul')
      errors.forEach(function(element){
        var li = document.createElement('li')
        var liError = document.createTextNode(element)
        li.appendChild(liError)
        ul.appendChild(li)
      })
      fragment.appendChild(ul)
      $errorDiv.get()[0].appendChild(fragment)
    }

    var clearErrorMessages = function clearErrorMessages(){
      var errorDiv = $errorDiv.get()[0]
      while (errorDiv.firstChild) {
         errorDiv.removeChild(errorDiv.firstChild);
      }
    }

    $registerBtn.get()[0].addEventListener('click', registerCar, false)

    getCompanyData()
  }

  app()

})(window.DOM);