import fs from "fs/promises";

//commnads

const CREATE_FILE = "create a file";
const DELETE_FILE = "delete the file";
const RENAME_FILE = "rename the file";
const ADD_TO_FILE = "add to file";

(async () => {
  const createFile = async (path) => {
    try {
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();

      if (existingFileHandle) return;
    } catch (error) {
      //we don't have file
      const newFileHandle = await fs.open(path, "w"); //write file
      console.log("A new file was successfully created");
      newFileHandle.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      console.log("----", path);
      const deleteFileHandle = await fs.open(path, "r");

      if (deleteFileHandle) {
        deleteFileHandle.close();
        fs.unlink(path);
        console.log("file was successfully deleted");
      }
    } catch (error) {
      console.log("file not found");
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      console.log("old path", oldPath);
      const renameFileHandle = await fs.open(oldPath, "r");

      if (renameFileHandle) {
        renameFileHandle.close();

        fs.rename(oldPath, newPath);

        console.log("file was successfully renamed");
      }
    } catch (error) {
      console.log(error);
      console.log("file not found");
    }
  };

  const addToFile = async (path, content) => {
    try {
      console.log("what is path", path);
      const fileHandler = await fs.open(path, "r");

      if (fileHandler) {
        fileHandler.close();

        fs.writeFile(path, content);
        console.log("content was successfully added");
      }
    } catch (error) {
      console.log("file not found");
    }
  };

  const watcher = fs.watch("./command.txt"); //file or folder
  const file = await fs.open("./command.txt", "r");

  for await (const event of watcher) {
    if (event.eventType == "change") {
      /*how to read content */
      /*open(32) ==> (when you oepn file it will  you are saving number -
       regarding that file (filedescriptor each file has unique number ))(write or read or append)
       */
      //get the size of our file

      const stat = await file.stat();
      // Stats {
      //   dev: 16777229,
      //   mode: 33188,
      //   nlink: 1,
      //   uid: 501,
      //   gid: 20,
      //   rdev: 0,
      //   blksize: 4096,
      //   ino: 108079078,
      //   size: 50,
      //   blocks: 8,
      //   atimeMs: 1704628415327.36,
      //   mtimeMs: 1704628422855.5503,
      //   ctimeMs: 1704628422855.5503,
      //   birthtimeMs: 1704624599898.7344,
      //   atime: 2024-01-07T11:53:35.327Z,
      //   mtime: 2024-01-07T11:53:42.856Z,
      //   ctime: 2024-01-07T11:53:42.856Z,
      //   birthtime: 2024-01-07T10:49:59.899Z
      // }

      //length of file
      const length = stat.size;
      //allocate our buffer with file size
      const buff = Buffer.alloc(length);
      //a location at which we want to start filling our buffer
      const offset = 0;
      // a position that we want to start reading file from
      const position = 0;

      //read whole content of file
      await file.read(buff, offset, length, position); //allowcate size fo buffer

      //decoder 01==>meaningful and readable  output
      //encoder meaningful=>01
      const command = buff.toString("utf-8");

      //case 1: create a file <path>
      if (command.includes(CREATE_FILE)) {
        const filePath = command.substring(CREATE_FILE.length + 1);
        createFile(filePath);
      }

      // case 2: delete the file <path>

      if (command.includes(DELETE_FILE)) {
        const filePath = command.substring(DELETE_FILE.length + 1);

        deleteFile(filePath);
      }

      //case 3:rename the file <path> to <path>
      if (command.includes(RENAME_FILE)) {
        const _idx = command.indexOf(" to ");
        const oldFile = command.substring(RENAME_FILE.length + 1, _idx);
        const newFile = command.substring(_idx + 4);
        console.log([oldFile, newFile]);

        renameFile(oldFile, newFile);
      }

      // case 4: add to file <path> this content: <content>

      if (command.includes(ADD_TO_FILE)) {
        const _idx = command.indexOf(" this content: ");
        const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
        const content = command.substring(_idx + 15); // this content:  has 15 character

        addToFile(filePath, content);
      }
    }
  }
})();
