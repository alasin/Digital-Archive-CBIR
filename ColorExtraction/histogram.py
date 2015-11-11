import numpy as np
import argparse
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
		cv2.normalize(hist, hist)
		#print type(hist)
		#print type(hist.flatten())
		return hist.flatten()


ap = argparse.ArgumentParser()
ap.add_argument("-d", "--dataset", required = True,
	help = "Path to the directory that contains the images to be indexed")
ap.add_argument("-i", "--index", required = True,
	help = "Path to where the computed index will be stored")
args = vars(ap.parse_args())

big_index = []
index = {}
#small_index = []

desc = RGBHistogram([8, 8, 8])

f = open(args["index"], "w")
#f2 = open('dummyindex.xml', "w")

imagePaths = glob.glob(args["dataset"] + "/*.jpg")
imagePaths.extend(glob.glob(args["dataset"] + "/*.JPG"))
imagePaths.extend(glob.glob(args["dataset"] + "/*.png"))
imagePaths.extend(glob.glob(args["dataset"] + "/*.PNG"))
imagePaths.extend(glob.glob(args["dataset"] + "/*.gif"))
imagePaths.extend(glob.glob(args["dataset"] + "/*.GIF"))
imagePaths.extend(glob.glob(args["dataset"] + "/*.bmp"))
imagePaths.extend(glob.glob(args["dataset"] + "/*.BMP"))
imagePaths.extend(glob.glob(args["dataset"] + "/*.TIFF"))
imagePaths.extend(glob.glob(args["dataset"] + "/*.tiff"))

for imagePath in imagePaths:
	k = imagePath[imagePath.rfind("/") + 1:]
	image = cv2.imread(imagePath)
	features = desc.describe(image)
	big_index.append({'image':[k, features.tolist()]})
	index[k] = features.tolist()
	#big_index.append(index)
	#print type(index[k])

#print type(index)
#xml = dicttoxml.dicttoxml(big_index, custom_root='images')
xml = dicttoxml.dicttoxml(index, attr_type=False)
f.write(xml)
f.close()

#f = open(args["index"], "w")
#f.write(cPickle.dumps(index))
#f.close()
