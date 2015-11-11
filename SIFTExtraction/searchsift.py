import cv2
import sys
import numpy
import os
#import xmltodict


class Searcher:
	def __init__(self, index):
		self.index = index

	def search(self, queryFeatures):
		results = {}

		# loop over the index
		for (k, features) in self.index.items():
			d = self.chi2_distance(features, queryFeatures)
			results[k] = d

		# sort our results, so that the smaller distances (i.e. the
		# more relevant images are at the front of the list)
		results = sorted([(v, k) for (k, v) in results.items()])

		return results

	def chi2_distance(self, histA, histB, eps = 1e-10):
		d = 0.5 * numpy.sum([((a - b) ** 2) / (a + b + eps)
			for (a, b) in zip(histA, histB)])

		return d

index = {}

dictionary = numpy.asarray(cv2.cv.Load(sys.argv[1] + '/dictionary.yml'))
#xmldict = dict(xmltodict.parse(open(sys.argv[1] + '/dictionary.xml').read()))
#stringdict = xmldict.values()[0].values()[0]["data"].split()
#dictionary = numpy.asarray(map(float, stringdict))

numfiles = 0
dir_name = sys.argv[1] + '/siftdescriptors'
for files in os.listdir(dir_name):
	(key, ext) = os.path.splitext(files)
	if (ext == '.yml'):
		fmtindex = key.rindex("*")
		imname = key[0:fmtindex]
		fmt = key[fmtindex + 1:]
		array = numpy.asarray(cv2.cv.Load(dir_name + '/' + files))[0]
		index[imname + "." + fmt] = array
		numfiles = numfiles + 1

	# key = os.path.splitext(files)[0]
	# ext = os.path.splitext(files)[1]
	# if (ext == '.xml'):
	# 	xmldict = dict(xmltodict.parse(open(dir_name + '/' + files).read()))
	# 	stringdict = xmldict.values()[0].values()[0]["data"].split()
	# 	array = numpy.asarray(map(float, stringdict))
	# 	index[key] = array

#print index

detector = cv2.FeatureDetector_create("SIFT")
extractor = cv2.DescriptorExtractor_create("SIFT")

FLANN_INDEX_KDTREE = 0
index_params = dict(algorithm = FLANN_INDEX_KDTREE, trees = 5)
search_params = dict(checks=50)

matcher = cv2.FlannBasedMatcher(index_params, search_params)
bowDE = cv2.BOWImgDescriptorExtractor(extractor, matcher)
bowDE.setVocabulary(dictionary)

queryImage = cv2.imread(sys.argv[2])
# print type(queryImage)

keypoints = []
keypoints = detector.detect(queryImage)
# print "yes"

# print "No"
bowDescriptor = bowDE.compute(queryImage, keypoints)
# print "yes"
queryFeatures = bowDescriptor[0]
# print "yes"

searcher = Searcher(index)
results = searcher.search(queryFeatures)

# print results
# loop over the top ten results
for j in xrange(0, min(numfiles, 10)):
	(score, imageName) = results[j]
	print imageName
	#print score
