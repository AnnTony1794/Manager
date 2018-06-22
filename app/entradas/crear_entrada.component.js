window.CreateProductComponent = React.createClass({
  // initialize values
getInitialState: function() {
  return {
      categories: [],
      selectedCategoryId: -1,
      name: '',
      content: '',
      successCreation: null
  };
},

// on mount, get all categories and store them in this component's state
componentDidMount: function() {
    
  this.setState({
          categories: ['becas', 'inscripcion', 'eventos', 'noticia' ]
  });

  $('.page-header h1').text('Agergar Noticia');
},

// on unmount, stop getting categories in case the request is still loading
componentWillUnmount: function() {
},
    
// handle category change
onCategoryChange: function(e) {
    this.setState({selectedCategoryId: e.target.value});
},
 
// handle name change
onNameChange: function(e) {
    this.setState({name: e.target.value});
},
 
// handle description change
onDescriptionChange: function(e) {
    this.setState({content: e.target.value});
},
 
// handle price change
onPriceChange: function(e) {
    this.setState({date: e.target.value});
},

// handle save button clicked
onSave: function(e){

    // data in the form
    var form_data={
        name: this.state.name,
        content: this.state.content,
        date: this.state.date,
        category: this.state.selectedCategoryId
    };

    // submit form data to api
    $.ajax({
        url: 'https://uteush.herokuapp.com/ut/noticias',
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(form_data),
        success : function(response) {

            // api message
            this.setState({successCreation: response['message']});

            // empty form
            this.setState({name: ""});
            this.setState({content: ""});
            this.setState({date: ""});
            this.setState({selectedCategoryId: -1});

        }.bind(this),
        error: function(xhr, resp, text){
            // show error to console
            console.log(xhr, resp, text);
        }
    });

    e.preventDefault();
},

render: function() {

    // make categories as option for the select tag.
    var categoriesOptions = this.state.categories.map(function(category){
        return (
            <option key={category} value={category}>{category}</option>
        );
    });

    /*
    - tell the user if a product was created
    - tell the user if unable to create product
    - button to go back to products list
    - form to create a product
    */
    return (
    <div>
        {

            this.state.successCreation == "Product was created." ?
                <div className='alert alert-success'>
                    Product was saved.
                </div>
            : null
        }

        {

            this.state.successCreation == "Unable to create product." ?
                <div className='alert alert-danger'>
                    Unable to save product. Please try again.
                </div>
            : null
        }

        <a href='#'
            onClick={() => this.props.changeAppMode('read')}
            className='btn btn-primary margin-bottom-1em'> Lista de noticias
        </a>


        <form onSubmit={this.onSave} data-toggle="validator">
            <table className='table table-bordered table-hover'>
            <tbody>
                <tr>
                    <td>Nombre</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.name}
                        required
                        title="rellenar"
                        onChange={this.onNameChange} />
                    </td>
                </tr>

                <tr>
                    <td>Contenido</td>
                    <td>
                        <textarea
                        type='text'
                        className='form-control'
                        required                                                
                        title="rellenar"
                        value={this.state.content}
                        onChange={this.onDescriptionChange}>
                        </textarea>
                    </td>
                </tr>
 
                <tr>
                    <td>Fecha</td>
                    <td>
                        <input
                        type='date'
                        step="0.01"
                        className='form-control'
                        value={this.state.date}
                        required                          
                        title="rellenar"
                        onChange={this.onPriceChange}/>
                    </td>
                </tr>

                <tr>
                    <td>Categoria</td>
                    <td>
                        <select
                        onChange={this.onCategoryChange}
                        className='form-control'
                        value={this.state.selectedCategoryId}>
                        <option value="-1">Elige la categoria...</option>
                        {categoriesOptions}
                        </select>
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td>
                        <button
                        className='btn btn-primary'
                        onClick={this.onSave}>Guardar</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    </div>
    );
}
});
