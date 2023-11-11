const Appt = require('../models/appt')
const User = require('../models/user')

module.exports = {
    delete: removeAppt,
};

async function removeAppt(req, res) {
    const appt = await Appt.findOne({'appt._id': req.params.id, 'app.user': req.user._id});
    if (!appt) return res.redirect('/appts');
    appt.schedule.remove(req.params.id);
    await appt.save();
    res.redirect(`/appts/${appt._id}`);
}