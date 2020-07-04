# FileExplorerJs

## Description

A pure JavaScript component for creating a file explorer interface.

## Why Use FileExplorerJs?

- Pure JavaScript - No HTML, CSS or 3rd party library requirements (e.g. jquery). All HTML components and elements are created dynamically.
- Independant - Object is run in its own namespace to avoid conflicts with other libraries.
- All Screen Sizes - Can be used with desktop, tablet and mobile browsers.
- Easy to Install - Simply download the library and import it into your project.
- Easy to Use - Create an file explorer view with a few lines of code.
- Customisable - Multiple options to configure the view and operation. Create your own layout and define api locations for context menu operations.
- Beautiful - Styled by default out of the box.
- Tiny - 37 kb uncompressed source code.

## Getting Started

### Installation

1. Run this command

```
npm i fileexplorerjs --save
```

2. Add as a resource.

  ```html
  <script type="text/javascript" src="/<location_of_installation>/fileexplorerjs.full.min.js"></script>
  ```

### Useage

To generate a fileexplorer view you must first specify a config object then pass this to the init() function.
See example below:

```html
<script type="text/javascript" src="/<location_of_installation>/fileexplorerjs.full.min.js"></script>
<script type="module">
  const config = {
    // user interface configuration
    ui: {
      treeSearchDiv: 'name of div to load file tree search into',
      breadcrumbDiv: 'name of div to load breadcrumb menu into',
      tableSearchDiv: 'name of div to load folder view search into',
      treeDiv: 'name of div to load file tree into',
      tableDiv: 'name of div to load folder view into'
    },
    // specify filter to apply to file tree on load
    defaultTreeSearchValue: 'some search value',
    // api configuration for connecting functions to server
    api: {
      // route to generate file system directory. Must contain json data formatted as follows:
      // [{
      //   DATA_DEPTH: 1 to ... ,
      //   ICON_TYPE: 'folder' || 'file',
      //   NAME: 'some name',
      //   FILE_PATH: 'some file path',
      //   SIZE: ' some file size',
      //   LAST_EDIT_DATE: 'some last edit date'
      // }]
      directory: 'some api e.g. /api/ftp/read/folder',
      // download files and folders - expected that the files under this location are served staticly.
      download: 'some api e.g. /test/express/assets',
      // add files and folders - expected that api handles add/{file||folder}
      // add/file expects multipart form data with the upload directory specified as a header
      // add/folder expects application/json encoded data as follows:
      // [{
      //  dir: 'some directory',
      //  folder: 'some folder'
      // }]
      add: 'some api e.g. /api/ftp/add',
      // delete files and folders - expected that api handles delete/{file||folder}
      // delete/{file||folder} expects application/json encoded data as follows:
      // [{
      //  dir: 'some directory',
      //  file||folder: 'some file or folder'
      // }]
      delete: 'some api e.g. /api/ftp/delete',
      // update (rename) files and folders - expected that api handles update/{file||folder}
      // update/file expects application/json encoded data as follows:
      // [{
      //  NEW_DIR: "some new directory location"
      //  NEW_FILE: "some new file name"
      //  OLD_DIR: "current directory"
      //  OLD_FILE: "current file name"
      //  TYPE: "file"
      // }]
      // update/folder expects application/json encoded data as follows:
      // [{
      //  NEW_DIR: "some new directory location"
      //  NEW_FOLDER: "some new folder name"
      //  OLD_DIR: "current directory"
      //  OLD_FOLDER: "current folder name"
      //  TYPE: "folder"
      // }]
      update: 'some api e.g. /api/ftp/update',
    }
  }
  fileexplorerjs.init(config);
</script>
```

### Contributors

#### Develop

If you would like to contribute to the project. To get a development environment up and running on your local system. Simply follow the instructions below.

1. Install latest version of Node.js

```
https://nodejs.org/en/download/
```

2. Clone repository to your system using the following command or git desktop

```
git clone https://github.com/Joshua-W-Adams/modalator
```

3. Install repository dependencies

```
npm install
```

4. Serve module with web server

```
gulp serve
```

5. Sample module can now be accessed on localhost

```
http://localhost/
```

#### Deployment

1. Lint application

```
gulp lint
```

2. Build dist files

```
gulp build
```

3. Submit pull request to master branch on repository

## License
Copyright (C) 2020 Joshua Adams
This program is free software. You can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
