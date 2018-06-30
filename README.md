# Doodle Classifier

This is a basic doodle classifier built using my Toy Neural Network in JavaScript and data from [Google QuickDraw](https://console.cloud.google.com/storage/browser/quickdraw_dataset/full/numpy_bitmap?pli=1).

A Processing sketch was used to convert the .npy files into simple binaries that can be easily worked with in JavaScript.

The neural network has 784 input nodes (images are 28 x 28 pixels), some amount of hidden nodes (haven't found the best number yet), and an output node for each label (currently 4).

So far it seems to work pretty well training on 2 epochs of 100000 images from each label. It takes quite some time to train as there are no speed optimizations / parallelization yet.

## TODO

I would like to first try incorporating something like gpu.js to speed up the matrix math. This would allow me to train on more data, and increase the number of lables possible.