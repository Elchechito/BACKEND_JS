const productos = [
    {id: 1, nombre:'Producto 1', precio: 10 },
    {id: 2, nombre:'Producto 2', precio: 20 },
];

const carrito= [];

function agregarProducto(id) {
    const producto = productos.find(item => item.id === id);
    if (producto) {
        carrito.push(producto)
        actualizarCarrito();
    }
}

function eliminarProducto(id) {
    const index = carrito.findIndex(item=> item.id === id)
    if (index !== -1){
        carrito.splice(index, 1)
        actualizarCarrito();
    }
}

