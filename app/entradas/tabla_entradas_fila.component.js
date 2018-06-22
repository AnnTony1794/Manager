// component that renders a single product
window.ProductRow = React.createClass({
    render: function() {
    return (
        <tr>
            <td>{this.props.product.name}</td>
            <td>{this.props.product.category}</td>
            <td>{this.props.product.date}</td>
            <td>{this.props.product.content.substr(0,20) + '...'}</td>
            <td>
                <a href='#'
                    onClick={() => this.props.changeAppMode('readOne', this.props.product._id)}
                    className='btn btn-info m-r-1em'> Leer
                </a>
                <a href='#'
                    onClick={() => this.props.changeAppMode('update', this.props.product._id)}
                    className='btn btn-primary m-r-1em'> Editar
                </a>
                <a
                    onClick={() => this.props.changeAppMode('delete', this.props.product._id)}
                    className='btn btn-danger'> Eliminar
                </a>
            </td>
        </tr>
        );
    }
});
