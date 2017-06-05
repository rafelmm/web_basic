module.exports = function (grunt) {
	grunt.initConfig({
		sass:{
			dist: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: 'webcontent/src/css/sass',
					src: ['*.scss'],
					dest: 'webcontent/src/css',
					ext: '.css'
				}]
			}
		},
		postcss: {
			dist:{
				options: {
					map: false,
					processors: [
						require('pixrem')(), //add fallbacks for rem units
						require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
						require('cssnano')() //minify the result
					],
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: 'webcontent/src/css',
					src: ['*.css'],
					dest: 'webcontent/public/css',
					ext: '.min.css'
				}]
			},
			dev: {
				options: {
					map: false,
					processors: [
						require('pixrem')(), //add fallbacks for rem units
						require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
					],
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: 'webcontent/src/css',
					src: ['*.css'],
					dest: 'webcontent/public/css',
					ext: '.css'
				}]
			}
		},
		watch: {
			sass:{
				files: ['webcontent/src/css/sass/*.scss'],
				tasks: ['sass']
			},
			postcss:{
				files: ['webcontent/src/css/*.css'],
				tasks: ['postcss']
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.registerTask('default', ['watch']);
};