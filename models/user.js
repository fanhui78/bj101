const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const UserSchema=new Schema({
    mobile:{type:String,default:''},
    hashed_password:{type:String,default:''},
    salt:{type:String,default:''},
    username:{type:String,default:''},
    address:{type:String,default:''},
    Roles:[{type:Schema.ObjectId,ref:'Role'}]

});

const RoleSchema = new Schema({
    roleName:{type:String,default:''},
    routers:{url:String,title:String,action:[String]}
});
/**
 * Virtuals;
 */

UserSchema
    .virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    });

/**
 * 方法
 */
UserSchema.methods = {
    /**
     * authenticate - 检查密码是否相同
     * 
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     * 
     */
    authenticate: function (plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * 生成salt
     * 
     * @return {String}
     * @api public
     * 
     */
    makeSalt:function(){
        return Math.round((new Date().valueOf() * Math.random()))+'';
    },

    /**
     * 加密密码
     * 
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword:function(password){
        if (!password) return '';
        try{
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        }catch (err){
            return '';
        }
    }
};

UserSchema.statics = {

    /**
     * 
     * load
     * 
     * @param {Object} options
     * @param {Function} callback
     * @api private
     */
    load: function(options, callback){
        options.select = options.select || 'username mobile';
        return this.findOne(options.criteria)
            .select(options.select)
            .exec(callback);
    }
}
mongoose.model('User',UserSchema);
