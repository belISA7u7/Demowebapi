// Arrays para almacenar productos y usuarios
let products = [];
let users = [];

// Contadores para IDs
let productIdCounter = 1;
let userIdCounter = 1;

// Inicializar tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// Manejo del formulario de productos
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productCategory = document.getElementById('productCategory').value;
    const productImage = document.getElementById('productImage').value;
    const productDescription = document.getElementById('productDescription').value;
    
    // Crear nuevo producto
    const newProduct = {
        id: productIdCounter++,
        name: productName,
        price: productPrice,
        category: productCategory,
        image: productImage,
        description: productDescription
    };
    
    // Agregar producto al array
    products.push(newProduct);
    
    // Actualizar tabla
    updateProductTable();
    
    // Limpiar formulario
    document.getElementById('productForm').reset();
    
    // Mostrar mensaje de éxito
    alert('Producto agregado correctamente');
});

// Actualizar tabla de productos
function updateProductTable() {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editProduct(${product.id})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Obtener nombre de categoría
function getCategoryName(category) {
    switch(category) {
        case 'men': return 'Hombres';
        case 'women': return 'Mujeres';
        case 'kids': return 'Niños';
        default: return 'Sin categoría';
    }
}

// Editar producto
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productDescription').value = product.description;
        
        // Cambiar texto del botón
        const submitButton = document.querySelector('#productForm button[type="submit"]');
        submitButton.textContent = 'Actualizar Producto';
        
        // Cambiar el evento del formulario para actualizar
        document.getElementById('productForm').onsubmit = function(e) {
            e.preventDefault();
            
            product.name = document.getElementById('productName').value;
            product.price = document.getElementById('productPrice').value;
            product.category = document.getElementById('productCategory').value;
            product.image = document.getElementById('productImage').value;
            product.description = document.getElementById('productDescription').value;
            
            updateProductTable();
            document.getElementById('productForm').reset();
            submitButton.textContent = 'Agregar Producto';
            
            // Restaurar el evento original
            document.getElementById('productForm').onsubmit = function(e) {
                e.preventDefault();
                // Código original de agregar producto
            };
            
            alert('Producto actualizado correctamente');
        };
    }
}

// Eliminar producto
function deleteProduct(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        products = products.filter(p => p.id !== id);
        updateProductTable();
        alert('Producto eliminado correctamente');
    }
}

// Manejo del formulario de usuarios
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;
    const userRole = document.getElementById('userRole').value;
    
    // Validar contraseña
    if (userPassword.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return;
    }
    
    // Crear nuevo usuario
    const newUser = {
        id: userIdCounter++,
        name: userName,
        email: userEmail,
        role: userRole
    };
    
    // Agregar usuario al array
    users.push(newUser);
    
    // Actualizar tabla
    updateUserTable();
    
    // Limpiar formulario
    document.getElementById('userForm').reset();
    
    // Mostrar mensaje de éxito
    alert('Usuario agregado correctamente');
});

// Actualizar tabla de usuarios
function updateUserTable() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${getRoleName(user.role)}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Obtener nombre del rol
function getRoleName(role) {
    switch(role) {
        case 'admin': return 'Administrador';
        case 'editor': return 'Editor';
        case 'viewer': return 'Solo lectura';
        default: return 'Sin rol';
    }
}

// Editar usuario
function editUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userRole').value = user.role;
        
        // Cambiar texto del botón
        const submitButton = document.querySelector('#userForm button[type="submit"]');
        submitButton.textContent = 'Actualizar Usuario';
        
        // Cambiar el evento del formulario para actualizar
        document.getElementById('userForm').onsubmit = function(e) {
            e.preventDefault();
            
            const userPassword = document.getElementById('userPassword').value;
            
            // Validar contraseña si se cambió
            if (userPassword && userPassword.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres');
                return;
            }
            
            user.name = document.getElementById('userName').value;
            user.email = document.getElementById('userEmail').value;
            user.role = document.getElementById('userRole').value;
            
            updateUserTable();
            document.getElementById('userForm').reset();
            submitButton.textContent = 'Agregar Usuario';
            
            // Restaurar el evento original
            document.getElementById('userForm').onsubmit = function(e) {
                e.preventDefault();
                // Código original de agregar usuario
            };
            
            alert('Usuario actualizado correctamente');
        };
    }
}

// Eliminar usuario
function deleteUser(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        users = users.filter(u => u.id !== id);
        updateUserTable();
        alert('Usuario eliminado correctamente');
    }
}