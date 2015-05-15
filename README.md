# Digital-Archive-CBIR

This is a simple tag and content-based image retrieval platform built atop Node.js. Express framework has been used for frontend. By no means is this a flawless platform structure and does require some work. OpenCV code is fairly modularized and could be used independently for other projects. Suggestions are welcome.

XQuery based BaseX XML engine has been used for tag-based search. For CBIR, a 3D color histogram based technique and a Bag-of-Features descriptor model on SIFT features has been used.

**CODE STRUCTURE**

- **Server** directory contains code for the upload interface which allows users to upload their images one-by-one with their corresponding tags (location, style, theme etc.). Can be started by using `node app` or `nodemon app`. It currently listens on `localhost:8080`. 

- **Client** directory contains code for the search interface which allows users to search on the basis of tags or perform an image-based search. Can be started by using `node app` or `nodemon app`. It currently listens on `localhost:8080`. You should also start the BaseX server from another terminal by typing `basexserver`.

- **Database** directory contains the the uploaded images and their thumbnails (auto-generated), the XML file for storing image tags, the XML file for storing color histograms, the YAML file for SIFT based BoF dictionary/vocabulary and the final SIFT based BoF descriptors for every image in YAML format.

- **SIFTExtraction** contains code for extracting SIFT features and generating BoF descriptors.

- **ColorExtraction** contains code for generating color histograms and color-based matching.

For a more detailed description of above directories, go through **README** for the specific directory. 



