// component for the whole products table
window.ProductsTable = React.createClass({
    render: function() {

    var rows = this.props.products
        .map(function(product, i) {
            return (
                <ProductRow
                    key={i}
                    product={product}
                    changeAppMode={this.props.changeAppMode} />
            );
        }.bind(this));

        return(
            !rows.length
                ? <div className='alert alert-danger'>Sin noticias.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Fecha</th>
                            <th>Contenido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.reverse()}
                    </tbody>
                </table>
        );
    }
});
