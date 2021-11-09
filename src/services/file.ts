class File {
  private static fileInstance: File;

  private constructor() {
  }

  public static getInstance(): File {
    if (!File.fileInstance) {
      File.fileInstance = new File();
    }

    return File.fileInstance;
  }

  public someBusinessLogic() {
    // populate values
  }
}

export {
  File,
}