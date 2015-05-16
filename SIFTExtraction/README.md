This code is for generating a vocabulary of visual bag-of-words or bag-of-features for the images. It has to be run only once, after uploading the image dataset.

- **CMakeLists.txt** is used for generating the Makefile. Create a `build` directory or use your preferred build location for running `cmake .` or `cmake ..`. For more information on CMake, go through CMake's documentation.

- **createvocab.cpp** contains the main code for extracting SIFT features and creating BoF vocabulary and descriptors. This is the file where all parameteres are configured for feature extraction, so play with it only if you know what you're getting into.

- **searchsift.py** is referenced by `Digital_Archive/Client/routes/index.js` where it is essentially called as `python searchsift.py arg1 arg2` where `arg1` is the database location for SIFT descriptors(`../Database`) and `arg2` is the location of query image. It can aslo be called independently in the way described.

**NOTE**
Ensure that `arg1` (database location) contains `siftdescriptors` directory which contains the SIFT-BoF descriptors in YAML format.

- **createVocabulary.exe** is the executable created after compiling `createvocab.cpp` and is executed by running `./createVocabulary arg1 arg2` where `arg1` is the parent directory of images(`../Database/fullsize`) and `arg2` is the directory where you want to store the dictionary/vocabulary and the individual image descriptors of images(`../Database`).
