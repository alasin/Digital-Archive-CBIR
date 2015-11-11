#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/nonfree/features2d.hpp"
#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>
#include <algorithm>

using namespace cv;
using namespace std;

int main(int argc, char* argv[])
{
    char *filename = new char[100];

    vector<string> validFormats;
    validFormats.push_back("png");
    validFormats.push_back("ppm");
    validFormats.push_back("jpg");
    validFormats.push_back("gif");
    validFormats.push_back("bmp");
    validFormats.push_back("tiff");

    int minHessian = 400; //Hessian Threshold

    Mat input;

    //To store the keypoints that will be extracted by SIFT
    vector<KeyPoint> keypoints;

    //To store the SIFT descriptor of current image
    Mat descriptor;

    //To store all the descriptors that are extracted from all the images.
    Mat featuresUnclustered;

    //The SIFT feature extractor and descriptor
    SiftDescriptorExtractor detector;

    DIR *dir;
    struct dirent *ent;

    if((dir = opendir(argv[1])) != NULL)
    {
        while((ent = readdir(dir)) != NULL)
        {
            if(ent->d_type == DT_REG)
            {
                string fullname(ent->d_name);
                int lastindex = fullname.find_last_of(".");
                string format = fullname.substr(lastindex + 1, fullname.length() - 1);

                if(find(validFormats.begin(), validFormats.end(), format) != validFormats.end())
                {
                    sprintf(filename, "%s/%s",argv[1], ent->d_name);
                    printf("%s\n", filename);
                    input = imread(filename, CV_LOAD_IMAGE_GRAYSCALE);
                    detector.detect(input, keypoints);
                    detector.compute(input, keypoints, descriptor);
                    featuresUnclustered.push_back(descriptor);
                }
            }
        }
        closedir(dir);
    }
    else
    {
        perror("");
        return EXIT_FAILURE;
    }

    int dictionarySize = 200;
    TermCriteria tc(CV_TERMCRIT_ITER, 100, 0.001);
    int retries = 1;
    int flags = KMEANS_RANDOM_CENTERS;

    BOWKMeansTrainer bowTrainer(dictionarySize,tc,retries,flags);
    //cout << "I'm here too\n";

    Mat dictionary = bowTrainer.cluster(featuresUnclustered);

    sprintf(filename, "%s/dictionary.yml", argv[2]);
    FileStorage fs(filename, FileStorage::WRITE);
    fs << "vocabulary" << dictionary;
    fs.release();

    //create a nearest neighbor matcher
    Ptr<DescriptorMatcher> matcher(new FlannBasedMatcher);

    //create Sift feature point extracter
    Ptr<FeatureDetector> siftdetector(new SiftFeatureDetector());

    //create Sift descriptor extractor
    Ptr<DescriptorExtractor> extractor(new SiftDescriptorExtractor);

    //create BoF (or BoW) descriptor extractor
    BOWImgDescriptorExtractor bowDE(extractor,matcher);

    //Set the dictionary with the vocabulary we created in the first step
    bowDE.setVocabulary(dictionary);

    //To store the image file name
    char *filename2 = new char[100];

    //To store the image tag name - only for save the descriptor in a file
    char *imageTag = new char[100];


    int i = 1;
    if((dir = opendir(argv[1])) != NULL)
    {
        while((ent = readdir(dir)) != NULL)
        {
            if(ent->d_type == DT_REG)
            {
                sprintf(filename, "%s/%s",argv[1], ent->d_name);

                string fullname(ent->d_name);
                int lastindex = fullname.find_last_of(".");
                string format = fullname.substr(lastindex + 1, fullname.length() - 1);

                if(find(validFormats.begin(), validFormats.end(), format) != validFormats.end())
                {
                    string rawname = fullname.substr(0, lastindex);
                    string complete = rawname + "*" + format;
                    // printf("Complete filename: %s\n", complete.c_str());

                    Mat img = imread(filename,CV_LOAD_IMAGE_GRAYSCALE);

                    vector<KeyPoint> keypoints;
                    siftdetector->detect(img,keypoints);

                    Mat bowDescriptor;
                    bowDE.compute(img,keypoints,bowDescriptor);

                    sprintf(filename2, "%s/siftdescriptors/%s.yml", argv[2], complete.c_str());

                    FileStorage fs1(filename2, FileStorage::WRITE);
                    printf("%s\n", filename2);

                    fs1 << rawname.c_str() << bowDescriptor;
                    fs1.release();
                }
            }
        }
        closedir(dir);
    }
    else
    {
        perror("");
        return EXIT_FAILURE;
    }
}
