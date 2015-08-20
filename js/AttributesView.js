var AttributesView = (function () {

  /* Local Variables */
  h = HTMLShortcuts;

  idOfNameInputBox = "#input-name"

  /* Methods */
  var generateViewOfAttributeBuyer = function(character) {

  console.log("CALLED...", character.Name);

//  nameInput = 
//  nameSection = f_encloseInDivClassColumns(nameInput)

  nameInput = h.encloseInLabel('Name', '<input id="input-name" type="text" placeholder="Name" value="' + character.Name + '" />');
  genderInput = h.encloseInLabel('Gender', '<input type="text" placeholder="Gender" />');
  alignmentInput = h.encloseInLabel('Alignment', '<input type="text" placeholder="Alignment" />');

  var form = h.encloseInForm(
    h.f_encloseInDivClassRow(
      h.f_encloseInDivClassColumns(nameInput, 4)
      + h.f_encloseInDivClassColumns(genderInput, 4)
      + h.f_encloseInDivClassColumns(alignmentInput, 4)
    )
  );

    $("#panel-attributes").html(form);
  };


/*
<form>
  <div class="row">
    <div class="large-12 columns">
      <label>Input Label
        <input type="text" placeholder="large-12.columns" />
      </label>
    </div>
  </div>
  <div class="row">
    <div class="large-4 columns">
      <label>Input Label
        <input type="text" placeholder="large-4.columns" />
      </label>
    </div>
    <div class="large-4 columns">
      <label>Input Label
        <input type="text" placeholder="large-4.columns" />
      </label>
    </div>
    <div class="large-4 columns">
      <div class="row collapse">
        <label>Input Label</label>
        <div class="small-9 columns">
          <input type="text" placeholder="small-9.columns" />
        </div>
        <div class="small-3 columns">
          <span class="postfix">.com</span>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="large-12 columns">
      <label>Select Box
        <select>
          <option value="husker">Husker</option>
          <option value="starbuck">Starbuck</option>
          <option value="hotdog">Hot Dog</option>
          <option value="apollo">Apollo</option>
        </select>
      </label>
    </div>
  </div>
  <div class="row">
    <div class="large-6 columns">
      <label>Choose Your Favorite</label>
      <input type="radio" name="pokemon" value="Red" id="pokemonRed"><label for="pokemonRed">Red</label>
      <input type="radio" name="pokemon" value="Blue" id="pokemonBlue"><label for="pokemonBlue">Blue</label>
    </div>
    <div class="large-6 columns">
      <label>Check these out</label>
      <input id="checkbox1" type="checkbox"><label for="checkbox1">Checkbox 1</label>
      <input id="checkbox2" type="checkbox"><label for="checkbox2">Checkbox 2</label>
    </div>
  </div>
  <div class="row">
    <div class="large-12 columns">
      <label>Textarea Label
        <textarea placeholder="small-12.columns"></textarea>
      </label>
    </div>
  </div>
</form>
*/


  /* Public Methods */
  return {
    generateViewOfAttributeBuyer: generateViewOfAttributeBuyer,
  };

})();
