class FileService {
  private static fileInstance: FileService;

  private constructor() {
  }

  public static getInstance(): FileService {
    if (!FileService.fileInstance) {
      FileService.fileInstance = new FileService();
    }

    return FileService.fileInstance;
  }

  public someBusinessLogic() {
    // populate values
  }
}

export {
  FileService,
}