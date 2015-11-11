import numpy as np
import xmltodict
import cv2
import sys

class RGBHistogram:
	def __init__(self, bins):
		# store the number of bins the histogram will use
		self.bins = bins

	def describe(self, image):
		hist = cv2.calcHist([image], [0, 1, 2],
			None, self.bins, [0, 256, 0, 256, 0, 256])
		cv2.normalize(hist, hist)

		# return out 3D histogram as a flattened array
		return hist.flatten()


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
		d = 0.5 * np.sum([((a - b) ** 2) / (a + b + eps)
			for (a, b) in zip(histA, histB)])

		return d


# load the query image
queryImage = cv2.imread(sys.argv[3])

# describe the query
desc = RGBHistogram([8, 8, 8])
queryFeatures = desc.describe(queryImage)

# load the index
index = dict(xmltodict.parse(open(sys.argv[2]).read()))
new_index = dict(index.values()[0])
#print new_index.keys()
#print new_index["mandawa052.jpg"].keys()

numfiles = 0
for i in new_index.keys():
  new_index[i] = new_index[i]["item"]
  new_index[i] = map(float, new_index[i])
  numfiles = numfiles + 1


searcher = Searcher(new_index)
results = searcher.search(queryFeatures)

# loop over the top ten results
for j in xrange(0, min(numfiles, 10)):

	(score, imageName) = results[j]
	print imageName
