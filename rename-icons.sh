#!/bin/bash

for filename in icons/*; do
  extension=${filename##*.}
  newFilename=icons/$(uuidgen).$extension
  mv $filename $newFilename
done