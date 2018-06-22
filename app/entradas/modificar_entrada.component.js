// component that contains the logic to update a product
window.UpdateProductComponent = React.createClass({
    getInitialState: function() {
    // Get this product fields from the data attributes we set on the
    // #content div, using jQuery
    return {
        categories: [],
        selectedCategoryId: 0,
        id: 0,
        name: '',
        content: '',
        date: 0,
        successUpdate: null
    };
},
 
// on mount, fetch all categories and one product data to stored them as this component's state
componentDidMount: function(){
 
    // read categories
    this.setState({
        categories: ['becas', 'inscripcion', 'eventos', 'noticia' ]
    });
           
 
    // read one product data
    var productId = this.props.productId;
    this.serverRequestProd = $.get("https://uteush.herokuapp.com/ut/noticias/" + productId,
        function (product) {
            this.setState({selectedCategoryId: product.noticia.category});
            this.setState({id: product.noticia._id});
            this.setState({name: product.noticia.name});
            this.setState({content: product.noticia.content});
            this.setState({date: product.noticia.date});
        }.bind(this));
 
    $('.page-header h1').text('Update product');
},
 
// on unmount, kill categories fetching in case the request is still pending
componentWillUnmount: function() {
    this.serverRequestProd.abort();
},
 
// handle category change
onCategoryChange: function(e){
    this.setState({selectedCategoryId: e.target.value});
},
 
// handle name change
onNameChange: function(e){
    this.setState({name: e.target.value});
},
 
// handle description change
onDescriptionChange: function(e){
    this.setState({content: e.target.value});
},
 
// handle price change
onPriceChange: function(e){
    this.setState({date: e.target.value});
},
 
// handle save changes button clicked
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
        url: "https://uteush.herokuapp.com/ut/noticias/" + this.state.id,
        type : "PUT",
        contentType : 'application/json',
        data : JSON.stringify(form_data),
        success : function(response) {
            this.setState({successUpdate: response.noticia['message']});
            this.props.changeAppMode('read');
        }.bind(this),
        error: function(xhr, resp, text){
            // show error to console
            console.log(xhr, resp, text);
        }
    });
 
    e.preventDefault();
    
},
 
render: function() {
    var categoriesOptions = this.state.categories.map(function(category){
        return (
            <option key={category} value={category}>{category}</option>
        );
    });
 
    return (
        <div>
            {
                this.state.successUpdate == "Product was updated." ?
                    <div className='alert alert-success'>
                        Noticia modificada.
                    </div>
                : null
            }
 
            {
                this.state.successUpdate == "Unable to update product." ?
                    <div className='alert alert-danger'>
                        No se pudo modificar. Intente de nuevo.
                    </div>
                : null
            }
 
            <a href='#'
                onClick={() => this.props.changeAppMode('read')}
                className='btn btn-primary margin-bottom-1em'>
                Lista de noticias
            </a>
 
            <form onSubmit={this.onSave}>
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
                                value={this.state.content}
                                onChange={this.onDescriptionChange}></textarea>
                        </td>
                    </tr>
 
                    <tr>
                        <td>Fecha</td>
                        <td>
                            <input
                                type='date'
                                step="0.01"
                                className='form-control'
                                value={this.state.price}
                                required
                                onChange={this.onPriceChange}/>
                        </td>
                    </tr>
 
                    <tr>
                        <td>Category</td>
                        <td>
                            <select
                                onChange={this.onCategoryChange}
                                className='form-control'
                                value={this.state.selectedCategoryId}>
                                <option value="-1">Elegir categoria...</option>
                                {categoriesOptions}
                                </select>
                        </td>
                    </tr>
 
                    <tr>
                        <td></td>
                        <td>
                            <button
                                className='btn btn-primary'
                                onClick={this.onSave}>Guardar cambios</button>
                        </td>
                    </tr>
 
                    </tbody>
                </table>
            </form>
        </div>
    );
}
});