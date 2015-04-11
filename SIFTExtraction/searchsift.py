import cv2
import sys
import numpy
import os

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

dir_name = sys.argv[1] + '/siftdescriptors'
for files in os.listdir(dir_name):
    key = os.path.splitext(files)[0] + '.jpg'
    array = numpy.asarray(cv2.cv.Load(dir_name + '/' + files))[0]
    index[key] = array
    
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

keypoints = []
keypoints = detector.detect(queryImage)

bowDescriptor = bowDE.compute(queryImage, keypoints)
queryFeatures = bowDescriptor[0]

searcher = Searcher(index)
results = searcher.search(queryFeatures)

# loop over the top ten results
for j in xrange(0, 10):
	(score, imageName) = results[j]
	print imageName
	print score
