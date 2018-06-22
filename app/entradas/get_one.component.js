// component that contains the logic to read one product
window.ReadOneProductComponent = React.createClass({
   getInitialState: function() {
    // Get this product fields from the data attributes we set on the
    // #content div, using jQuery
    return {
        id: 0,
        name: '',
        content: '',
        date: 0,
        category_name: ''
    };
},
 
// on mount, read product data and them as this component's state
componentDidMount: function(){
 
    var productId = this.props.productId;
    this.serverRequestProd = $.get("https://uteush.herokuapp.com/ut/noticias/" + productId,
        function (product) {
            this.setState({category_name: product.noticia.category});
            this.setState({id: product.noticia._id});
            this.setState({name: product.noticia.name});
            this.setState({content: product.noticia.content});
            this.setState({date: product.noticia.date});
        }.bind(this));
 
    $('.page-header h1').text('Read Product');
},
 
// on unmount, kill categories fetching in case the request is still pending
componentWillUnmount: function() {
    this.serverRequestProd.abort();
},
 
render: function() {
 
    return (
        <div>
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
                        <td>{this.state.name}</td>
                    </tr>
 
                    <tr>
                        <td>Contenido</td>
                        <td>{this.state.content}</td>
                    </tr>
 
                    <tr>
                        <td>Fecha</td>
                        <td>{this.state.date}</td>
                    </tr>
 
                    <tr>
                        <td>Categoria</td>
                        <td>{this.state.category_name}</td>
                    </tr>
 
                    </tbody>
                </table>
            </form>
        </div>
    );
}
});