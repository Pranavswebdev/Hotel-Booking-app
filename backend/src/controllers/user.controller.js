export async function getMe(req, res) {
  res.json({ user: req.user.toSafeJSON() });
}

const EDITABLE = ["name", "phone", "address", "gender", "birthDate"];

export async function updateMe(req, res, next) {
  try {
    for (const field of EDITABLE) {
      if (req.body[field] !== undefined) req.user[field] = req.body[field];
    }
    await req.user.save();
    res.json({ message: "Profile updated", user: req.user.toSafeJSON() });
  } catch (err) {
    next(err);
  }
}
