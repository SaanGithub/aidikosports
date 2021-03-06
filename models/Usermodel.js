var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Usermodel Model
 * ==========
 */
var Usermodel = new keystone.List('Usermodel');

Usermodel.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Usermodel.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Usermodel.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Usermodel.defaultColumns = 'name, email, isAdmin';
Usermodel.register();
