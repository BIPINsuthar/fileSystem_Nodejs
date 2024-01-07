import fs from "fs/promises";

(async () => {
  const watcher = fs.watch("./command.txt"); //file or folder
  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    /*how to read content */
    /*open(32) ==> (when you oepn file it will  you are saving number -
       regarding that file (filedescriptor each file has unique number ))(write or read or append)
       */
    //get the size of our file

    const stat = await commandFileHandler.stat();
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
    const content = await commandFileHandler.read(
      buff,
      offset,
      length,
      position
    ); //allowcate size fo buffer
    console.log(content);
  });

  for await (const event of watcher) {
    if (event.eventType == "change") {
      commandFileHandler.emit("change");
    }
  }
})();
