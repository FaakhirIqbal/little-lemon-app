import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS menu (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price NUMERIC NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL,
            category TEXT NOT NULL
        );
        `,
        [],
        resolve,
        (_, error) => {
          console.error("Error initializing database", error);
          reject(error);
        }
      );
    });
  });
};

// ... rest of the code remains unchanged ...

const insertDish = (dishName, description, price, photoUri, category) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into menu (name,price,description,image,category) values (?,?,?,?,?)",
          [dishName, price, description, photoUri, category],
          resolve,
          (_, error) => {
            console.error("Error inserting dish", error);
            reject(error);
          }
        );
      },
      (e) => console.error("Transaction error on inserting dish", e)
    );
  });
};

// ... rest of the code remains unchanged ...

const filterMenuItems = (categories, searchInput) => {
  return new Promise((resolve, reject) => {
    try {
      const queryArray = [];
      if (searchInput.length) {
        queryArray.push(`LOWER(name) LIKE ?`);
      }
      if (categories.length) {
        for (const category of categories) {
          queryArray.push(`category=?`);
        }
      }
      const queryString = queryArray.length
        ? "where " + queryArray.join(" AND ")
        : "";
      const finalQuery = `select * from menu ${queryString};`;
      db.transaction(
        (tx) => {
          tx.executeSql(
            finalQuery,
            [...searchInput.length ? [`%${searchInput.toLowerCase()}%`] : [], ...categories.map(c => c.toLowerCase())],
            (_, { rows }) => {
              const menu = rows._array;
              resolve(menu);
            },
            (_, error) => {
              console.error("Error filtering menu items", error);
              reject(error);
            }
          );
        },
        (e) => console.error("Transaction error on filtering menu items", e)
      );
    } catch (error) {
      console.error("Error filtering menu items", error);
      reject(error);
    }
  });
};

// ...

export {
  initializeDatabase, // add this export if you want to explicitly initialize the DB in your app
  filterMenuItems,
  selectAllMenu,
  insertDish,
  checkMenuTableAndPopulateData,
  getDataFromApiAsync,
  resetDatabase,
};
