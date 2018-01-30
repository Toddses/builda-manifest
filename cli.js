#!/usr/bin/env node

'use strict';

var path       = require('path');
var fs         = require('fs');
var recursive  = require('fs-readdir-recursive');
var dateformat = require('dateformat');
var jsonfile   = require('jsonfile');

// constants
const REVISION_DATE = dateformat(new Date(), 'yyyy-mm-dd');

// parse command line arguments
const [,, ...args] = process.argv;

// the full manifest object
const manifest = { files: [] };
// path to directory that should be manifested
const readPath = (args[0]) ? args[0] : '.';
// string filenames of relevant files
const files    = recursive(readPath);

// loop through and set up each file with manifest data
files.forEach((file) => {
	const stats = fs.statSync(file);

	let f = {
		filename: file,
		revision: REVISION_DATE,
		filesize: stats.size
	};

	manifest.files.push(f);
});

// write out the json to a file
jsonfile.writeFile('./manifest.json', manifest, { spaces: 2 }, (err) => {
	if (err)
		console.log(err);
});
