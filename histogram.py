import numpy as np
import argparse
import cPickle
import glob
import cv2
import dicttoxml

class RGBHistogram:
	def __init__(self, bins):
		# store the number of bins the histogram will use
		self.bins = bins

	def describe(self, image):
		hist = cv2.calcHist([image], [0, 1, 2],
			None, self.bins, [0, 256, 0, 256, 0, 256])
		hist = cv2.normalize(hist)
		#print type(hist)
		#print type(hist.flatten())
		return hist.flatten()
  

ap = argparse.ArgumentParser()
ap.add_argument("-d", "--dataset", required = True,
	help = "Path to the directory that contains the images to be indexed")
ap.add_argument("-i", "--index", required = True,
	help = "Path to where the computed index will be stored")
args = vars(ap.parse_args())
 
index = {}  

desc = RGBHistogram([8, 8, 8])

f = open(args["index"], "w")
#f2 = open('dummyindex.xml', "w")

for imagePath in glob.glob(args["dataset"] + "/*.jpg"):
	k = imagePath[imagePath.rfind("/") + 1:]

	image = cv2.imread(imagePath)
	features = desc.describe(image)
	index[k] = features.tolist()
	#print type(index[k])
		
#print type(index)
xml = dicttoxml.dicttoxml(index)
f.write(xml)
f.close()	

#f = open(args["index"], "w")
#f.write(cPickle.dumps(index))
#f.close()