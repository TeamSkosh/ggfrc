#GGFRC

[![Build Status](https://travis-ci.org/TeamSkosh/ggfrc.svg?branch=develop)](https://travis-ci.org/TeamSkosh/ggfrc)

An application to manage robotics clubs.

##Installation Instructions


##Development Instructions

```
# Clone the repository
$ git clone git@github.com:TeamSkosh/ggfrc.git

# Install the dependencies
$ python setup.py develop

# Install bower using npm
$ npm install -g bower

# Install local npm pacakages
$ npm install

# Install dependencies via Bower
$ bower install

# Build the assets
$ grunt build

# Install dependencies via Bower
$ bower install

# Start the server
$ ggfrc runserver
```

##Configured Grunt Tasks

```
# Compiles new styles (global and foundation), auto-prefixes, minifies
grunt styles

# Uglifies js and copies foundation's js into the static directory (if needed)
grunt js

# Creates svg sprite, minifies pngs, copies favicon into static dir (if needed)
grunt images

# Handles styles, js, and images
grunt build

# Compiles sass, uglifies js, handles svgs and images, watches for changes
grunt
```

##Version 0.0.2
