const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
  username: { 
    type: String, 
    unique: true 
  },
	email: { 
    type: String, 
    unique: true, 
    lowercase: true 
  },
	password: String
})

userSchema.pre('save', function(next) {
  const user = this
  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err)
    // hash or encrypt the password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) return next(err)
      // overwrite plain text password with hashed version
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if(err) return callback(err)
		callback(null, isMatch)
	})
}

const ModelClass = mongoose.model('user', userSchema)

module.exports = ModelClass