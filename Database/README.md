- **fullsize** contains the original sized images uploaded by the user. This is the default folder for storing the images and for changing the storage folder, you'll have to modify `Digital_Archive/Server/app.js`.

- **thumbs** contains the thumbnails of the uploaded images. The thumbnails are automatically generated while full-size image is being uploaded. The thumbnails are created using `Imagemagick` and its properties and default directory location could be modified in `Digital_Archive/Server/app.js`.

- **siftdescriptors** contains the YAML descriptor files for every image. This default location is used in `Digital_Archive/SIFTExtraction/createvocab.cpp` and can be modified there (but don't do it unless absolutely necessary).

- **color.xml** is generated after running histogram generator code(`Digital_Archive/ColorExtraction/histogram.py`) and contains the 3D histogram information for every image. It is used and referenced in `Digital_Archive/ColorExtraction/search.py`.

- **tags.xml** contains the manually annotated tags and image loations of the images in the database. It is updated each time an image is uploaded. 

**NOTE**
`tags.xml` needs to be created and properly initialized first before adding images to the archive. It won't be created if not existing. Let it remain like it's current form. For removing image/images from the database, delete the images from the `fullsize` and `thumbs` folder and also its corresponding node from `tags.xml`. Node starts with `<image>` and ends with `</image>`. Make sure that root node (`<images>` & `</images`) is always there even if there are no images in the database. 

- **dictionary.yml** is generated after running SIFT extraction code(`Digital_Archive/SIFTExtraction/createvocab.cpp`) and contains the vocabulary for BoF model in YAML file format. It is also referenced by `Digital_Archive/SIFTExtraction/searchsift.py` when performing a live image search.