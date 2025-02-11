import { openDB } from 'idb';

// Initialize IndexedDB
const initDB = async () => {
    return await openDB('merchants', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('cart')) {
                db.createObjectStore('cart', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('wishlist')) {
                db.createObjectStore('wishlist', { keyPath: 'id' });
            }
        }
    });
};

// Function to add/update item
export const setItem = async (storeName, item) => {
    const db = await initDB();
    // const existingItem = await db.get(storeName, item.id);
    const items = await getItems(storeName);
    const existingItem = items.filter(itm => itm.id === item.id);
    console.log('existingItem ========== ', existingItem);
    
    if (existingItem && existingItem[0] && existingItem[0].length > 0) {
        // If item exists, update quantity
        existingItem[0].quantity = (existingItem[0].quantity || 1) + (item.quantity || 1);
        await db.put(storeName, existingItem[0]);
    } else {
        // If item does not exist, add it
        await db.put(storeName, { ...item, quantity: item.quantity || 1 });
    }
};

// Function to update item quantity
export const updateQty = async (storeName, id, quantity) => {
    const db = await initDB();
    const items = await getItems(storeName);
    console.log('quantity ============= ', quantity);
    // items.forEach((item, index) =>{
    //     if(item && item.id && item.id == id){
    //         console.log('item ========= ', item, index, id);
    //     }
    // })
    const updatedCart = items.filter(item => item.id === id);
    console.log('updatedCart ======== ', updatedCart, id);
    if (updatedCart && updatedCart[0]) {
        updatedCart[0].quantity = quantity; // Set new quantity
        await db.put(storeName, updatedCart[0]);
        console.log('updatedCart[0] ======= ', updatedCart[0]);
        console.log('sdf ============ ');
    }
    const updatedRecord = await getItems(storeName);
    return updatedRecord;
};
export const getItemDetail = async (storeName, id) => {

    const db = await initDB();
    const items = await getItems(storeName);
    const cartDetail = items.filter(item => item.id === id);
    return cartDetail;
}
// Function to get all items
export const getItems = async (storeName) => {
    const db = await initDB();
    return await db.getAll(storeName);
};

// Function to remove item
export const removeItem = async (storeName, id) => {
    const db = await initDB();
    await db.delete(storeName, id);
};

// Function to clear all items
export const clearStore = async (storeName) => {
    const db = await initDB();
    await db.clear(storeName);
};

// Function to check if an item exists
export async function itemExists(storeName, id) {
    const db = await initDB();
    const item = await db.get(storeName, id);
    return !!item; // Returns true if item exists, false otherwise
}
