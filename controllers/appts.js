const ObjectId = require('mongoose').Types.ObjectId;
const Appt = require('../models/appt');
const User = require('../models/user');
const moment = require('moment');

module.exports = {
    new: newAppt,
    index,
    update,
    showAppt,
    editAppt,
    delete: deleteAppt,
    create,
};

async function deleteAppt(req, res) {
    await Appt.findOneAndDelete(req.params.id);

    return res.redirect('/');
}

async function editAppt(req, res) {
  const appt = await Appt.findById(req.params.id);
  res.render('appts/edit', { title: 'Edit Appointment', appt, isSignedIn: req.isAuthenticated()});
}

async function showAppt(req, res) {
  const appt = await Appt.findById(req.params.id);
  res.render('appts/show', { title: 'Appointments Scheduled', appt: {...appt, date: moment(appt.date, 'Y-m-d')}, isSignedIn: req.isAuthenticated()});
}

async function create(req, res) {
  try {
    const body = req.body;

      await User.create, Appt.create({
        date: body.date,
        userId: req?.user?._id,
        comment: body.comment,
      });


      return res.redirect('/');
  } catch (err) {
    console.error(err)
    return res.redirect('/');
  }
}

async function update(req, res) {
    try {
        await Appt.findByIdAndUpdate(
          {
            _id: new ObjectId(req.params.id),
          },
          {
            $set: req.body,
          },
        );
        return res.redirect('/')
        // res.render('appts/edit', { title: "Edit Appointment", appt, isSignedIn: req.isAuthenticated()});
    } catch (err) {
      console.error(err);
      return res.redirect('/')
    }
}

async function index(req, res) {
    const appts = Appt.find({});
    res.render('appts/index', { appts, isSignedIn: req.isAuthenticated()});
}

async function newAppt(req, res) {
    res.render('appts/new', { title: 'Schedule New Appointment', isSignedIn: req.isAuthenticated()} );
}

