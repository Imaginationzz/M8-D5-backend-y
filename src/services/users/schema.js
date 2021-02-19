const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String },
    spotifyId: String,
    facebookId: String,
    refreshTokens: [{ type: String }],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.__v;

  return userObj;
};

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return user;
    else return null;
  } else return null;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  const plainPw = user.password;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(plainPw, 12);
  }

  next();
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
