// // ********** Promise Api *************
// import fs from "fs/promises";

// (async () => {
//   try {
//     await fs.copyFile("text.txt", "files/copied-promise.txt");
//   } catch (error) {
//     console.log(error);
//   }
// })();

// ********** Callback Api *************

// import fs from "fs";

// fs.copyFile("text.txt", "files/copied-callaback.txt", (error) => {
//   console.log(error);
// });

// // ********** Syncronous Api *************

import fs from "fs";

fs.copyFileSync("text.txt", "files/copied-syncronous.txt");
