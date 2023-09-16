// links crud products
const getAllProducts = async () => {
    const url = 'http://localhost:3000/api/v2/produtos';
    const options = {
        method: 'GET'
    };
    await fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const products = data;
            const bodyTable = document.querySelector('#body-table');
            products.forEach(product => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td><input type="text" value ="${product.id}" readonly></input></td>
                <td><input type="text" value ="${product.descricao}" readonly></input></td>
                <td><input type="text" value ="${product.marca}" readonly></input></td>
                <td><input type="text" value ="${product.preco}" readonly></input></td>
                <td>
                    <button id="btn-edit" class="btn-edit" data-id="${product.id}">Edit</button>
                    <button class="btn-delete" data-id="${product.id}">Delete</button>
                </td>
            `;
                bodyTable.appendChild(tr);
            });
        });
}

const getProductById = (idProduct) => {
    const url = `http://localhost:3000/api/v2/produtos/${idProduct}`;
    const options = {
        method: 'GET'
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

const deleteProdutcById = (idProduct) => {
    const url = `http://localhost:3000/api/v2/produtos/${idProduct}`;
    const options = {
        method: 'DELETE'
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            window.location.reload();
        });
}

const editProductById = (idProduct, product) => {
    const url = `http://localhost:3000/api/v2/produtos/${idProduct}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

const insertProduct = (product) => {
    const url = `http://localhost:3000/api/v2/produtos`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            window.location.reload();
        });
}

//Renders
const renderProduct = (product) => {
    const bodyTable = document.querySelector('#body-table');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" value ="${product.id}" readonly></input></td>
        <td><input type="text" value ="${product.descricao}" readonly></input></td>
        <td><input type="text" value ="${product.marca}" readonly></input></td>
        <td><input type="text" value ="${product.preco}" readonly></input></td>
        <td>
            <button id="btn-edit" class="btn-edit" data-id="${product.id}">Edit</button>
            <button class="btn-delete" data-id="${product.id}">Delete</button>
        </td>
    `;
    bodyTable.appendChild(tr);
}

//Listeners para os botões de editar e excluir
const addListeners = () => {
    // const btnGetProductById = document.querySelector('#btn-get-product-by-id');
    // btnGetProductById.addEventListener('click', (event) => {
    //     const idProduct = event.target.dataset.id
    //     const product = getProductById(idProduct);
    //     console.log(product);
    //     renderProduct(product);
    // });

    const btnInsert = document.querySelector('#btn-insert');
    btnInsert.addEventListener('click', () => {
        const product = {
            descricao: document.querySelector('#description').value,
            marca: document.querySelector('#brand').value,
            preco: document.querySelector('#price').value
        }
        insertProduct(product);
    });

    const btnsDelete = document.querySelectorAll('.btn-delete')
    btnsDelete.forEach(btn => btn.addEventListener('click', (event) => {
        const idProduct = event.target.dataset.id
        deleteProdutcById(idProduct);
    }));

    const btnsEdit = document.querySelectorAll('.btn-edit');
    btnsEdit.forEach(btn => btn.addEventListener('click', (event) => {
        const tr = event.target.parentNode.parentNode
        const idProduct = event.target.dataset.id
        tr.innerHTML = ``;
        tr.innerHTML = `
            <td><input id="input-id" type="text" value="${idProduct}" readonly></td>
            <td><input id="input-descricao" type="text" value="" required></td>
            <td><input id="input-marca" type="text" value="" required></td>
            <td><input id="input-preco" type="text" value="" required></td>
            <td>
                <button class="btn-save-${idProduct}" data-id="${idProduct}">Save</button>
                <button class="btn-cancel-${idProduct}" data-id="${idProduct}">Cancel</button>
            </td>
        `;
        btnSave = document.querySelector(`.btn-save-${idProduct}`);
        btnSave.addEventListener('click', (event) => {
            const tr = event.target.parentNode.parentNode
            const idProduct = event.target.dataset.id
            const product = {
                descricao: tr.querySelector('#input-descricao').value,
                marca: tr.querySelector('#input-marca').value,
                preco: tr.querySelector('#input-preco').value
            }
            editProductById(idProduct, product);
        });

        btnCancel = document.querySelector(`.btn-cancel-${idProduct}`);
        btnCancel.addEventListener('click', (event) => {
            window.location.reload();
        });
    }));
}

//Menu de navegação desktop
const menuOpener = document.querySelector('.menu-opener');
const menuArea = document.querySelector('.menu-area');

menuOpener.addEventListener('click', () => {
    if (menuArea.classList.contains('menu-opened')) {
        menuArea.classList.remove('menu-opened');
    } else {
        menuArea.classList.add('menu-opened');
    }
});

//init
const init = () => {
    getAllProducts().then(() => {
        addListeners();
    });
}

init();


