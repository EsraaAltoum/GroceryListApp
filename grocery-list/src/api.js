
//function to retrieve full grocery list from api//
export function getGroceryList() {
    return fetch('/api/grocery-list/')
        .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log("GET")
        return data
    })
    .catch(error => {
        console.error('[ERROR]', error);
    });
}

//function to add item to grocery list 
export function addItem(name, quantity, unit, notes) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: name, quantity: quantity, unit: unit, notes: notes })
    };
    return fetch('/api/grocery-list/add/', requestOptions)
        .then(async response => {
            const data = response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            console.log("POST")
        })
        .catch(error => {
            console.error('[ERROR] ', error);
        });
}

//function to remove item from grocery list
export function deleteItem(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: id})
    };
    return fetch('/api/grocery-list/delete/', requestOptions)
        .then(async response => {
            const data = response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            console.log("DELETE")
         })
        .catch(error => {
            console.error('[ERROR] ', error);
        });
}

//function to mark item as purchased on grocery list
export function purchaseItem(id) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: id})
    };
    return fetch('/api/grocery-list/purchase/', requestOptions)
        .then(async response => {
            const data = response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            console.log("PURCHASE")
         })
        .catch(error => {
            console.error('[ERROR] ', error);
        });
}

//function to update item properties after editing
export function editItem(id, name, quantity, unit, notes) {
    console.log(id, name, quantity, unit, notes)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: id, name: name, quantity: quantity, unit: unit, notes: notes })
    };
    return fetch('/api/grocery-list/edit/', requestOptions)
        .then(async response => {
            const data = response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            console.log("PUT")
        })
        .catch(error => {
            console.error('[ERROR] ', error);
        });
}